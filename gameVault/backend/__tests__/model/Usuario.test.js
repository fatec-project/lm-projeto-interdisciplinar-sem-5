import Usuario from '../../model/Usuario';

describe('Classe de Entidade Usuario', () => {
  describe('Construtor', () => {
    it('deve criar instância corretamente com parâmetros válidos', () => {
      const usuario = new Usuario('João Silva', 'joao@email.com', 'senhaSegura123', 1);

      expect(usuario.id).toBe(1);
      expect(usuario.nome).toBe('João Silva');
      expect(usuario.email).toBe('joao@email.com');
      expect(usuario.senha).toBe('senhaSegura123');
    });

    it('deve lançar erro ao criar com parâmetros inválidos', () => {
      expect(() => {
        new Usuario('Jo', 'emailinvalido', '123');
      }).toThrow();
    });
  });

  describe('Método isValid()', () => {
    const casosInvalidos = [
      {
        params: [123, 'email@valido.com', 'senha12345'],
        desc: 'nome sendo número',
        errosEsperados: ['Nome inválido']
      },
      {
        params: ['Li', 'email@valido.com', 'senha12345'],
        desc: 'nome muito curto',
        errosEsperados: ['Nome inválido']
      },
      {
        params: ['Nome Válido', 'email-invalido', 'senha12345'],
        desc: 'email inválido',
        errosEsperados: ['Email inválido']
      },
      {
        params: ['Nome Válido', 'email@valido.com', 12345678],
        desc: 'senha sendo número',
        errosEsperados: ['Senha inválida']
      }
    ];

    casosInvalidos.forEach(({ params, desc, errosEsperados }) => {
      it(`deve retornar erros para caso ${desc}`, () => {
        const resultado = Usuario.isValid(...params);
        expect(resultado).not.toBe(true);
        errosEsperados.forEach(erro => {
          expect(resultado).toContain(erro);
        });
      });
    });

    it('deve retornar true para dados válidos', () => {
      const resultado = Usuario.isValid('Maria Silva', 'maria@email.com', 'senhaSegura123');
      expect(resultado).toBe(true);
    });
  });

  describe('Método atualizar()', () => {
    let usuario;

    beforeEach(() => {
      usuario = new Usuario('Antônio Carlos', 'antonio@email.com', 'senhaAntiga123', 1);
    });

    it('deve atualizar dados válidos corretamente', () => {
      const resultado = usuario.atualizar({
        nome: 'Antônio Carlos Silva',
        email: 'antonio.silva@email.com'
      });

      expect(resultado).toEqual([]);
      expect(usuario.nome).toBe('Antônio Carlos Silva');
      expect(usuario.email).toBe('antonio.silva@email.com');
    });

    it('deve reverter alterações se deixar o objeto inválido', () => {
      const resultado = usuario.atualizar({
        nome: 'An', // Nome muito curto
        email: 'antonio@email.com'
      });

      expect(resultado).toContain('Nome inválido');
      expect(usuario.nome).toBe('Antônio Carlos');
    });

    it('deve ignorar campos não permitidos', () => {
      const resultado = usuario.atualizar({
        nome: 'Antonio Atualizado',
        idade: 30 // Campo inválido
      });

      expect(resultado).toContain('Campo "idade" não pode ser atualizado');
      expect(usuario.nome).toBe('Antonio Atualizado');
      expect(usuario.email).toBe('antonio@email.com');
    });
  });
});
