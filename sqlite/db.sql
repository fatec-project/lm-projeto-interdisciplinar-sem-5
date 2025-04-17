-- SQLite version
PRAGMA foreign_keys = ON;

CREATE TABLE tipo_usuario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo TEXT NOT NULL UNIQUE
);

CREATE TABLE status_usuario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  status TEXT NOT NULL UNIQUE
);

CREATE TABLE usuario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  sobrenome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  data_cadastro DATE NOT NULL DEFAULT (DATE('now')),
  moedas INTEGER DEFAULT 0,
  status_id INTEGER NOT NULL,
  tipo_id INTEGER NOT NULL,
  FOREIGN KEY (status_id) REFERENCES status_usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (tipo_id) REFERENCES tipo_usuario(id) ON DELETE CASCADE
);

CREATE TABLE tela (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tela TEXT NOT NULL
);

CREATE TABLE permissoes (
  tipo_usuario_id INTEGER,
  tela_id INTEGER,
  PRIMARY KEY (tipo_usuario_id, tela_id),
  FOREIGN KEY (tipo_usuario_id) REFERENCES tipo_usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (tela_id) REFERENCES tela(id) ON DELETE CASCADE
);

CREATE TABLE org (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cnpj TEXT NOT NULL UNIQUE,
  entidade TEXT NOT NULL,
  telefone TEXT,
  email TEXT,
  site TEXT,
  area_atuacao TEXT,
  administrador_id INTEGER,
  FOREIGN KEY (administrador_id) REFERENCES usuario(id) ON DELETE SET NULL
);

CREATE TABLE rede_social_org (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  org_id INTEGER NOT NULL,
  rede_social TEXT NOT NULL,
  url TEXT NOT NULL,
  FOREIGN KEY (org_id) REFERENCES org(id) ON DELETE CASCADE
);

CREATE TABLE status_post (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  status TEXT NOT NULL UNIQUE
);

CREATE TABLE post (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  autor_id INTEGER NOT NULL,
  data_publicacao DATETIME NOT NULL DEFAULT (DATETIME('now')),
  status_id INTEGER NOT NULL,
  FOREIGN KEY (autor_id) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (status_id) REFERENCES status_post(id) ON DELETE CASCADE
);

CREATE TABLE status_comentario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  status TEXT NOT NULL UNIQUE
);

CREATE TABLE comentario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conteudo TEXT NOT NULL,
  autor_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  data_criacao DATETIME NOT NULL DEFAULT (DATETIME('now')),
  status_id INTEGER NOT NULL,
  FOREIGN KEY (autor_id) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
  FOREIGN KEY (status_id) REFERENCES status_comentario(id) ON DELETE CASCADE
);

CREATE TABLE status_party (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  status TEXT NOT NULL UNIQUE
);

CREATE TABLE party (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jogador_id INTEGER NOT NULL,
  status_id INTEGER NOT NULL,
  FOREIGN KEY (jogador_id) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (status_id) REFERENCES status_party(id) ON DELETE CASCADE
);

CREATE TABLE personagem (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  vida INTEGER NOT NULL,
  ataque INTEGER NOT NULL,
  velocidade INTEGER NOT NULL,
  preco INTEGER NOT NULL
);

CREATE TABLE party_personagem (
  party_id INTEGER NOT NULL,
  personagem_id INTEGER NOT NULL,
  PRIMARY KEY (party_id, personagem_id),
  FOREIGN KEY (party_id) REFERENCES party(id) ON DELETE CASCADE,
  FOREIGN KEY (personagem_id) REFERENCES personagem(id) ON DELETE CASCADE
);

CREATE TABLE loja (
  id INTEGER PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE loja_personagem (
  loja_id INTEGER NOT NULL,
  personagem_id INTEGER NOT NULL,
  disponivel INTEGER DEFAULT 1, -- SQLite uses integers for booleans (1=true, 0=false)
  PRIMARY KEY (loja_id, personagem_id),
  FOREIGN KEY (loja_id) REFERENCES loja(id) ON DELETE CASCADE,
  FOREIGN KEY (personagem_id) REFERENCES personagem(id) ON DELETE CASCADE
);

CREATE TABLE usuario_personagem (
  usuario_id INTEGER NOT NULL,
  personagem_id INTEGER NOT NULL,
  data_compra DATETIME NOT NULL DEFAULT (DATETIME('now')),
  PRIMARY KEY (usuario_id, personagem_id),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (personagem_id) REFERENCES personagem(id) ON DELETE CASCADE
);

CREATE TABLE log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario_id INTEGER,
  acao TEXT NOT NULL,
  data_hora DATETIME NOT NULL DEFAULT (DATETIME('now')),
  detalhes TEXT,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE SET NULL
);