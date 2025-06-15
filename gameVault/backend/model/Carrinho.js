// Carrinho.js
export default class Carrinho {
  constructor(usuarioId, jogoId) {
    if (!Carrinho.isValid(usuarioId, jogoId)) {
      throw new Error(`Parâmetros inválidos: usuarioId=${usuarioId}, jogoId=${jogoId}`);
    }

    this.usuarioId = Number(usuarioId);
    this.jogoId = Number(jogoId);
    this.dataAdicao = new Date();
  }

  static isValid(usuarioId, jogoId) {
    const isUsuarioIdValid = Number.isInteger(Number(usuarioId)) && Number(usuarioId) > 0;
    const isJogoIdValid = Number.isInteger(Number(jogoId)) && Number(jogoId) > 0;

    return isUsuarioIdValid && isJogoIdValid;
  }

  isValid() {
    return Carrinho.isValid(this.usuarioId, this.jogoId);
  }

  toString() {
    return `Carrinho: usuarioId=${this.usuarioId}, jogoId=${this.jogoId}, dataAdicao=${this.dataAdicao.toISOString()}`;
  }

  toJSON() {
    return {
      usuarioId: this.usuarioId,
      jogoId: this.jogoId,
      dataAdicao: this.dataAdicao.toISOString()
    };
  }
}