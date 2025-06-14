import db from './database';

const COLLECTION = 'carrinho';

export const CarrinhoController = {
  async addItem(item) {
    const carrinho = (await db.getItem(COLLECTION)) || [];
    const existente = carrinho.find(
      i => i.usuarioId === item.usuarioId && i.jogoId === item.jogoId
    );

    if (existente) {
      existente.quantidade += item.quantidade;
    } else {
      carrinho.push(item);
    }

    await db.setItem(COLLECTION, carrinho);
    return item;
  },

  async getCarrinhoByUsuario(usuarioId) {
    const carrinho = (await db.getItem(COLLECTION)) || [];
    return carrinho.filter(i => i.usuarioId === usuarioId);
  },

  async removeItem(usuarioId, jogoId) {
    const carrinho = (await db.getItem(COLLECTION)) || [];
    const atualizado = carrinho.filter(
      i => !(i.usuarioId === usuarioId && i.jogoId === jogoId)
    );
    await db.setItem(COLLECTION, atualizado);
  },

  async clearCarrinho(usuarioId) {
    const carrinho = (await db.getItem(COLLECTION)) || [];
    const atualizado = carrinho.filter(i => i.usuarioId !== usuarioId);
    await db.setItem(COLLECTION, atualizado);
  }
};
