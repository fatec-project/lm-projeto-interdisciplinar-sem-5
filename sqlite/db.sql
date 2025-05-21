-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    cpf TEXT UNIQUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT CHECK(status IN ('ativo', 'inativo')) DEFAULT 'ativo',
    tipo TEXT CHECK(tipo IN ('cliente', 'admin')) NOT NULL,
    nivel_acesso TEXT CHECK(nivel_acesso IN ('basico', 'total')) DEFAULT 'basico'
);

-- Tabela de Jogos
CREATE TABLE IF NOT EXISTS jogos (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco_base REAL CHECK(preco_base >= 0) NOT NULL,
    desenvolvedora TEXT NOT NULL,
    publisher TEXT,
    data_lancamento DATE,
    imagem_url TEXT,
    media_avaliacoes REAL DEFAULT 0.0,
    total_avaliacoes INTEGER DEFAULT 0
);

-- Tabela de Plataformas
CREATE TABLE IF NOT EXISTS plataformas (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE
);

-- Tabela de Gêneros
CREATE TABLE IF NOT EXISTS generos (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL UNIQUE
);

-- Relação Jogos-Plataformas (N-N)
CREATE TABLE IF NOT EXISTS jogo_plataformas (
    jogo_id TEXT NOT NULL,
    plataforma_id TEXT NOT NULL,
    PRIMARY KEY (jogo_id, plataforma_id),
    FOREIGN KEY (jogo_id) REFERENCES jogos(id) ON DELETE CASCADE,
    FOREIGN KEY (plataforma_id) REFERENCES plataformas(id) ON DELETE CASCADE
);

-- Relação Jogos-Gêneros (N-N)
CREATE TABLE IF NOT EXISTS jogo_generos (
    jogo_id TEXT NOT NULL,
    genero_id TEXT NOT NULL,
    PRIMARY KEY (jogo_id, genero_id),
    FOREIGN KEY (jogo_id) REFERENCES jogos(id) ON DELETE CASCADE,
    FOREIGN KEY (genero_id) REFERENCES generos(id) ON DELETE CASCADE
);

-- Tabela de Keys
CREATE TABLE IF NOT EXISTS keys (
    id TEXT PRIMARY KEY,
    jogo_id TEXT NOT NULL,
    codigo TEXT NOT NULL UNIQUE,
    status TEXT CHECK(status IN ('disponivel', 'reservada', 'vendida', 'resgatada', 'invalida')) DEFAULT 'disponivel',
    lote TEXT NOT NULL,
    data_aquisicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (jogo_id) REFERENCES jogos(id) ON DELETE CASCADE
);

-- Tabela de Cupons
CREATE TABLE IF NOT EXISTS cupons (
    codigo TEXT PRIMARY KEY,
    desconto REAL NOT NULL,
    tipo TEXT CHECK(tipo IN ('percentual', 'valor')) NOT NULL,
    validade TIMESTAMP,
    usos_maximos INTEGER,
    usos_atual INTEGER DEFAULT 0,
    valor_minimo REAL DEFAULT 0
);

-- Tabela de Carrinhos
CREATE TABLE IF NOT EXISTS carrinhos (
    id TEXT PRIMARY KEY,
    usuario_id TEXT NOT NULL,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cupom_aplicado TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (cupom_aplicado) REFERENCES cupons(codigo)
);

-- Tabela de Itens do Carrinho
CREATE TABLE IF NOT EXISTS itens_carrinho (
    carrinho_id TEXT NOT NULL,
    jogo_id TEXT NOT NULL,
    quantidade INTEGER CHECK(quantidade > 0) DEFAULT 1,
    preco_unitario REAL NOT NULL,
    PRIMARY KEY (carrinho_id, jogo_id),
    FOREIGN KEY (carrinho_id) REFERENCES carrinhos(id) ON DELETE CASCADE,
    FOREIGN KEY (jogo_id) REFERENCES jogos(id)
);

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id TEXT PRIMARY KEY,
    usuario_id TEXT NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT CHECK(status IN ('pendente', 'pago', 'cancelado', 'reembolsado')) DEFAULT 'pendente',
    total REAL NOT NULL,
    metodo_pagamento TEXT NOT NULL,
    transacao_id TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabela de Itens do Pedido
CREATE TABLE IF NOT EXISTS itens_pedido (
    pedido_id TEXT NOT NULL,
    key_id TEXT NOT NULL,
    preco_unitario REAL NOT NULL,
    desconto REAL DEFAULT 0,
    PRIMARY KEY (pedido_id, key_id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (key_id) REFERENCES keys(id)
);

-- Tabela de Biblioteca do Usuário
CREATE TABLE IF NOT EXISTS biblioteca (
    usuario_id TEXT NOT NULL,
    key_id TEXT NOT NULL,
    data_resgate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, key_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (key_id) REFERENCES keys(id)
);

-- Tabela de Interações (avaliações e comentários)
CREATE TABLE IF NOT EXISTS interacoes (
    id TEXT PRIMARY KEY,
    usuario_id TEXT NOT NULL,
    jogo_id TEXT NOT NULL,
    interacao_pai_id TEXT,
    titulo TEXT,
    texto TEXT NOT NULL,
    nota REAL CHECK(nota >= 0 AND nota <= 10),
    data_publicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_edicao TIMESTAMP,
    comprovado_compra INTEGER DEFAULT 0,
    horas_jogadas INTEGER DEFAULT 0,
    plataforma TEXT,
    versao_jogo TEXT,
    verificada INTEGER DEFAULT 0,
    votos_positivos INTEGER DEFAULT 0,
    votos_negativos INTEGER DEFAULT 0,
    editado INTEGER DEFAULT 0,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (jogo_id) REFERENCES jogos(id) ON DELETE CASCADE,
    FOREIGN KEY (interacao_pai_id) REFERENCES interacoes(id) ON DELETE CASCADE
);

-- Tabela de Reportes
CREATE TABLE IF NOT EXISTS reportes (
    id TEXT PRIMARY KEY,
    conteudo_id TEXT NOT NULL,
    motivo TEXT NOT NULL,
    usuario_reporter_id TEXT NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT CHECK(status IN ('pendente', 'analisado', 'rejeitado')) DEFAULT 'pendente',
    acao_tomada TEXT,
    admin_responsavel TEXT,
    FOREIGN KEY (usuario_reporter_id) REFERENCES usuarios(id),
    FOREIGN KEY (admin_responsavel) REFERENCES usuarios(id)
);

-- Tabela de Tickets de Suporte
CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY,
    usuario_id TEXT NOT NULL,
    titulo TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT CHECK(status IN ('aberto', 'em_andamento', 'resolvido', 'fechado')) DEFAULT 'aberto',
    pedido_id TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

-- Tabela de Mensagens de Suporte
CREATE TABLE IF NOT EXISTS mensagens_ticket (
    id TEXT PRIMARY KEY,
    ticket_id TEXT NOT NULL,
    usuario_id TEXT NOT NULL,
    texto TEXT NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Índices úteis
CREATE INDEX IF NOT EXISTS idx_keys_jogo_status ON keys(jogo_id, status);
CREATE INDEX IF NOT EXISTS idx_pedidos_usuario_status ON pedidos(usuario_id, status);
CREATE INDEX IF NOT EXISTS idx_reportes_status ON reportes(status);
