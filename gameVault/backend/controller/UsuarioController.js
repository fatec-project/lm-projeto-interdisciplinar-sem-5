import db from '../config/database';
import Usuario from '../models/Usuario';

const COLLECTION = 'usuarios';

export const UsuarioController = {
  async create(usuario) {
    const usuarios = (await db.getItem(COLLECTION)) || [];
    usuario.id = usuarios.length + 1;
    usuarios.push(usuario);
    await db.setItem(COLLECTION, usuarios);
    return usuario;
  },

  async getAll() {
    return (await db.getItem(COLLECTION)) || [];
  },

  async getById(id) {
    const usuarios = await this.getAll();
    return usuarios.find(u => u.id === id) || null;
  },

  async update(id, dados) {
    const usuarios = await this.getAll();
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) return null;

    usuarios[index] = { ...usuarios[index], ...dados };
    await db.setItem(COLLECTION, usuarios);
    return usuarios[index];
  },

  async delete(id) {
    const usuarios = await this.getAll();
    const novos = usuarios.filter(u => u.id !== id);
    await db.setItem(COLLECTION, novos);
    return true;
  },

  async clear() {
    await db.removeItem(COLLECTION);
  }
};
