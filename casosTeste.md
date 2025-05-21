Aqui está um conjunto completo de **casos de teste** baseado nas entidades, regras de negócio e diagramas apresentados, organizados por funcionalidade:

---

### **1. Testes de Usuário e Autenticação**
| ID  | Caso de Teste | Pré-Condições | Passos | Resultado Esperado | Regras Validadas |
|-----|--------------|---------------|--------|--------------------|------------------|
| CT01 | Cadastro com email válido | - | 1. Preencher formulário com email novo<br>2. Clicar em "Cadastrar" | Conta criada + email de confirmação | RN01 |
| CT02 | Cadastro com email duplicado | Usuário "teste@email.com" já existe | 1. Tentar cadastrar mesmo email | Erro: "Email já cadastrado" | RN01 |
| CT03 | Login como admin | Usuário com tipo=admin | 1. Fazer login com credenciais admin | Acesso ao painel administrativo | RN02 |

---

### **2. Testes de Jogos e Estoque**
| ID  | Caso de Teste | Pré-Condições | Passos | Resultado Esperado | Regras Validadas |
|-----|--------------|---------------|--------|--------------------|------------------|
| CT04 | Cadastrar jogo sem plataforma | - | 1. Tentar cadastrar jogo sem selecionar plataforma | Erro: "Selecione ao menos 1 plataforma" | RN04 |
| CT05 | Adicionar key duplicada | Key "ABCD-1234" já existe | 1. Tentar cadastrar mesma key | Erro: "Key já registrada" | RN06 |
| CT06 | Atualizar preço para negativo | Jogo válido cadastrado | 1. Tentar setar preço=-10 | Erro: "Preço deve ser positivo" | RN07 |

---

### **3. Testes de Carrinho e Pedidos**
| ID  | Caso de Teste | Pré-Condições | Passos | Resultado Esperado | Regras Validadas |
|-----|--------------|---------------|--------|--------------------|------------------|
| CT07 | Carrinho expirado | Carrinho criado há 73h | 1. Tentar finalizar compra | Erro: "Carrinho expirado" | RN08 |
| CT08 | Aplicar cupom em compra pequena | Valor=R$40, cupom="DESC10" | 1. Aplicar cupom | Erro: "Cupom válido apenas acima de R$50" | RN10 |
| CT09 | Pagamento após 31min | Pedido criado há 31min | 1. Tentar pagar | Erro: "Pedido cancelado por tempo" | RN12 |

---

### **4. Testes de Avaliações e Comentários**
| ID  | Caso de Teste | Pré-Condições | Passos | Resultado Esperado | Regras Validadas |
|-----|--------------|---------------|--------|--------------------|------------------|
| CT10 | Avaliar jogo não comprado | Usuário não possui o jogo | 1. Tentar avaliar | Erro: "Adquira o jogo para avaliar" | RN13 |
| CT11 | Editar avaliação após 8 dias | Avaliação publicada há 8 dias | 1. Tentar editar | Erro: "Período de edição expirado" | RN14 |
| CT12 | Comentário com palavra banida | - | 1. Postar "Isso é uma merda!" | Comentário fica pendente de moderação | RN16 |

---

### **5. Testes de Moderação**
| ID  | Caso de Teste | Pré-Condições | Passos | Resultado Esperado | Regras Validadas |
|-----|--------------|---------------|--------|--------------------|------------------|
| CT13 | Remoção de comentário | Comentário reportado 5x | 1. Admin clica em "Remover" | Comentário oculto + notificação ao autor | RN18, RN20 |
| CT14 | Banimento automático | Usuário com 3 reports confirmados | 1. Novo report é confirmado | Conta desativada automaticamente | RN03 |

---

### **6. Testes de Fluxos Complexos**
| ID  | Caso de Teste | Pré-Condições | Passos | Resultado Esperado |
|-----|--------------|---------------|--------|--------------------|
| CT15 | Compra → Avaliação → Moderação | 1. Jogo cadastrado<br>2. Usuário cadastrado | 1. Comprar jogo<br>2. Avaliar (nota=9)<br>3. Reportar avaliação (fake)<br>4. Admin analisar | Avaliação oculta após moderação |
| CT16 | Fraude detectada | 2 pedidos cancelados por fraude | 1. Tentar 3ª compra suspeita | CPF bloqueado (RN23) |

---

### **7. Testes Técnicos**
| ID  | Caso de Teste | Pré-Condições | Passos | Resultado Esperado |
|-----|--------------|---------------|--------|--------------------|
| CT17 | Formato de key inválido | - | 1. Cadastrar key "1234-ABCD" (formato errado) | Erro: "Formato de key inválido" |
| CT18 | Backup noturno | Hora=2AM | 1. Sistema executa backup automático | Arquivo .backup gerado com timestamp |

---

### **Template para Casos de Teste Detalhados**
**Caso CT10 - Avaliação sem posse do jogo**  
```gherkin
Funcionalidade: Avaliação de jogos
  Cenário: Tentar avaliar jogo não adquirido
    Dado que o usuário "user1" não possui "Cyberpunk 2077"
    Quando ele tenta avaliar o jogo com nota 7
    Então o sistema deve retornar erro "Adquira o jogo para avaliar"
    E a avaliação NÃO deve ser registrada
```

**Caso CT15 - Fluxo completo compra-avaliação**  
```gherkin
Funcionalidade: Ciclo pós-compra
  Cenário: Usuário avalia jogo comprado
    Dado que "user2" comprou "The Witcher 3"
    E recebeu a key por email
    Quando ele avalia com nota 9.5 e comentário "Ótimo jogo"
    Então a média do jogo deve atualizar
    E o selo "Comprador Verificado" deve aparecer
```

---

### **Cobertura de Testes**
1. **Testes Unitários**: Validação de regras individuais (ex.: RN07 - preços negativos)
2. **Testes de Integração**: Fluxos entre componentes (ex.: carrinho → pedido → pagamento)
3. **Testes E2E**: Jornada completa do usuário (CT15)

Ferramentas sugeridas:
- **Jest/Mocha**: Para testes unitários
- **Cypress**: Para testes E2E
- **Postman**: Para testes de API
