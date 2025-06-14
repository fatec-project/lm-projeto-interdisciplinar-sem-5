export default class Usuario {
  constructor(nome, email, senha, id = null) {
    this.id = id !== null ? Number(id) : null;
    this.nome = nome;
    this.email = email;
    this.senha = senha;

    const validacao = this.isValid();
    if (validacao !== true) {
      throw new Error(`Parâmetros inválidos: ${validacao.join(', ')}`);
    }
  }

  static isValid(nome, email, senha, id = null) {
    const erros = [];

    if (id !== null && (!Number.isInteger(Number(id)) || Number(id) <= 0)) {
      erros.push('ID inválido');
    }

    if (typeof nome !== 'string' || nome.trim().length < 3) {
      erros.push('Nome inválido');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (typeof email !== 'string' || !emailRegex.test(email)) {
      erros.push('Email inválido');
    }

    if (typeof senha !== 'string' || senha.length < 8) {
      erros.push('Senha inválida');
    }

    return erros.length === 0 ? true : erros;
  }

  isValid() {
    return Usuario.isValid(this.nome, this.email, this.senha, this.id);
  }

  atualizar(dados = {}) {
    const camposPermitidos = ['nome', 'email', 'senha'];
    const erros = [];
    const estadoOriginal = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    Object.keys(dados).forEach(key => {
      if (camposPermitidos.includes(key)) {
        this[key] = dados[key];
      } else {
        erros.push(`Campo "${key}" não pode ser atualizado`);
      }
    });

    const validacao = this.isValid();
    if (validacao !== true) {
      this.nome = estadoOriginal.nome;
      this.email = estadoOriginal.email;
      this.senha = estadoOriginal.senha;
      return validacao;
    }

    return erros;
  }

  toSafeObject() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email
    };
  }

  toString() {
    return `Usuario: id=${this.id}, nome=${this.nome}, email=${this.email}`;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email
    };
  }
}
