/**
 * Classe que representa uma avaliação de jogo por usuário
 * @class
 * @throws {Error} Se os parâmetros de construção forem inválidos
 */
export default class Avaliacao {
  /**
   * Cria uma instância de Avaliacao
   * @param {number|string} jogoId - ID do jogo (deve ser inteiro positivo ou string numérica)
   * @param {number|string} usuarioId - ID do usuário (deve ser inteiro positivo ou string numérica)
   * @param {boolean} gostou - Indica se o usuário gostou do jogo (true/false)
   */
  constructor(jogoId, usuarioId, gostou) {
    if (!Avaliacao.isValid(jogoId, usuarioId, gostou)) {
      throw new Error(`Parâmetros inválidos: jogoId=${jogoId}, usuarioId=${usuarioId}, gostou=${gostou}`);
    }

    this.jogoId = Number(jogoId);
    this.usuarioId = Number(usuarioId);
    this.gostou = gostou;
  }

  /**
   * Valida os parâmetros de uma avaliação
   * @static
   * @returns {boolean} True se todos os parâmetros são válidos
   */
  static isValid(jogoId, usuarioId, gostou) {
    const isJogoIdValid = Number.isInteger(Number(jogoId)) && Number(jogoId) > 0;
    const isUsuarioIdValid = Number.isInteger(Number(usuarioId)) && Number(usuarioId) > 0;
    const isGostouValid = typeof gostou === 'boolean';

    return isJogoIdValid && isUsuarioIdValid && isGostouValid;
  }

  /**
   * Valida se a instância atual possui todos os campos válidos
   * @returns {boolean} Retorna true se todos os campos são válidos
   */
  isValid() {
    return Avaliacao.isValid(this.jogoId, this.usuarioId, this.gostou);
  }

  /**
   * Retorna uma representação em string da avaliação
   * @returns {string} Representação formatada
   */
  toString() {
    return `Avaliacao: jogoId=${this.jogoId}, usuarioId=${this.usuarioId}, gostou=${this.gostou}`;
  }
}