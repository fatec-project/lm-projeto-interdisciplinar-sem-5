const request = require('supertest');
const app = require('../app');
const db = require('../sqlite/db');

describe('CRUD de Usuários', () => {
  let userId;
  let authToken;

  // TESTE 1: Cadastro de usuário (POST /users)
  test('Deve criar um novo usuário', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        nome: 'Teste User',
        email: 'teste@example.com',
        senha: 'Senha123@',
        tipo: 'cliente'
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('teste@example.com');
    expect(response.body).not.toHaveProperty('senha'); // Senha não deve ser retornada
    
    userId = response.body.id;
  });

  // TESTE 2: Email duplicado
  test('Deve falhar ao criar usuário com email duplicado', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        nome: 'Outro User',
        email: 'teste@example.com', // Email já existe
        senha: 'OutraSenha123@',
        tipo: 'cliente'
      })
      .expect(400);

    expect(response.body.error).toMatch(/email já cadastrado/i);
  });

  // TESTE 3: Login (POST /auth/login)
  test('Deve fazer login com credenciais válidas', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'teste@example.com',
        senha: 'Senha123@'
      })
      .expect(200);

    expect(response.body).toHaveProperty('token');
    authToken = response.body.token;
  });

  // TESTE 4: Acesso a perfil (GET /users/:id)
  test('Deve retornar perfil do usuário', async () => {
    const response = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body.id).toBe(userId);
    expect(response.body.email).toBe('teste@example.com');
  });

  // TESTE 5: Atualização de usuário (PUT /users/:id)
  test('Deve atualizar informações do usuário', async () => {
    const response = await request(app)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nome: 'Nome Atualizado'
      })
      .expect(200);

    expect(response.body.nome).toBe('Nome Atualizado');
  });

  // TESTE 6: Tentativa de acesso não autorizado
  test('Deve bloquear acesso sem token', async () => {
    await request(app)
      .get(`/users/${userId}`)
      .expect(401);
  });
});