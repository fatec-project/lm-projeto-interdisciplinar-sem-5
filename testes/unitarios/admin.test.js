const { app, db } = require('./setupTest');
const request = require('supertest');

describe('API Administrativa', () => {
  let adminToken;
  let userId;
  let gameId;

  beforeAll(async () => {
    // Login como admin
    const loginRes = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@test.com', senha: 'hash123' });
    adminToken = loginRes.body.token;

    // Cria usuário para testes
    const userRes = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        nome: 'Usuário para Moderação',
        email: 'moderar@test.com',
        senha: 'senha123',
        tipo: 'cliente'
      });
    userId = userRes.body.id;

    // Cria jogo para testes
    await db.run(`
      INSERT INTO jogos (id, nome, preco_base, desenvolvedora)
      VALUES ('game4', 'Jogo Admin', 29.90, 'Dev Test')
    `);
    gameId = 'game4';
  });

  test('POST /admin/keys - Deve importar lote de keys', async () => {
    const res = await request(app)
      .post('/admin/keys')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        jogo_id: gameId,
        keys: ['NEWK-EY01', 'NEWK-EY02'],
        lote: 'lote-admin'
      })
      .expect(201);

    expect(res.body.total).toBe(2);
    expect(res.body.importadas).toBe(2);
  });

  test('PUT /admin/users/:id/ban - Deve banir um usuário', async () => {
    await request(app)
      .put(`/admin/users/${userId}/ban`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ motivo: 'Comportamento inadequado' })
      .expect(200);

    const user = await db.get(
      'SELECT status FROM usuarios WHERE id = ?', 
      [userId]
    );
    expect(user.status).toBe('inativo');
  });

  test('GET /admin/reports - Deve listar reportes pendentes', async () => {
    // Cria um reporte para teste
    await db.run(`
      INSERT INTO interacoes (id, usuario_id, jogo_id, texto, tipo)
      VALUES ('review1', '${userId}', '${gameId}', 'Texto qualquer', 'review')
    `);
    await db.run(`
      INSERT INTO reportes (id, conteudo_id, motivo, usuario_reporter_id)
      VALUES ('report1', 'review1', 'Conteúdo ofensivo', '${userId}')
    `);

    const res = await request(app)
      .get('/admin/reports')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});