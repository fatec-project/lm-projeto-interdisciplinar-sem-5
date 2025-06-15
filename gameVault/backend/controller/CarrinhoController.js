import db from '../config/database.js';
import Carrinho from '../model/Carrinho.js';

const COLLECTION = 'carrinho';

export default class CarrinhoController {
  constructor() {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const carrinho = await db.getItem(COLLECTION);
    if (!carrinho) {
      await db.setItem(COLLECTION, []);
    }
  }

  async addItem(usuarioId, jogoId, quantidade = 1) {
    try {
      const item = new Carrinho(usuarioId, jogoId, quantidade);
      const carrinho = (await db.getItem(COLLECTION)) || [];
      
      const existente = carrinho.find(
        i => i.usuarioId === Number(item.usuarioId) && i.jogoId === Number(item.jogoId)
      );

      if (existente) {
        existente.quantidade += Number(quantidade);
      } else {
        carrinho.push(item);
      }

      await db.setItem(COLLECTION, carrinho);
      return item;
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      throw error;
    }
  }

  async getCarrinhoByUsuario(usuarioId) {
    try {
      const carrinho = (await db.getItem(COLLECTION)) || [];
      return carrinho.filter(item => item.usuarioId === Number(usuarioId));
    } catch (error) {
      console.error('Erro ao buscar carrinho:', error);
      throw error;
    }
  }

  async removeItem(usuarioId, jogoId) {
    try {
      const carrinho = (await db.getItem(COLLECTION)) || [];
      const atualizado = carrinho.filter(
        item => !(item.usuarioId === Number(usuarioId) && item.jogoId === Number(jogoId))
      );
      
      if (carrinho.length === atualizado.length) {
        throw new Error('Item não encontrado no carrinho');
      }
      
      await db.setItem(COLLECTION, atualizado);
      return true;
    } catch (error) {
      console.error('Erro ao remover item:', error);
      throw error;
    }
  }

  async clearCarrinho(usuarioId) {
    try {
      const carrinho = (await db.getItem(COLLECTION)) || [];
      const atualizado = carrinho.filter(item => item.usuarioId !== Number(usuarioId));
      
      if (carrinho.length === atualizado.length) {
        throw new Error('Nenhum item encontrado para este usuário');
      }
      
      await db.setItem(COLLECTION, atualizado);
      return true;
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      throw error;
    }
  }
}