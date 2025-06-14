import db from '../config/database.js';
import Usuario from '../model/Usuario.js';

const COLLECTION = 'usuarios';

export const UsuarioController = {
  async criar(nome, email, senha) {
    try {
      const usuario = new Usuario(nome, email, senha);
      const usuarios = (await db.getItem(COLLECTION)) || [];
      
      // Verifica se email já existe
      if (usuarios.some(u => u.email === usuario.email)) {
        throw new Error('Email já cadastrado');
      }

      usuario.id = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
      usuarios.push(usuario);
      await db.setItem(COLLECTION, usuarios);
      return usuario.toSafeObject();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },

  async listar() {
    const usuarios = (await db.getItem(COLLECTION)) || [];
    return usuarios.map(u => new Usuario(u.nome, u.email, u.senha, u.id).toSafeObject());
  },

  async buscarPorId(id) {
    const usuarios = (await db.getItem(COLLECTION)) || [];
    const usuario = usuarios.find(u => u.id === Number(id));
    return usuario ? new Usuario(usuario.nome, usuario.email, usuario.senha, usuario.id).toSafeObject() : null;
  },

  async login(identificador, senha) {
    try {
      const usuarios = (await db.getItem(COLLECTION)) || [];
      const usuario = usuarios.find(u => 
        (u.email === identificador || u.nome === identificador) && 
        u.senha === senha
      );
      
      if (!usuario) {
        throw new Error('Credenciais inválidas');
      }
      
      return new Usuario(usuario.nome, usuario.email, usuario.senha, usuario.id).toSafeObject();
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  async atualizar(id, dados) {
    try {
      const usuarios = (await db.getItem(COLLECTION)) || [];
      const index = usuarios.findIndex(u => u.id === Number(id));
      
      if (index === -1) {
        throw new Error('Usuário não encontrado');
      }

      const usuario = new Usuario(
        dados.nome || usuarios[index].nome,
        dados.email || usuarios[index].email,
        dados.senha || usuarios[index].senha,
        id
      );

      usuarios[index] = usuario;
      await db.setItem(COLLECTION, usuarios);
      return usuario.toSafeObject();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  },

  async remover(id) {
    const usuarios = (await db.getItem(COLLECTION)) || [];
    const novos = usuarios.filter(u => u.id !== Number(id));
    await db.setItem(COLLECTION, novos);
    return true;
  }
};