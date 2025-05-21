Aqui está o conjunto completo de **regras de negócio** para o sistema de e-commerce de keys de jogos, baseado nos diagramas anteriores:

---

### **1. Regras de Usuário e Autenticação**
| ID  | Regra | Descrição |
|-----|-------|-----------|
| RN01 | Cadastro de usuário | O email deve ser único e validado via confirmação |
| RN02 | Hierarquia de usuários | Administradores devem ter um token de acesso especial |
| RN03 | Banimento | Usuários com 3+ reports confirmados são automaticamente banidos |

---

### **2. Regras de Jogos e Estoque**
| ID  | Regra | Descrição |
|-----|-------|-----------|
| RN04 | Cadastro de jogos | Deve incluir pelo menos 1 plataforma e 1 gênero |
| RN05 | Disponibilidade | Só mostra jogos com keys disponíveis no estoque |
| RN06 | Validação de keys | Keys duplicadas são automaticamente rejeitadas no cadastro |
| RN07 | Preços negativos | O sistema deve bloquear atualizações com preço ≤ 0 |

---

### **3. Regras de Carrinho e Pedidos**
| ID  | Regra | Descrição |
|-----|-------|-----------|
| RN08 | Tempo de vida do carrinho | Carrinhos não finalizados expiram em 72h |
| RN09 | Limite do carrinho | Máximo de 10 itens por carrinho |
| RN10 | Cupons | Só aplicáveis em compras acima de R$ 50,00 |
| RN11 | Conversão para pedido | O carrinho deve ter pelo menos 1 item válido |
| RN12 | Pagamento | Pedidos não pagos em 30min são automaticamente cancelados |

---

### **4. Regras de Avaliações e Comentários**
| ID  | Regra | Descrição |
|-----|-------|-----------|
| RN13 | Verificação de compra | Só permite avaliação se o jogo estiver na biblioteca do usuário |
| RN14 | Edição de reviews | Avaliações só podem ser editadas até 7 dias após publicação |
| RN15 | Notas válidas | A nota deve estar entre 0.0 e 10.0 (inclusive) |
| RN16 | Comentários ofensivos | Palavras-chave banidas disparam moderação automática |
| RN17 | Ordenação | Comentários são ordenados por "% de votos úteis" por padrão |

---

### **5. Regras de Moderação**
| ID  | Regra | Descrição |
|-----|-------|-----------|
| RN18 | Priorização | Reportes com 5+ flags são analisados em até 24h |
| RN19 | Ações de moderação | Remoção de conteúdo requer justificativa registrada |
| RN20 | Notificação | Usuários são notificados quando seu conteúdo é removido |

---

### **6. Regras de Negócio Específicas**
| ID  | Regra | Descrição |
|-----|-------|-----------|
| RN21 | Entrega de keys | Keys devem ser enviadas por email em até 5min após confirmação de pagamento |
| RN22 | Reembolsos | Só permitidos para keys não resgatadas (status=vendida) |
| RN23 | Fraude | 3+ pedidos cancelados por fraude bloqueiam o CPF |
| RN24 | Média de avaliações | Calculada com peso 2x para avaliações verificadas |

---

### **7. Regras Técnicas**
| ID  | Regra | Descrição |
|-----|-------|-----------|
| RN25 | Criptografia | Keys devem ser armazenadas com AES-256 |
| RN26 | Logs | Todas as ações de admin são registradas com timestamp e IP |
| RN27 | Backup | O banco de dados é backupado diariamente às 2AM |

---

### **Regras de Negócio Prioritárias**
1. **RN13 + RN21**: Garantem a integridade do sistema de avaliações e entrega
2. **RN06 + RN25**: Previnem fraudes com keys duplicadas/vazadas
3. **RN08 + RN12**: Otimizam gestão de recursos (estoque e pagamentos)

---

### **Exemplo de Aplicação no Código**
```javascript
// RN13 - Verificação de posse para avaliação
function podeAvaliar(usuarioId, jogoId) {
  const pedidos = await Pedidos.find({
    usuarioId,
    status: 'pago',
    'itens.jogoId': jogoId
  });
  return pedidos.length > 0;
}

// RN21 - Entrega automática de keys
function enviarKeys(pedidoId) {
  const pedido = await Pedido.findById(pedidoId);
  if (pedido.status === 'pago') {
    const keys = await Key.find({ _id: { $in: pedido.itens.keyId } });
    enviarEmail(pedido.usuarioId, 'Seus códigos', templateKeys(keys));
    await Key.updateMany({ _id: { $in: keys } }, { status: 'resgatada' });
  }
}
```