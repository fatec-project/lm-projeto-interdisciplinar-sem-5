import Avaliacao from '../../model/Avaliacao';

describe('Classe de Entidade Avaliacao', () => {
  describe('Construtor', () => {
    it('deve criar instância corretamente com parâmetros válidos', () => {
      const avaliacao = new Avaliacao(1, 2, true);
      
      expect(avaliacao.jogoId).toBe(1);
      expect(avaliacao.usuarioId).toBe(2);
      expect(avaliacao.gostou).toBe(true);
    });

    it('deve converter strings numéricas para números', () => {
      const avaliacao = new Avaliacao('1', '2', false);
      
      expect(avaliacao.jogoId).toBe(1);
      expect(avaliacao.usuarioId).toBe(2);
      expect(avaliacao.gostou).toBe(false);
    });

    it('deve lançar erro quando parâmetros são inválidos', () => {
      const casosInvalidos = [
        { params: [0, 1, true], message: 'jogoId=0' },
        { params: [1, -1, false], message: 'usuarioId=-1' },
        { params: ['abc', 1, true], message: 'jogoId=abc' },
        { params: [1, 2, 'true'], message: 'gostou=true' }
      ];

      casosInvalidos.forEach(({ params, message }) => {
        expect(() => new Avaliacao(...params)).toThrow(message);
      });
    });
  });

  describe('Método isValid()', () => {
    const casosValidos = [
      { params: [1, 1, true], desc: 'todos válidos' },
      { params: [999, 999, false], desc: 'valores altos' },
      { params: ['1', '1', true], desc: 'strings numéricas' }
    ];

    const casosInvalidos = [
      { params: [0, 1, true], desc: 'jogoId zero' },
      { params: [1.5, 1, false], desc: 'jogoId decimal' },
      { params: [1, -1, true], desc: 'usuarioId negativo' },
      { params: [1, 0, false], desc: 'usuarioId zero' },
      { params: [1, 1, 'true'], desc: 'gostou string' },
      { params: [1, 1, 1], desc: 'gostou número' },
      { params: [null, 1, true], desc: 'jogoId null' },
      { params: [undefined, 1, false], desc: 'jogoId undefined' }
    ];

    casosValidos.forEach(({ params, desc }) => {
      it(`deve retornar true para caso ${desc}`, () => {
        const avaliacao = new Avaliacao(...params);
        expect(avaliacao.isValid()).toBe(true);
      });
    });

    casosInvalidos.forEach(({ params, desc }) => {
      it(`deve retornar false para caso ${desc}`, () => {
        // Criamos sem constructor para testar isValid()
        const avaliacao = Object.create(Avaliacao.prototype);
        avaliacao.jogoId = Number(params[0]);
        avaliacao.usuarioId = Number(params[1]);
        avaliacao.gostou = params[2];
        
        expect(avaliacao.isValid()).toBe(false);
      });
    });
  });

  describe('Método toString()', () => {
    it('deve retornar string formatada corretamente', () => {
      const avaliacao = new Avaliacao(1, 2, true);
      expect(avaliacao.toString()).toBe('Avaliacao: jogoId=1, usuarioId=2, gostou=true');
    });

    it('deve refletir o estado atual do objeto', () => {
      const avaliacao = new Avaliacao(3, 4, false);
      expect(avaliacao.toString()).toBe('Avaliacao: jogoId=3, usuarioId=4, gostou=false');
    });
  });
});