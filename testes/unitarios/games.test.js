const { app, db } = require('./setupTest');
const request = require('supertest');

describe('API de Jogos', () => {
  let authToken;
  let gameId;

  beforeAll(async () => {
    // Login como admin
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@test.com', senha: 'hash123' });
    authToken = res.body.token;
  });

  test('POST /games - Deve criar um novo jogo', async () => {
    const res = await request(app)
      .post('/games')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Cyberpunk 2077',
        descricao: 'RPG futurista',
        preco_base: 199.90,
        desenvolvedora: 'CD Projekt Red',
        plataformas: ['pc'],
        generos: ['rpg']
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('Cyberpunk 2077');
    expect(res.body.plataformas).toContain('pc');
    gameId = res.body.id;
  });

  test('POST /games - Deve falhar com preço negativo', async () => {
    const res = await request(app)
      .post('/games')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Jogo Inválido',
        preco_base: -10,
        desenvolvedora: 'Dev'
      })
      .expect(400);

    expect(res.body.error).toMatch(/preço deve ser positivo/i);
  });

  test('GET /games/:id - Deve retornar um jogo específico', async () => {
    const res = await request(app)
      .get(`/games/${gameId}`)
      .expect(200);

    expect(res.body.id).toBe(gameId);
    expect(res.body.media_avaliacoes).toBe(0);
  });

  test('PUT /games/:id - Deve atualizar um jogo', async () => {
    const res = await request(app)
      .put(`/games/${gameId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Cyberpunk 2077: Edição Atualizada',
        preco_base: 149.90
      })
      .expect(200);

    expect(res.body.nome).toBe('Cyberpunk 2077: Edição Atualizada');
    expect(res.body.preco_base).toBe(149.90);
  });

  test('GET /games - Deve listar todos os jogos', async () => {
    const res = await request(app)
      .get('/games')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});