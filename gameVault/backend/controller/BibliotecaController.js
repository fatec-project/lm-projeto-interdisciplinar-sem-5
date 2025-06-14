import db from '../config/database';

const COLLECTION = 'biblioteca';

export const BibliotecaController = {
  async adicionar(usuarioId, jogoId) {
    const biblioteca = (await db.getItem(COLLECTION)) || [];
    const existente = biblioteca.find(
      i => i.usuarioId === usuarioId && i.jogoId === jogoId
    );

    if (!existente) {
      biblioteca.push({ usuarioId, jogoId, dataAdicao: new Date().toISOString() });
      await db.setItem(COLLECTION, biblioteca);
    }

    return true;
  },

  async getBibliotecaByUsuario(usuarioId) {
    const biblioteca = (await db.getItem(COLLECTION)) || [];
    return biblioteca.filter(i => i.usuarioId === usuarioId);
  },

  async remover(usuarioId, jogoId) {
    const biblioteca = (await db.getItem(COLLECTION)) || [];
    const atualizado = biblioteca.filter(
      i => !(i.usuarioId === usuarioId && i.jogoId === jogoId)
    );
    await db.setItem(COLLECTION, atualizado);
  }
};
