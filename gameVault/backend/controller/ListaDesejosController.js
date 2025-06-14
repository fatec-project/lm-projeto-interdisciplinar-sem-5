import db from '../config/database.js';
import ListaDesejos from '../model/ListaDesejos.js';

const COLLECTION = 'listaDesejos';

export const ListaDesejosController = {
  async adicionar(usuarioId, jogoId) {
    try {
      const item = new ListaDesejos(usuarioId, jogoId);
      const lista = (await db.getItem(COLLECTION)) || [];
      
      const existe = lista.some(
        i => i.usuarioId === item.usuarioId && i.jogoId === item.jogoId
      );

      if (!existe) {
        lista.push(item);
        await db.setItem(COLLECTION, lista);
      }

      return item;
    } catch (error) {
      console.error('Erro ao adicionar à lista de desejos:', error);
      throw error;
    }
  },

  async getListaByUsuario(usuarioId) {
    const lista = (await db.getItem(COLLECTION)) || [];
    return lista.filter(item => item.usuarioId === Number(usuarioId));
  },

  async remover(usuarioId, jogoId) {
    const lista = (await db.getItem(COLLECTION)) || [];
    const atualizado = lista.filter(
      item => !(item.usuarioId === Number(usuarioId) && item.jogoId === Number(jogoId))
    );
    await db.setItem(COLLECTION, atualizado);
    return true;
  },

  async limparLista(usuarioId) {
    const lista = (await db.getItem(COLLECTION)) || [];
    const atualizado = lista.filter(item => item.usuarioId !== Number(usuarioId));
    await db.setItem(COLLECTION, atualizado);
    return true;
  }
};