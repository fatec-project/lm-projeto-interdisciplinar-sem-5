const request = require('supertest');
const app = require('../app');
const db = require('../sqlite/db');

beforeAll(async () => {
  // Configuração do banco de dados de teste
  await db.setupDatabase(':memory:'); 
});

afterAll(async () => {
  await db.closeDatabase();
});

describe('CRUD de Jogos', () => {
  let gameId;

  // TESTE 1: Criação de jogo (POST /games)
  test('Deve criar um novo jogo', async () => {
    const response = await request(app)
      .post('/games')
      .send({
        nome: 'The Witcher 3',
        descricao: 'RPG de mundo aberto',
        preco_base: 99.90,
        desenvolvedora: 'CD Projekt Red',
        plataformas: ['PC', 'PS5'],
        generos: ['RPG', 'Ação']
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe('The Witcher 3');
    expect(response.body.plataformas).toHaveLength(2);
    
    gameId = response.body.id;
  });

  // TESTE 2: Validação de campos obrigatórios
  test('Deve falhar ao criar jogo sem nome', async () => {
    const response = await request(app)
      .post('/games')
      .send({
        descricao: 'Jogo sem nome',
        preco_base: 100.00
      })
      .expect(400);

    expect(response.body.error).toBe('Nome é obrigatório');
  });

  // TESTE 3: Validação de preço negativo
  test('Deve falhar com preço negativo', async () => {
    const response = await request(app)
      .post('/games')
      .send({
        nome: 'Jogo Inválido',
        preco_base: -10.00
      })
      .expect(400);

    expect(response.body.error).toMatch(/preço deve ser positivo/i);
  });

  // TESTE 4: Buscar jogo por ID (GET /games/:id)
  test('Deve retornar um jogo específico', async () => {
    const response = await request(app)
      .get(`/games/${gameId}`)
      .expect(200);

    expect(response.body.id).toBe(gameId);
    expect(response.body).toHaveProperty('media_avaliacoes', 0);
  });

  // TESTE 5: Atualizar jogo (PUT /games/:id)
  test('Deve atualizar um jogo existente', async () => {
    const response = await request(app)
      .put(`/games/${gameId}`)
      .send({
        nome: 'The Witcher 3: Edição Completa',
        preco_base: 129.90
      })
      .expect(200);

    expect(response.body.nome).toBe('The Witcher 3: Edição Completa');
    expect(response.body.preco_base).toBe(129.90);
  });

  // TESTE 6: Listar jogos (GET /games)
  test('Deve listar todos os jogos', async () => {
    const response = await request(app)
      .get('/games')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // TESTE 7: Deletar jogo (DELETE /games/:id)
  test('Deve deletar um jogo', async () => {
    await request(app)
      .delete(`/games/${gameId}`)
      .expect(204);

    // Verifica se realmente foi deletado
    await request(app)
      .get(`/games/${gameId}`)
      .expect(404);
  });
});