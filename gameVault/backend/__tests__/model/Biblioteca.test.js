import Biblioteca from '../../model/Biblioteca';

describe('A classe de entidade Biblioteca', () => {
  const biblioteca = new Biblioteca;

  it('Deve possuir métodos getter e setter de UsuarioId', () => {
    biblioteca.setUsuarioId(1);
    expect(biblioteca.getUsuarioId()).toBe(1);
  });

  it('Deve possuir métodos getter e setter de JogoId', () => {
    biblioteca.setJogoId(1);
    expect(biblioteca.getJogoId()).toBe(1);
  });
});