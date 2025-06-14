import Avaliacao from '../../model/Avaliacao';

describe('A classe de entidade Avaliacao', () => {
  const avaliacao = new Avaliacao;

  it('Deve possuir métodos getter e setter de JogoId', () => {
    avaliacao.setJogoId(1);
    expect(avaliacao.getJogoId()).toBe(1);
  });

  it('Deve possuir métodos getter e setter de UsuarioId', () => {
    avaliacao.setUsuarioId(1);
    expect(avaliacao.getUsuarioId()).toBe(1);
  });

  it('Deve possuir métodos getter e setter de Gostou', () => {
    avaliacao.setGostou(true);
    expect(avaliacao.getGostou()).toBe(true);
  });
});