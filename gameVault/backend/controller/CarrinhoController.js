import db from '../config/database.js';
import Carrinho from '../model/Carrinho.js';

const COLLECTION = 'carrinho';

export const CarrinhoController = {
  async addItem(usuarioId, jogoId, quantidade = 1) {
    try {
      const item = new Carrinho(usuarioId, jogoId, quantidade);
      const carrinho = (await db.getItem(COLLECTION)) || [];
      
      const existente = carrinho.find(
        i => i.usuarioId === item.usuarioId && i.jogoId === item.jogoId
      );

      if (existente) {
        existente.incrementarQuantidade(quantidade);
      } else {
        carrinho.push(item);
      }

      await db.setItem(COLLECTION, carrinho);
      return item;
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      throw error;
    }
  },

  async getCarrinhoByUsuario(usuarioId) {
    const carrinho = (await db.getItem(COLLECTION)) || [];
    return carrinho.filter(item => item.usuarioId === Number(usuarioId));
  },

  async removeItem(usuarioId, jogoId) {
    const carrinho = (await db.getItem(COLLECTION)) || [];
    const atualizado = carrinho.filter(
      item => !(item.usuarioId === Number(usuarioId) && item.jogoId === Number(jogoId))
    );
    await db.setItem(COLLECTION, atualizado);
    return true;
  },

  async clearCarrinho(usuarioId) {
    const carrinho = (await db.getItem(COLLECTION)) || [];
    const atualizado = carrinho.filter(item => item.usuarioId !== Number(usuarioId));
    await db.setItem(COLLECTION, atualizado);
    return true;
  }
};