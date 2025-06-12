import Jogo from '../../model/Jogo';

describe('A classe de entidade Jogo', () => {
  const jogo = new Jogo;

  it('Deve possuir métodos getter e setter de Id', () => {
    jogo.setId(1);
    expect(jogo.getId()).toBe(1);
  });
});