import Amigo from '../../model/Amigo.js';

describe('A classe de entidade Amigo', () => {
  let amigo;
  
  beforeEach(() => {
    amigo = new Amigo();
  });

  it('Deve possuir métodos getter e setter de usuario1Id', () => {
    amigo.setUsuario1Id(1);
    expect(amigo.getUsuario1Id()).toBe(1);
  });

  it('Deve possuir métodos getter e setter de usuario2Id', () => {
    amigo.setUsuario2Id(2);
    expect(amigo.getUsuario2Id()).toBe(2);
  });
});