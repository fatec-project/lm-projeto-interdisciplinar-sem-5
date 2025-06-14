import Carrinho from '../../model/Carrinho';

describe('A classe de entidade Carrinho', () => {
  const carrinhoCorreto = new Carrinho(1, 1);
  const carrinhoInválido = new Carrinho('1', -1);

  it('Deve construir um objeto à partir dos parâmetros do construtor', () => {
    expect(carrinhoCorreto.usuarioId).toBe(1);
    expect(carrinhoCorreto.jogoId).toBe(1);
  });

  it('Deve validar os valores passados para o seu construtor', () => {
    expect(carrinhoCorreto.isValid()).toBe(true);
    expect(carrinhoInválido.isValid()).toBe(false);
  });
});