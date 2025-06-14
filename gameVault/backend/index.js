import * as AvaliacaoController from './controller/AvaliacaoController.js';
import * as BibliotecaController from './controller/BibliotecaController.js';
import * as CarrinhoController from './controller/CarrinhoController.js';
import UsuarioController from './controller/UsuarioController.js';
import * as ListaDesejosController from './controller/ListaDesejosController.js';

const usuarioController = new UsuarioController;

const GameVaultAPI = {
  avaliacoes: {
    criar: (jogoId, usuarioId, gostou) => AvaliacaoController.avaliar(jogoId, usuarioId, gostou),
    listarPorJogo: (jogoId) => AvaliacaoController.getAvaliacoesByJogo(jogoId),
    buscar: (usuarioId, jogoId) => AvaliacaoController.getAvaliacao(usuarioId, jogoId),
    remover: (usuarioId, jogoId) => AvaliacaoController.remover(usuarioId, jogoId)
  },

  biblioteca: {
    adicionar: (usuarioId, jogoId) => BibliotecaController.adicionar(usuarioId, jogoId),
    listar: (usuarioId) => BibliotecaController.getBibliotecaByUsuario(usuarioId),
    remover: (usuarioId, jogoId) => BibliotecaController.remover(usuarioId, jogoId)
  },

  carrinho: {
    adicionar: (usuarioId, jogoId, quantidade) => CarrinhoController.addItem(usuarioId, jogoId, quantidade),
    listar: (usuarioId) => CarrinhoController.getCarrinhoByUsuario(usuarioId),
    remover: (usuarioId, jogoId) => CarrinhoController.removeItem(usuarioId, jogoId),
    limpar: (usuarioId) => CarrinhoController.clearCarrinho(usuarioId)
  },

  usuarios: {
    criar: (nome, email, senha) => usuarioController.criar(nome, email, senha),
    login: (identificador, senha) => usuarioController.login(identificador, senha),
    listar: () => usuarioController.listar(),
    buscar: (id) => usuarioController.buscarPorId(id),
    atualizar: (id, dados) => usuarioController.atualizar(id, dados),
    remover: (id) => usuarioController.remover(id)
  },

  listaDesejos: {
    adicionar: (usuarioId, jogoId) => ListaDesejosController.adicionar(usuarioId, jogoId),
    listar: (usuarioId) => ListaDesejosController.getListaByUsuario(usuarioId),
    remover: (usuarioId, jogoId) => ListaDesejosController.remover(usuarioId, jogoId),
    limpar: (usuarioId) => ListaDesejosController.limparLista(usuarioId)
  },

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

async function inicializar() {
  try {
    console.log('API GameVault inicializada com sucesso');
  } catch (error) {
    console.error('Erro na inicialização:', error);
  }
}

inicializar();

export default GameVaultAPI;