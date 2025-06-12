export default class Usuario {
  id;
  nome;
  email;
  senha;
  
  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getNome() {
    return this.nome;
  }

  setNome(nome) {
    this.nome = nome;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }

  getSenha() {
    return this.senha;
  }

  setSenha(senha) {
    this.senha = senha;
  }

}