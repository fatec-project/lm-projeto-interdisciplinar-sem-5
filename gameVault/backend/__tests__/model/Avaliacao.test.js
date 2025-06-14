import Avaliacao from '../../model/Avaliacao';

describe('A classe de entidade Avaliacao', () => {
  const avaliacaoCorreto = new Avaliacao(1, 1, true);
  const avaliacaoInvalido = new Avaliacao('1', -1, 'false');

  it('Deve construir um objeto à partir dos parâmetros do construtor', () => {
    expect(avaliacaoCorreto.usuarioId).toBe(1);
    expect(avaliacaoCorreto.jogoId).toBe(1);
    expect(avaliacaoCorreto.gostou).toBe(true);
  });

  it('Deve validar os valores passados para o seu construtor', () => {
    expect(avaliacaoCorreto.isValid()).toBe(true);
    expect(avaliacaoInvalido.isValid()).toBe(false);
  });
});