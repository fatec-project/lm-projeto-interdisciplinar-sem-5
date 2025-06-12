const Usuario = require('../../model/Usuario');

describe('A classe de entidade Usuario', () => {
  const usuario = new Usuario;

  it('Deve possuir métodos getter e setter de Id', () => {
    usuario.setId(1);
    expect(usuario.getId()).toBe(1);
  });

  it('Deve possuir métodos getter e setter de Nome', () => {
    usuario.setNome('Verso');
    expect(usuario.getNome()).toBe('Verso');
  });

  it('Deve possuir métodos getter e setter de Email', () => {
    usuario.setEmail('maelle@email.com');
    expect(usuario.getEmail()).toBe('maelle@email.com');
  });

  it('Deve possuir métodos getter e setter de Senha', () => {
    usuario.setSenha('abcd1234!');
    expect(usuario.getSenha()).toBe('abcd1234!');
  });
});