const { app, db } = require('./setupTest');
const request = require('supertest');

describe('API de Avaliações e Comentários', () => {
  let authToken;
  let userId;
  let gameId;

  beforeAll(async () => {
    // Cria usuário cliente
    const userRes = await request(app)
      .post('/users')
      .send({
        nome: 'Reviewer',
        email: 'reviewer@test.com',
        senha: 'senha123',
        tipo: 'cliente'
      });
    userId = userRes.body.id;

    // Login como cliente
    const loginRes = await request(app)
      .post('/auth/login')
      .send({ email: 'reviewer@test.com', senha: 'senha123' });
    authToken = loginRes.body.token;

    // Cria jogo para teste
    await db.run(`
      INSERT INTO jogos (id, nome, preco_base, desenvolvedora)
      VALUES ('game2', 'Jogo para Avaliar', 49.90, 'Dev Test')
    `);
    gameId = 'game2';

    // Simula compra do jogo
    await db.run(`
      INSERT INTO pedidos (id, usuario_id, status, total, metodo_pagamento)
      VALUES ('order2', '${userId}', 'pago', 49.90, 'pix')
    `);
    await db.run(`
      INSERT INTO keys (id, jogo_id, codigo, status, lote)
      VALUES ('key2', '${gameId}', 'EFGH-5678', 'vendida', 'lote1')
    `);
    await db.run(`
      INSERT INTO itens_pedido (pedido_id, key_id, preco_unitario)
      VALUES ('order2', 'key2', 49.90)
    `);
    await db.run(`
      INSERT INTO biblioteca (usuario_id, key_id)
      VALUES ('${userId}', 'key2')
    `);
  });

  test('POST /reviews - Deve criar uma avaliação', async () => {
    const res = await request(app)
      .post('/reviews')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        jogo_id: gameId,
        nota: 9.5,
        titulo: 'Excelente jogo',
        texto: 'Gostei muito da jogabilidade',
        horas_jogadas: 20,
        plataforma: 'pc'
      })
      .expect(201);

    expect(res.body.nota).toBe(9.5);
    expect(res.body.comprovado_compra).toBe(1);
  });

  test('POST /reviews - Deve falhar se não possuir o jogo', async () => {
    // Cria outro jogo que o usuário não possui
    await db.run(`
      INSERT INTO jogos (id, nome, preco_base, desenvolvedora)
      VALUES ('game3', 'Jogo Não Comprado', 39.90, 'Dev Test')
    `);

    const res = await request(app)
      .post('/reviews')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        jogo_id: 'game3',
        nota: 5,
        texto: 'Não joguei ainda'
      })
      .expect(403);

    expect(res.body.error).toMatch(/você precisa possuir este jogo/i);
  });

  test('POST /comments - Deve criar um comentário', async () => {
    const res = await request(app)
      .post('/comments')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        jogo_id: gameId,
        texto: 'Ótimo jogo, recomendo!'
      })
      .expect(201);

    expect(res.body.texto).toBe('Ótimo jogo, recomendo!');
  });
});