import Usuario from '../../model/Usuario';

describe('A classe de entidade Usuario', () => {
  const usuario = new Usuario;

  it('Deve possuir métodos getter e setter de Id', () => {
    usuario.setId('1');
    expect(usuario.getId()).toBe('1');
  });
});