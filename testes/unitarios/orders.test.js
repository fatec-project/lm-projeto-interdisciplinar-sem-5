const { app, db } = require('./setupTest');
const request = require('supertest');

describe('API de Carrinho e Pedidos', () => {
  let authToken;
  let userId;
  let gameId;
  let cartId;

  beforeAll(async () => {
    // Cria usuário cliente
    const userRes = await request(app)
      .post('/users')
      .send({
        nome: 'Cliente Teste',
        email: 'cliente@test.com',
        senha: 'senha123',
        tipo: 'cliente'
      });
    userId = userRes.body.id;

    // Login como cliente
    const loginRes = await request(app)
      .post('/auth/login')
      .send({ email: 'cliente@test.com', senha: 'senha123' });
    authToken = loginRes.body.token;

    // Cria jogo para teste
    const gameRes = await db.run(`
      INSERT INTO jogos (id, nome, preco_base, desenvolvedora)
      VALUES ('game1', 'Jogo Teste', 59.90, 'Dev Test')
    `);
    gameId = 'game1';
  });

  test('POST /carts - Deve criar um carrinho', async () => {
    const res = await request(app)
      .post('/carts')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(201);

    expect(res.body.usuario_id).toBe(userId);
    cartId = res.body.id;
  });

  test('POST /carts/items - Deve adicionar item ao carrinho', async () => {
    const res = await request(app)
      .post('/carts/items')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        cart_id: cartId,
        jogo_id: gameId,
        quantidade: 1
      })
      .expect(201);

    expect(res.body.cart_id).toBe(cartId);
    expect(res.body.jogo_id).toBe(gameId);
  });

  test('POST /orders - Deve criar um pedido a partir do carrinho', async () => {
    // Primeiro cria uma key disponível
    await db.run(`
      INSERT INTO keys (id, jogo_id, codigo, status, lote)
      VALUES ('key1', '${gameId}', 'ABCD-1234', 'disponivel', 'lote1')
    `);

    const res = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        cart_id: cartId,
        metodo_pagamento: 'pix'
      })
      .expect(201);

    expect(res.body.usuario_id).toBe(userId);
    expect(res.body.status).toBe('pendente');
    expect(res.body.total).toBe(59.90);
  });

  test('GET /orders/:id - Deve retornar um pedido específico', async () => {
    // Cria um pedido para teste
    const orderRes = await db.run(`
      INSERT INTO pedidos (id, usuario_id, total, metodo_pagamento, status)
      VALUES ('order1', '${userId}', 100.00, 'pix', 'pago')
    `);

    const res = await request(app)
      .get('/orders/order1')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(res.body.id).toBe('order1');
    expect(res.body.status).toBe('pago');
  });
});