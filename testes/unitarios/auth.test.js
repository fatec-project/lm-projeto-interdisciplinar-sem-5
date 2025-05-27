const { app, db } = require('./setupTest');
const request = require('supertest');

describe('API de Autenticação', () => {
  test('POST /auth/login - Deve fazer login com credenciais válidas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@test.com',
        senha: 'hash123'
      })
      .expect(200);

    expect(res.body).toHaveProperty('token');
  });

  test('POST /auth/login - Deve falhar com senha incorreta', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'admin@test.com',
        senha: 'senhaerrada'
      })
      .expect(401);

    expect(res.body.error).toMatch(/credenciais inválidas/i);
  });

  test('POST /auth/register - Deve registrar novo usuário', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        nome: 'Novo Usuário',
        email: 'novousuario@test.com',
        senha: 'SenhaSegura123',
        tipo: 'cliente'
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('novousuario@test.com');
  });
});