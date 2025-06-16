import Carrinho from '../../model/Carrinho';

describe('Classe de Entidade Carrinho', () => {
  describe('Construtor', () => {
    it('deve criar instância corretamente com parâmetros válidos', () => {
      const carrinho = new Carrinho(1, 2);
      
      expect(carrinho.usuarioId).toBe(1);
      expect(carrinho.jogoId).toBe(2);
      expect(carrinho.dataAdicao).toBeInstanceOf(Date);
    });

    it('deve aceitar quantidade personalizada', () => {
      const carrinho = new Carrinho(1, 2, 3);
    });

    it('deve converter strings numéricas para números', () => {
      const carrinho = new Carrinho('1', '2', '3');
      
      expect(carrinho.usuarioId).toBe(1);
      expect(carrinho.jogoId).toBe(2);
    });

    it('deve lançar erro quando parâmetros são inválidos', () => {
      const casosInvalidos = [
        { params: [0, 1], message: 'usuarioId=0' },
        { params: [1, -1], message: 'jogoId=-1' },
        { params: ['abc', 1], message: 'usuarioId=abc' },
      ];

      casosInvalidos.forEach(({ params, message }) => {
        expect(() => new Carrinho(...params)).toThrow(message);
      });
    });
  });

  describe('Método isValid()', () => {
    const casosValidos = [
      { params: [1, 1], desc: 'todos válidos com quantidade padrão' },
      { params: [999, 999, 5], desc: 'valores altos' },
      { params: ['1', '1', '2'], desc: 'strings numéricas' }
    ];

    const casosInvalidos = [
      { params: [0, 1], desc: 'usuarioId zero' },
      { params: [1.5, 1], desc: 'usuarioId decimal' },
      { params: [1, -1], desc: 'jogoId negativo' },
    ];

    casosValidos.forEach(({ params, desc }) => {
      it(`deve retornar true para caso ${desc}`, () => {
        const carrinho = new Carrinho(...params);
        expect(carrinho.isValid()).toBe(true);
      });
    });

    casosInvalidos.forEach(({ params, desc }) => {
      it(`deve retornar false para caso ${desc}`, () => {
        const carrinho = Object.create(Carrinho.prototype);
        carrinho.usuarioId = Number(params[0]);
        carrinho.jogoId = Number(params[1]);
        
        expect(carrinho.isValid()).toBe(false);
      });
    });
  });


  describe('Métodos de representação', () => {
    it('toString() deve retornar string formatada', () => {
      const carrinho = new Carrinho(1, 2);
      expect(carrinho.toString()).toContain('Carrinho: usuarioId=1, jogoId=2');
    });

    it('toJSON() deve retornar objeto serializável', () => {
      const carrinho = new Carrinho(1, 2);
      const json = carrinho.toJSON();
      
      expect(json).toEqual({
        usuarioId: 1,
        jogoId: 2,
        dataAdicao: expect.any(String)
      });
    });
  });
});