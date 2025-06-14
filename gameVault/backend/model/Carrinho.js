export default class Carrinho {

  constructor(usuarioId, jogoId) {
    this.usuarioId = usuarioId;
    this.jogoId = jogoId;
  }

  isValid() {
    return (
        Number.isInteger(this.usuarioId) && this.usuarioId > 0 &&
        Number.isInteger(this.jogoId) && this.jogoId > 0
    );
  }

}