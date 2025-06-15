import db from '../config/database.js';
import Usuario from '../model/Usuario.js';

const COLLECTION = 'usuarios';

export default class UsuarioController {
  constructor() {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    const usuarios = await db.getItem(COLLECTION);
    if (!usuarios) {
      await db.setItem(COLLECTION, []);
    }
  }

  async criar(nome, email, senha) {
    try {
      const usuario = new Usuario(nome, email, senha);
      const usuarios = (await db.getItem(COLLECTION)) || [];
      
      if (usuarios.some(u => u.email.toLowerCase() === usuario.email.toLowerCase())) {
        throw new Error('Email já cadastrado');
      }

      usuario.id = this.generateId(usuarios);
      usuarios.push(usuario);
      await db.setItem(COLLECTION, usuarios);
      return usuario.toSafeObject();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  generateId(usuarios) {
    return usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
  }

  async listar() {
    const usuarios = (await db.getItem(COLLECTION)) || [];
    return usuarios.map(u => new Usuario(u.nome, u.email, u.senha, u.id).toSafeObject());
  }

  async buscarPorId(id) {
    const usuarios = (await db.getItem(COLLECTION)) || [];
    const usuario = usuarios.find(u => u.id === Number(id));
    if (!usuario) throw new Error('Usuário não encontrado');
    return new Usuario(usuario.nome, usuario.email, usuario.senha, usuario.id).toSafeObject();
  }

  async login(identificador, senha) {
    try {
      const usuarios = (await db.getItem(COLLECTION)) || [];
      const usuario = usuarios.find(u => 
        (u.email.toLowerCase() === identificador.toLowerCase() || 
         u.nome.toLowerCase() === identificador.toLowerCase()) && 
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
  }

  async atualizar(id, dados) {
    try {
      const usuarios = (await db.getItem(COLLECTION)) || [];
      const index = usuarios.findIndex(u => u.id === Number(id));
      
      if (index === -1) {
        throw new Error('Usuário não encontrado');
      }

      if (dados.email && usuarios.some((u, i) => 
        i !== index && u.email.toLowerCase() === dados.email.toLowerCase()
      )) {
        throw new Error('Email já está em uso por outro usuário');
      }

      const usuarioAtual = usuarios[index];
      const usuario = new Usuario(
        dados.nome || usuarioAtual.nome,
        dados.email || usuarioAtual.email,
        dados.senha || usuarioAtual.senha,
        id
      );

      usuarios[index] = usuario;
      await db.setItem(COLLECTION, usuarios);
      return usuario.toSafeObject();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  async remover(id) {
    try {
      const usuarios = (await db.getItem(COLLECTION)) || [];
      const novos = usuarios.filter(u => u.id !== Number(id));
      
      if (usuarios.length === novos.length) {
        throw new Error('Usuário não encontrado');
      }
      
      await db.setItem(COLLECTION, novos);
      return true;
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      throw error;
    }
  }
}