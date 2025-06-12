import Carrinho from '../../model/Carrinho';

describe('A classe de entidade Carrinho', () => {
  const carrinho = new Carrinho;

  it('Deve possuir métodos getter e setter de usuarioId', () => {
    carrinho.setUsuarioId(1);
    expect(carrinho.getUsuarioId()).toBe(1);
  });

  it('Deve possuir métodos getter e setter de jogoId', () => {
    carrinho.setJogoId(1);
    expect(carrinho.getJogoId()).toBe(1);
  });
});