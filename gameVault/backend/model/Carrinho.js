export default class Carrinho {
  usuarioId;
  jogoId;

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
}