// backend/index.js
import * as AvaliacaoController from './controller/AvaliacaoController.js';
import * as BibliotecaController from './controller/BibliotecaController.js';
import * as CarrinhoController from './controller/CarrinhoController.js';
import * as UsuarioController from './controller/UsuarioController.js';

// Interface de comunicação com o frontend
const GameVaultAPI = {
  // Avaliações
  avaliacoes: {
    criar: (jogoId, usuarioId, gostou) => AvaliacaoController.avaliar(jogoId, usuarioId, gostou),
    listarPorJogo: (jogoId) => AvaliacaoController.getAvaliacoesByJogo(jogoId),
    buscar: (usuarioId, jogoId) => AvaliacaoController.getAvaliacao(usuarioId, jogoId),
    remover: (usuarioId, jogoId) => AvaliacaoController.remover(usuarioId, jogoId)
  },

  // Biblioteca
  biblioteca: {
    adicionar: (usuarioId, jogoId) => BibliotecaController.adicionar(usuarioId, jogoId),
    listar: (usuarioId) => BibliotecaController.getBibliotecaByUsuario(usuarioId),
    remover: (usuarioId, jogoId) => BibliotecaController.remover(usuarioId, jogoId)
  },

  // Carrinho
  carrinho: {
    adicionar: (usuarioId, jogoId, quantidade) => CarrinhoController.addItem(usuarioId, jogoId, quantidade),
    listar: (usuarioId) => CarrinhoController.getCarrinhoByUsuario(usuarioId),
    remover: (usuarioId, jogoId) => CarrinhoController.removeItem(usuarioId, jogoId),
    limpar: (usuarioId) => CarrinhoController.clearCarrinho(usuarioId)
  },

  // Usuários
  usuarios: {
    criar: (nome, email, senha) => UsuarioController.criar(nome, email, senha),
    listar: () => UsuarioController.listar(),
    buscar: (id) => UsuarioController.buscarPorId(id),
    atualizar: (id, dados) => UsuarioController.atualizar(id, dados),
    remover: (id) => UsuarioController.remover(id)
  },

  // Métodos auxiliares
  utils: {
    tratarErro: (error) => {
      console.error('Erro na API:', error);
      return {
        sucesso: false,
        mensagem: error.message || 'Erro desconhecido'
      };
    }
  }
};

// Inicialização do banco de dados (opcional)
async function inicializar() {
  try {
    // Pode adicionar lógica de inicialização aqui se necessário
    console.log('API GameVault inicializada com sucesso');
  } catch (error) {
    console.error('Erro na inicialização:', error);
  }
}

inicializar();

export default GameVaultAPI;