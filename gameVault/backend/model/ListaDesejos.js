/**
 * Classe que representa um item na lista de desejos
 * @class
 * @throws {Error} Se os parâmetros de construção forem inválidos
 */
export default class ListaDesejos {
  /**
   * Cria uma instância de ListaDesejos
   * @param {number|string} usuarioId - ID do usuário (deve ser inteiro positivo ou string numérica)
   * @param {number|string} jogoId - ID do jogo (deve ser inteiro positivo ou string numérica)
   */
  constructor(usuarioId, jogoId) {
    if (!ListaDesejos.isValid(usuarioId, jogoId)) {
      throw new Error(`Parâmetros inválidos: usuarioId=${usuarioId}, jogoId=${jogoId}`);
    }

    this.usuarioId = Number(usuarioId);
    this.jogoId = Number(jogoId);
    this.dataAdicao = new Date();
  }

  /**
   * Valida os parâmetros de um item da lista de desejos
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
    return ListaDesejos.isValid(this.usuarioId, this.jogoId);
  }

  /**
   * Retorna uma representação em string da lista de desejos
   * @returns {string} Representação formatada
   */
  toString() {
    return `ListaDesejos: usuarioId=${this.usuarioId}, jogoId=${this.jogoId}, dataAdicao=${this.dataAdicao.toISOString()}`;
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