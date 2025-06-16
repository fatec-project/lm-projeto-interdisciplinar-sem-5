import AvaliacaoController from './controller/AvaliacaoController.js';
import BibliotecaController from './controller/BibliotecaController.js';
import CarrinhoController from './controller/CarrinhoController.js';
import UsuarioController from './controller/UsuarioController.js';

// Instâncias dos controllers
const usuarioController = new UsuarioController();
const avaliacaoController = new AvaliacaoController();
const bibliotecaController = new BibliotecaController();
const carrinhoController = new CarrinhoController();
const listaDesejosController = new ListaDesejosController();

const GameVaultAPI = {
  avaliacoes: {
    criar: (jogoId, usuarioId, gostou) => avaliacaoController.avaliar(jogoId, usuarioId, gostou),
    listarPorJogo: (jogoId) => avaliacaoController.getAvaliacoesByJogo(jogoId),
    buscar: (usuarioId, jogoId) => avaliacaoController.getAvaliacao(usuarioId, jogoId),
    remover: (usuarioId, jogoId) => avaliacaoController.remover(usuarioId, jogoId)
  },

  biblioteca: {
    adicionar: (usuarioId, jogoId) => bibliotecaController.adicionar(usuarioId, jogoId),
    listar: (usuarioId) => bibliotecaController.getBibliotecaByUsuario(usuarioId),
    remover: (usuarioId, jogoId) => bibliotecaController.remover(usuarioId, jogoId)
  },

  carrinho: {
    adicionar: (usuarioId, jogoId) => carrinhoController.addItem(usuarioId, jogoId),
    listar: (usuarioId) => carrinhoController.getCarrinhoByUsuario(usuarioId),
    remover: (usuarioId, jogoId) => carrinhoController.removeItem(usuarioId, jogoId),
    limpar: (usuarioId) => carrinhoController.clearCarrinho(usuarioId)
  },

  usuarios: {
    criar: ({ nome, email, senha }) => usuarioController.criar(nome, email, senha),
    login: ({ identificador, senha }) => usuarioController.login(identificador, senha),
    listar: () => usuarioController.listar(),
    buscar: (id) => usuarioController.buscarPorId(id),
    atualizar: (id, dados) => usuarioController.atualizar(id, dados),
    remover: (id) => usuarioController.remover(id)
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

// Inicialização assíncrona
async function inicializar() {
  try {
    await Promise.all([
      usuarioController.initializeDatabase(),
      avaliacaoController.initializeDatabase(),
      bibliotecaController.initializeDatabase(),
      carrinhoController.initializeDatabase(),
    ]);
    console.log('API GameVault inicializada com sucesso');
  } catch (error) {
    console.error('Erro na inicialização:', error);
  }
}

inicializar();

export default GameVaultAPI;