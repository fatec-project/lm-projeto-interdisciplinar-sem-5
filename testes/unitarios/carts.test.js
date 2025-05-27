const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('Gerenciamento de Carrinho', () => {
  let userId;
  let authToken;
  let gameId;
  let cartId;

  beforeAll(async () => {
    // Cria usuário para teste
    const userRes = await request(app)
      .post('/users')
      .send({
        nome: 'User Carrinho',
        email: 'carrinho@test.com',
        senha: 'Senha123@',
        tipo: 'cliente'
      });
    userId = userRes.body.id;

    // Login
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'carrinho@test.com',
        senha: 'Senha123@'
      });
    authToken = loginRes.body.token;

    // Cria jogo para teste
    const gameRes = await request(app)
      .post('/games')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Game Teste Carrinho',
        preco_base: 50.00,
        desenvolvedora: 'Dev Test'
      });
    gameId = gameRes.body.id;
  });

  // TESTE 1: Criar carrinho (POST /carts)
  test('Deve criar um carrinho para o usuário', async () => {
    const response = await request(app)
      .post('/carts')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(201);

    expect(response.body.usuario_id).toBe(userId);
    cartId = response.body.id;
  });

  // TESTE 2: Adicionar item ao carrinho (POST /carts/items)
  test('Deve adicionar item ao carrinho', async () => {
    const response = await request(app)
      .post('/carts/items')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        cart_id: cartId,
        jogo_id: gameId,
        quantidade: 1
      })
      .expect(201);

    expect(response.body.cart_id).toBe(cartId);
    expect(response.body.jogo_id).toBe(gameId);
  });

  // TESTE 3: Limite de itens no carrinho (RN09)
  test('Deve falhar ao exceder limite de itens', async () => {
    // Adiciona 10 itens (limite máximo)
    for (let i = 0; i < 10; i++) {
      await request(app)
        .post('/carts/items')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          cart_id: cartId,
          jogo_id: gameId,
          quantidade: 1
        });
    }

    // Tentativa de adicionar o 11º item
    const response = await request(app)
      .post('/carts/items')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        cart_id: cartId,
        jogo_id: gameId,
        quantidade: 1
      })
      .expect(400);

    expect(response.body.error).toMatch(/limite máximo de itens/i);
  });

  // TESTE 4: Calcular subtotal (GET /carts/:id)
  test('Deve calcular subtotal corretamente', async () => {
    const response = await request(app)
      .get(`/carts/${cartId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    // 11 itens (50.00 cada) = 550.00
    expect(response.body.subtotal).toBe(550.00);
  });

  // TESTE 5: Aplicar cupom (PUT /carts/:id/coupon)
  test('Deve aplicar cupom válido', async () => {
    // Primeiro cria um cupom
    await request(app)
      .post('/coupons')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        codigo: 'DESC10',
        desconto: 10,
        tipo: 'percentual',
        valor_minimo: 100
      });

    const response = await request(app)
      .put(`/carts/${cartId}/coupon`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        cupom: 'DESC10'
      })
      .expect(200);

    expect(response.body.cupom_aplicado).toBe('DESC10');
    expect(response.body.desconto).toBe(55.00); // 10% de 550.00
  });

  // TESTE 6: Validar cupom com valor mínimo (RN10)
  test('Deve falhar ao aplicar cupom em valor baixo', async () => {
    // Cria carrinho pequeno
    const smallCart = await request(app)
      .post('/carts')
      .set('Authorization', `Bearer ${authToken}`);
    
    await request(app)
      .post('/carts/items')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        cart_id: smallCart.body.id,
        jogo_id: gameId,
        quantidade: 1
      });

    const response = await request(app)
      .put(`/carts/${smallCart.body.id}/coupon`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        cupom: 'DESC10'
      })
      .expect(400);

    expect(response.body.error).toMatch(/valor mínimo não atingido/i);
  });
});