export default class Avaliacao {

  constructor(jogoId, usuarioId, gostou) {
    this.jogoId = jogoId;
    this.usuarioId = usuarioId;
    this.gostou = gostou;
  }

  isValid() {
    return (
      Number.isInteger(this.jogoId) && this.jogoId > 0 &&
      Number.isInteger(this.usuarioId) && this.usuarioId > 0 &&
      typeof this.gostou === 'boolean'
    );
  }

}