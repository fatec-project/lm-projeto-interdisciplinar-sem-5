const db = require('../db');
const app = require('../app');

beforeAll(async () => {
  // Configura banco de dados em memória
  await db.setupDatabase(':memory:');
  
  // Insere dados básicos para testes
  await db.run("INSERT INTO plataformas (id, nome) VALUES ('pc', 'PC')");
  await db.run("INSERT INTO generos (id, nome) VALUES ('rpg', 'RPG')");
  await db.run(`
    INSERT INTO usuarios (id, nome, email, senha, tipo, nivel_acesso) 
    VALUES ('admin1', 'Admin', 'admin@test.com', 'hash123', 'admin', 'total')
  `);
});

afterAll(async () => {
  await db.closeDatabase();
});

module.exports = {
  app,
  db
};