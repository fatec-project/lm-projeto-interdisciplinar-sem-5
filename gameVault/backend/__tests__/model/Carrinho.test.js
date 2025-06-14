import Carrinho from '../../model/Carrinho';

describe('Classe de Entidade Carrinho', () => {
  describe('Construtor', () => {
    it('deve criar instância corretamente com parâmetros válidos', () => {
      const carrinho = new Carrinho(1, 2);
      
      expect(carrinho.usuarioId).toBe(1);
      expect(carrinho.jogoId).toBe(2);
      expect(carrinho.quantidade).toBe(1);
      expect(carrinho.dataAdicao).toBeInstanceOf(Date);
    });

    it('deve aceitar quantidade personalizada', () => {
      const carrinho = new Carrinho(1, 2, 3);
      expect(carrinho.quantidade).toBe(3);
    });

    it('deve converter strings numéricas para números', () => {
      const carrinho = new Carrinho('1', '2', '3');
      
      expect(carrinho.usuarioId).toBe(1);
      expect(carrinho.jogoId).toBe(2);
      expect(carrinho.quantidade).toBe(3);
    });

    it('deve lançar erro quando parâmetros são inválidos', () => {
      const casosInvalidos = [
        { params: [0, 1], message: 'usuarioId=0' },
        { params: [1, -1], message: 'jogoId=-1' },
        { params: ['abc', 1], message: 'usuarioId=abc' },
        { params: [1, 2, 0], message: 'quantidade=0' },
        { params: [1, 2, -1], message: 'quantidade=-1' }
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
      { params: [1, 2, 0], desc: 'quantidade zero' },
      { params: [1, 2, 'abc'], desc: 'quantidade string não numérica' }
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
        carrinho.quantidade = params[2] !== undefined ? Number(params[2]) : 1;
        
        expect(carrinho.isValid()).toBe(false);
      });
    });
  });

  describe('Método incrementarQuantidade()', () => {
    let carrinho;

    beforeEach(() => {
      carrinho = new Carrinho(1, 2, 1);
    });

    it('deve incrementar a quantidade corretamente', () => {
      expect(carrinho.incrementarQuantidade()).toBe(2);
      expect(carrinho.incrementarQuantidade(3)).toBe(5);
    });

    it('deve lançar erro ao tentar decrementar abaixo de 1', () => {
      expect(() => carrinho.incrementarQuantidade(-1)).toThrow('Quantidade não pode ser menor ou igual a zero');
    });

    it('deve aceitar strings numéricas', () => {
      expect(carrinho.incrementarQuantidade('2')).toBe(3);
    });
  });

  describe('Métodos de representação', () => {
    it('toString() deve retornar string formatada', () => {
      const carrinho = new Carrinho(1, 2, 3);
      expect(carrinho.toString()).toContain('Carrinho: usuarioId=1, jogoId=2, quantidade=3');
    });

    it('toJSON() deve retornar objeto serializável', () => {
      const carrinho = new Carrinho(1, 2, 3);
      const json = carrinho.toJSON();
      
      expect(json).toEqual({
        usuarioId: 1,
        jogoId: 2,
        quantidade: 3,
        dataAdicao: expect.any(String)
      });
    });
  });
});