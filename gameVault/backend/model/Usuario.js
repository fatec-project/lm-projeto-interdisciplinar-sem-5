export default class Usuario {

  constructor(nome, email, senha, id = null) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  isValid() {
    const erros = [];

    if (typeof this.nome !== 'string' || this.nome.length === 0) {
      erros.push('Nome inválido: deve ser uma string não vazia');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof this.email !== 'string' || !emailRegex.test(this.email)) {
      erros.push('Email inválido: formato não aceito');
    }

    if (typeof this.senha !== 'string' || this.length === 0) {
      erros.push('Senha inválida: deve ser uma string não vazia');
    }
  
    return erros.length === 0 ? true : erros;
  }

}