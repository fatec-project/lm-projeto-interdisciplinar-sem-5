export default class Biblioteca {
  usuarioId;
  jogoId;
  foiPresente;

  getUsuarioId() {
    return this.usuarioId;
  }

  setUsuarioId(usuarioId) {
    this.usuarioId = usuarioId;
  }

  getJogoId() {
    return this.jogoId;
  }

  setJogoId(jogoId) {
    this.jogoId = jogoId;
  }

  getFoiPresente() {
    return this.foiPresente;
  }

  setFoiPresente(foiPresente) {
    this.foiPresente = foiPresente;
  }
}