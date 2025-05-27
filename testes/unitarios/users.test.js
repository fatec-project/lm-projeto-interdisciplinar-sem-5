const { app, db } = require('./setupTest');
const request = require('supertest');

describe('API de Usuários', () => {
  let authToken;

  beforeAll(async () => {
    // Login como admin para testes
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@test.com', senha: 'hash123' });
    authToken = res.body.token;
  });

  test('POST /users - Deve criar um novo usuário cliente', async () => {
    const res = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Novo Usuário',
        email: 'novo@test.com',
        senha: 'senhaSegura123',
        tipo: 'cliente',
        cpf: '12345678901'
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('novo@test.com');
    expect(res.body).not.toHaveProperty('senha');
    expect(res.body.tipo).toBe('cliente');
  });

  test('POST /users - Deve falhar sem email', async () => {
    const res = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Sem Email',
        senha: 'senha123',
        tipo: 'cliente'
      })
      .expect(400);

    expect(res.body.error).toMatch(/email é obrigatório/i);
  });

  test('GET /users/:id - Deve retornar um usuário específico', async () => {
    // Primeiro cria um usuário para testar
    const newUser = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Usuário Teste',
        email: 'teste@test.com',
        senha: 'senha123',
        tipo: 'cliente'
      });

    const res = await request(app)
      .get(`/users/${newUser.body.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(res.body.id).toBe(newUser.body.id);
    expect(res.body.nome).toBe('Usuário Teste');
  });

  test('PUT /users/:id - Deve atualizar um usuário', async () => {
    const newUser = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Para Atualizar',
        email: 'atualizar@test.com',
        senha: 'senha123',
        tipo: 'cliente'
      });

    const res = await request(app)
      .put(`/users/${newUser.body.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ nome: 'Nome Atualizado' })
      .expect(200);

    expect(res.body.nome).toBe('Nome Atualizado');
  });

  test('DELETE /users/:id - Deve inativar um usuário', async () => {
    const newUser = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Para Deletar',
        email: 'deletar@test.com',
        senha: 'senha123',
        tipo: 'cliente'
      });

    await request(app)
      .delete(`/users/${newUser.body.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204);

    // Verifica se foi inativado
    const user = await db.get(
      'SELECT status FROM usuarios WHERE id = ?', 
      [newUser.body.id]
    );
    expect(user.status).toBe('inativo');
  });
});