import Biblioteca from '../../model/Biblioteca';

describe('A classe de entidade Biblioteca', () => {
  const biblioteca = new Biblioteca;

  it('Deve possuir métodos getter e setter de usuarioId', () => {
    biblioteca.setUsuarioId(1);
    expect(biblioteca.getUsuarioId()).toBe(1);
  });

  it('Deve possuir métodos getter e setter de jogoId', () => {
    biblioteca.setJogoId(1);
    expect(biblioteca.getJogoId()).toBe(1);
  });

  it('Deve possuir métodos getter e setter de foiPresente', () => {
    biblioteca.setFoiPresente(false);
    expect(biblioteca.getFoiPresente()).toBe(false);
  });
});