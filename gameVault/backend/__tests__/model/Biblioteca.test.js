import Biblioteca from '../../model/Biblioteca';

describe('Classe de Entidade Biblioteca', () => {
  describe('Construtor', () => {
    it('deve criar instância corretamente com parâmetros válidos', () => {
      const biblioteca = new Biblioteca(1, 2);
      
      expect(biblioteca.usuarioId).toBe(1);
      expect(biblioteca.jogoId).toBe(2);
      expect(biblioteca.dataAdicao).toBeInstanceOf(Date);
    });

    it('deve converter strings numéricas para números', () => {
      const biblioteca = new Biblioteca('1', '2');
      
      expect(biblioteca.usuarioId).toBe(1);
      expect(biblioteca.jogoId).toBe(2);
    });

    it('deve lançar erro quando parâmetros são inválidos', () => {
      const casosInvalidos = [
        { params: [0, 1], message: 'usuarioId=0' },
        { params: [1, -1], message: 'jogoId=-1' },
        { params: ['abc', 1], message: 'usuarioId=abc' },
        { params: [null, 1], message: 'usuarioId=null' }
      ];

      casosInvalidos.forEach(({ params, message }) => {
        expect(() => new Biblioteca(...params)).toThrow(message);
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
      { params: [1, -1], desc: 'jogoId negativo' },
      { params: [1, 0], desc: 'jogoId zero' },
      { params: ['abc', 1], desc: 'usuarioId string não numérica' },
      { params: [null, 1], desc: 'usuarioId null' },
      { params: [undefined, 1], desc: 'usuarioId undefined' }
    ];

    casosValidos.forEach(({ params, desc }) => {
      it(`deve retornar true para caso ${desc}`, () => {
        const biblioteca = new Biblioteca(...params);
        expect(biblioteca.isValid()).toBe(true);
      });
    });

    casosInvalidos.forEach(({ params, desc }) => {
      it(`deve retornar false para caso ${desc}`, () => {
        // Criamos sem constructor para testar isValid()
        const biblioteca = Object.create(Biblioteca.prototype);
        biblioteca.usuarioId = Number(params[0]);
        biblioteca.jogoId = Number(params[1]);
        
        expect(biblioteca.isValid()).toBe(false);
      });
    });
  });

  describe('Métodos de representação', () => {
    let biblioteca;

    beforeEach(() => {
      biblioteca = new Biblioteca(1, 2);
    });

    it('toString() deve retornar string formatada corretamente', () => {
      expect(biblioteca.toString()).toContain('Biblioteca: usuarioId=1, jogoId=2');
      expect(biblioteca.toString()).toContain('dataAdicao=');
    });

    it('toJSON() deve retornar objeto serializável', () => {
      const json = biblioteca.toJSON();
      
      expect(json).toEqual({
        usuarioId: 1,
        jogoId: 2,
        dataAdicao: expect.any(String)
      });
      expect(new Date(json.dataAdicao)).toBeInstanceOf(Date);
    });
  });
});