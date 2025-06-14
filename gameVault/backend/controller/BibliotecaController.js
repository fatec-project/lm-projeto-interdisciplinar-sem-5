import db from '../config/database.js';
import Biblioteca from '../model/Biblioteca.js';

const COLLECTION = 'biblioteca';

export const BibliotecaController = {
  async adicionar(usuarioId, jogoId) {
    try {
      const bibliotecaItem = new Biblioteca(usuarioId, jogoId);
      const biblioteca = (await db.getItem(COLLECTION)) || [];
      
      const existe = biblioteca.some(
        item => item.usuarioId === bibliotecaItem.usuarioId && 
               item.jogoId === bibliotecaItem.jogoId
      );

      if (!existe) {
        biblioteca.push(bibliotecaItem);
        await db.setItem(COLLECTION, biblioteca);
      }

      return bibliotecaItem;
    } catch (error) {
      console.error('Erro ao adicionar à biblioteca:', error);
      throw error;
    }
  },

  async getBibliotecaByUsuario(usuarioId) {
    const biblioteca = (await db.getItem(COLLECTION)) || [];
    return biblioteca.filter(item => item.usuarioId === Number(usuarioId));
  },

  async remover(usuarioId, jogoId) {
    const biblioteca = (await db.getItem(COLLECTION)) || [];
    const atualizado = biblioteca.filter(
      item => !(item.usuarioId === Number(usuarioId) && item.jogoId === Number(jogoId))
    );
    await db.setItem(COLLECTION, atualizado);
    return true;
  }
};