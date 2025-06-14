import db from '../config/database.js';
import Avaliacao from '../model/Avaliacao.js';

const COLLECTION = 'avaliacoes';

export default class AvaliacaoController {
  constructor() {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const avaliacoes = await db.getItem(COLLECTION);
    if (!avaliacoes) {
      await db.setItem(COLLECTION, []);
    }
  }

  async avaliar(jogoId, usuarioId, gostou) {
    try {
      const avaliacao = new Avaliacao(jogoId, usuarioId, gostou);
      const avaliacoes = (await db.getItem(COLLECTION)) || [];
      
      const index = avaliacoes.findIndex(
        a => a.jogoId === avaliacao.jogoId && a.usuarioId === avaliacao.usuarioId
      );

      if (index !== -1) {
        avaliacoes[index] = avaliacao;
      } else {
        avaliacoes.push(avaliacao);
      }

      await db.setItem(COLLECTION, avaliacoes);
      return avaliacao;
    } catch (error) {
      console.error('Erro ao avaliar:', error);
      throw error;
    }
  }

  async getAvaliacoesByJogo(jogoId) {
    const avaliacoes = (await db.getItem(COLLECTION)) || [];
    return avaliacoes.filter(a => a.jogoId === Number(jogoId));
  }

  async getAvaliacao(usuarioId, jogoId) {
    const avaliacoes = (await db.getItem(COLLECTION)) || [];
    return avaliacoes.find(
      a => a.jogoId === Number(jogoId) && a.usuarioId === Number(usuarioId)
    ) || null;
  }

  async remover(usuarioId, jogoId) {
    const avaliacoes = (await db.getItem(COLLECTION)) || [];
    const atualizado = avaliacoes.filter(
      a => !(a.usuarioId === Number(usuarioId) && a.jogoId === Number(jogoId))
    );
    await db.setItem(COLLECTION, atualizado);
    return true;
  }
};