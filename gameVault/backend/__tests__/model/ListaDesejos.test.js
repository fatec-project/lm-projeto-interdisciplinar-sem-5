import ListaDesejos from '../../model/ListaDesejos';

describe('Classe de Entidade ListaDesejos', () => {
  describe('Construtor', () => {
    it('deve criar instância corretamente com parâmetros válidos', () => {
      const item = new ListaDesejos(1, 2);
      
      expect(item.usuarioId).toBe(1);
      expect(item.jogoId).toBe(2);
      expect(item.dataAdicao).toBeInstanceOf(Date);
    });

    it('deve converter strings numéricas para números', () => {
      const item = new ListaDesejos('1', '2');
      
      expect(item.usuarioId).toBe(1);
      expect(item.jogoId).toBe(2);
    });

    it('deve lançar erro quando parâmetros são inválidos', () => {
      const casosInvalidos = [
        { params: [0, 1], message: 'usuarioId=0' },
        { params: [1, -1], message: 'jogoId=-1' },
        { params: ['abc', 1], message: 'usuarioId=abc' }
      ];

      casosInvalidos.forEach(({ params, message }) => {
        expect(() => new ListaDesejos(...params)).toThrow(message);
      });
    });
  });

  describe('Método isValid()', () => {
    const casosValidos = [
      { params: [1, 1], desc: 'todos válidos' },
      { params: [999, 999], desc: 'valores altos' },
      { params: ['1', '1'], desc: 'strings numéricas' }
    ];

    const casosInvalidos = [
      { params: [0, 1], desc: 'usuarioId zero' },
      { params: [1.5, 1], desc: 'usuarioId decimal' },
      { params: [1, -1], desc: 'jogoId negativo' }
    ];

    casosValidos.forEach(({ params, desc }) => {
      it(`deve retornar true para caso ${desc}`, () => {
        const item = new ListaDesejos(...params);
        expect(item.isValid()).toBe(true);
      });
    });

    casosInvalidos.forEach(({ params, desc }) => {
      it(`deve retornar false para caso ${desc}`, () => {
        const item = Object.create(ListaDesejos.prototype);
        item.usuarioId = Number(params[0]);
        item.jogoId = Number(params[1]);
        
        expect(item.isValid()).toBe(false);
      });
    });
  });

  describe('Métodos de representação', () => {
    it('toString() deve retornar string formatada', () => {
      const item = new ListaDesejos(1, 2);
      expect(item.toString()).toContain('ListaDesejos: usuarioId=1, jogoId=2');
    });

    it('toJSON() deve retornar objeto serializável', () => {
      const item = new ListaDesejos(1, 2);
      const json = item.toJSON();
      
      expect(json).toEqual({
        usuarioId: 1,
        jogoId: 2,
        dataAdicao: expect.any(String)
      });
    });
  });
});