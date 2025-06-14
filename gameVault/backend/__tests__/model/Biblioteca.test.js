import Biblioteca from '../../model/Biblioteca';

describe('A classe de entidade Biblioteca', () => {
  const bibliotecaCorreto = new Biblioteca(1, 1);
  const bibliotecaInválido = new Biblioteca('1', -1);

  it('Deve construir um objeto à partir dos parâmetros do construtor', () => {
    expect(bibliotecaCorreto.usuarioId).toBe(1);
    expect(bibliotecaCorreto.jogoId).toBe(1);
  });

  it('Deve validar os valores passados para o seu construtor', () => {
    expect(bibliotecaCorreto.isValid()).toBe(true);
    expect(bibliotecaInválido.isValid()).toBe(false);
  });
});