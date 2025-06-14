/**
 * Classe que representa um item no carrinho de compras
 * @class
 * @throws {Error} Se os parâmetros de construção forem inválidos
 */
export default class Carrinho {
  /**
   * Cria uma instância de Carrinho
   * @param {number|string} usuarioId - ID do usuário (deve ser inteiro positivo ou string numérica)
   * @param {number|string} jogoId - ID do jogo (deve ser inteiro positivo ou string numérica)
   * @param {number} [quantidade=1] - Quantidade do item (opcional, padrão 1)
   */
  constructor(usuarioId, jogoId, quantidade = 1) {
    if (!Carrinho.isValid(usuarioId, jogoId, quantidade)) {
      throw new Error(`Parâmetros inválidos: usuarioId=${usuarioId}, jogoId=${jogoId}, quantidade=${quantidade}`);
    }

    this.usuarioId = Number(usuarioId);
    this.jogoId = Number(jogoId);
    this.quantidade = Number(quantidade);
    this.dataAdicao = new Date();
  }

  /**
   * Valida os parâmetros de um item do carrinho
   * @static
   * @returns {boolean} True se todos os parâmetros são válidos
   */
  static isValid(usuarioId, jogoId, quantidade = 1) {
    const isUsuarioIdValid = Number.isInteger(Number(usuarioId)) && Number(usuarioId) > 0;
    const isJogoIdValid = Number.isInteger(Number(jogoId)) && Number(jogoId) > 0;
    const isQuantidadeValid = Number.isInteger(Number(quantidade)) && Number(quantidade) > 0;

    return isUsuarioIdValid && isJogoIdValid && isQuantidadeValid;
  }

  /**
   * Valida se a instância atual possui todos os campos válidos
   * @returns {boolean} Retorna true se todos os campos são válidos
   */
  isValid() {
    return Carrinho.isValid(this.usuarioId, this.jogoId, this.quantidade);
  }

  /**
   * Aumenta a quantidade do item no carrinho
   * @param {number} [valor=1] - Valor a ser incrementado (padrão 1)
   * @returns {number} Nova quantidade
   */
  incrementarQuantidade(valor = 1) {
    const novaQuantidade = this.quantidade + Number(valor);
    if (novaQuantidade <= 0) {
      throw new Error('Quantidade não pode ser menor ou igual a zero');
    }
    this.quantidade = novaQuantidade;
    return this.quantidade;
  }

  /**
   * Retorna uma representação em string do carrinho
   * @returns {string} Representação formatada
   */
  toString() {
    return `Carrinho: usuarioId=${this.usuarioId}, jogoId=${this.jogoId}, quantidade=${this.quantidade}, dataAdicao=${this.dataAdicao.toISOString()}`;
  }

  /**
   * Retorna um objeto simples para serialização
   * @returns {object} Objeto simplificado
   */
  toJSON() {
    return {
      usuarioId: this.usuarioId,
      jogoId: this.jogoId,
      quantidade: this.quantidade,
      dataAdicao: this.dataAdicao.toISOString()
    };
  }
}