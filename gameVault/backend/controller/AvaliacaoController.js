import db from '../config/database';

const COLLECTION = 'avaliacoes';

export const AvaliacaoController = {
  async avaliar(jogoId, usuarioId, gostou) {
    const avaliacoes = (await db.getItem(COLLECTION)) || [];
    const existente = avaliacoes.find(
      a => a.jogoId === jogoId && a.usuarioId === usuarioId
    );

    if (existente) {
      existente.gostou = gostou;
    } else {
      avaliacoes.push({ jogoId, usuarioId, gostou });
    }

    await db.setItem(COLLECTION, avaliacoes);
    return true;
  },

  async getAvaliacoesByJogo(jogoId) {
    const avaliacoes = (await db.getItem(COLLECTION)) || [];
    return avaliacoes.filter(a => a.jogoId === jogoId);
  },

  async getAvaliacao(usuarioId, jogoId) {
    const avaliacoes = (await db.getItem(COLLECTION)) || [];
    return avaliacoes.find(
      a => a.jogoId === jogoId && a.usuarioId === usuarioId
    ) || null;
  },

  async remover(usuarioId, jogoId) {
    const avaliacoes = (await db.getItem(COLLECTION)) || [];
    const atualizado = avaliacoes.filter(
      a => !(a.usuarioId === usuarioId && a.jogoId === jogoId)
    );
    await db.setItem(COLLECTION, atualizado);
  }
};
