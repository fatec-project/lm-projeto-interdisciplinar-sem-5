/**
 * Classe que representa a relação entre um usuário e um jogo na biblioteca
 * @class
 * @throws {Error} Se os parâmetros de construção forem inválidos
 */
export default class Biblioteca {
  /**
   * Cria uma instância de Biblioteca
   * @param {number|string} usuarioId - ID do usuário (deve ser inteiro positivo ou string numérica)
   * @param {number|string} jogoId - ID do jogo (deve ser inteiro positivo ou string numérica)
   */
  constructor(usuarioId, jogoId) {
    if (!Biblioteca.isValid(usuarioId, jogoId)) {
      throw new Error(`Parâmetros inválidos: usuarioId=${usuarioId}, jogoId=${jogoId}`);
    }

    this.usuarioId = Number(usuarioId);
    this.jogoId = Number(jogoId);
    this.dataAdicao = new Date(); // Adicionado campo de data como exemplo de melhoria
  }

  /**
   * Valida os parâmetros de uma entrada na biblioteca
   * @static
   * @returns {boolean} True se todos os parâmetros são válidos
   */
  static isValid(usuarioId, jogoId) {
    const isUsuarioIdValid = Number.isInteger(Number(usuarioId)) && Number(usuarioId) > 0;
    const isJogoIdValid = Number.isInteger(Number(jogoId)) && Number(jogoId) > 0;

    return isUsuarioIdValid && isJogoIdValid;
  }

  /**
   * Valida se a instância atual possui todos os campos válidos
   * @returns {boolean} Retorna true se todos os campos são válidos
   */
  isValid() {
    return Biblioteca.isValid(this.usuarioId, this.jogoId);
  }

  /**
   * Retorna uma representação em string da biblioteca
   * @returns {string} Representação formatada
   */
  toString() {
    return `Biblioteca: usuarioId=${this.usuarioId}, jogoId=${this.jogoId}, dataAdicao=${this.dataAdicao.toISOString()}`;
  }

  /**
   * Retorna um objeto simples para serialização
   * @returns {object} Objeto simplificado
   */
  toJSON() {
    return {
      usuarioId: this.usuarioId,
      jogoId: this.jogoId,
      dataAdicao: this.dataAdicao.toISOString()
    };
  }
}