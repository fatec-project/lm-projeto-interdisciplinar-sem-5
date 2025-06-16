import db from '../config/database.js';
import ListaDesejos from '../model/ListaDesejos.js';

const COLLECTION = 'listaDesejos';

export default class ListaDesejosController {
  constructor() {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const lista = await db.getItem(COLLECTION);
    if (!lista) {
      await db.setItem(COLLECTION, []);
    }
  }

  async adicionar(usuarioId, jogoId) {
    try {
      const item = new ListaDesejos(usuarioId, jogoId);
      const lista = (await db.getItem(COLLECTION)) || [];
      
      const existe = lista.some(
        i => i.usuarioId === Number(item.usuarioId) && i.jogoId === Number(item.jogoId)
      );

      if (existe) {
        throw new Error('Jogo já está na lista de desejos');
      }

      lista.push(item);
      await db.setItem(COLLECTION, lista);
      return item;
    } catch (error) {
      console.error('Erro ao adicionar à lista de desejos:', error);
      throw error;
    }
  }

  async getListaByUsuario(usuarioId) {
    try {
      const lista = (await db.getItem(COLLECTION)) || [];
      return lista.filter(item => item.usuarioId === Number(usuarioId));
    } catch (error) {
      console.error('Erro ao buscar lista de desejos:', error);
      throw error;
    }
  }

  async remover(usuarioId, jogoId) {
    try {
      const lista = (await db.getItem(COLLECTION)) || [];
      const atualizado = lista.filter(
        item => !(item.usuarioId === Number(usuarioId) && item.jogoId === Number(jogoId))
      );
      
      if (lista.length === atualizado.length) {
        throw new Error('Item não encontrado na lista de desejos');
      }
      
      await db.setItem(COLLECTION, atualizado);
      return true;
    } catch (error) {
      console.error('Erro ao remover da lista de desejos:', error);
      throw error;
    }
  }

  async limparLista(usuarioId) {
    try {
      const lista = (await db.getItem(COLLECTION)) || [];
      const atualizado = lista.filter(item => item.usuarioId !== Number(usuarioId));
      
      if (lista.length === atualizado.length) {
        throw new Error('Nenhum item encontrado para este usuário');
      }
      
      await db.setItem(COLLECTION, atualizado);
      return true;
    } catch (error) {
      console.error('Erro ao limpar lista de desejos:', error);
      throw error;
    }
  }
}