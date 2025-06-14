import Usuario from '../../model/Usuario';

describe('A classe de entidade Usuario', () => {
  const usuarioCorreto = new Usuario('nome', 'email@email.com', 'senha1234', 1);
  const usuarioFalho = new Usuario(125, 'email@email.com', 1234);

  it('Deve construir um objeto à partir dos parâmetros do construtor', () => {
    expect(usuarioCorreto.id).toBe(1);
    expect(usuarioCorreto.nome).toBe('nome');
    expect(usuarioCorreto.email).toBe('email@email.com');
    expect(usuarioCorreto.senha).toBe('senha1234');
  });

  it('Deve validar os valores passados para o seu construtor', () => {
    expect(usuarioCorreto.isValid()).toBe(true);
    expect(usuarioFalho.isValid()).toStrictEqual(['Nome inválido: deve ser uma string não vazia', 'Senha inválida: deve ser uma string não vazia']);
  });
});