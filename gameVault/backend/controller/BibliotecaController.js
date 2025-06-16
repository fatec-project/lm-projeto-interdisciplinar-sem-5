import db from '../config/database.js';
import Biblioteca from '../model/Biblioteca.js';

const COLLECTION = 'biblioteca';

export default class BibliotecaController {
  constructor() {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const biblioteca = await db.getItem(COLLECTION);
    if (!biblioteca) {
      await db.setItem(COLLECTION, []);
    }
  }

  async adicionar(usuarioId, jogoId) {
    try {
      const bibliotecaItem = new Biblioteca(usuarioId, jogoId);
      const biblioteca = (await db.getItem(COLLECTION)) || [];
      
      const existe = biblioteca.some(
        item => item.usuarioId === Number(bibliotecaItem.usuarioId) && 
               item.jogoId === Number(bibliotecaItem.jogoId)
      );

      if (existe) {
        throw new Error('Jogo já está na biblioteca');
      }

      biblioteca.push(bibliotecaItem);
      await db.setItem(COLLECTION, biblioteca);
      return bibliotecaItem;
    } catch (error) {
      console.error('Erro ao adicionar à biblioteca:', error);
      throw error;
    }
  }

  async getBibliotecaByUsuario(usuarioId) {
    try {
      const biblioteca = (await db.getItem(COLLECTION)) || [];
      return biblioteca.filter(item => item.usuarioId === Number(usuarioId));
    } catch (error) {
      console.error('Erro ao buscar biblioteca:', error);
      throw error;
    }
  }

  async remover(usuarioId, jogoId) {
    try {
      const biblioteca = (await db.getItem(COLLECTION)) || [];
      const atualizado = biblioteca.filter(
        item => !(item.usuarioId === Number(usuarioId) && item.jogoId === Number(jogoId))
      );
      
      if (biblioteca.length === atualizado.length) {
        throw new Error('Item não encontrado na biblioteca');
      }
      
      await db.setItem(COLLECTION, atualizado);
      return true;
    } catch (error) {
      console.error('Erro ao remover da biblioteca:', error);
      throw error;
    }
  }
}