Aqui estão os casos de teste organizados por funcionalidade, utilizando **Partição por Classes de Equivalência** e **Análise de Valor Limite**, baseados nas regras de negócio e diagramas fornecidos:

---

### **1. Administração de Contatos**  
#### **Caso de Teste CT001 – Adicionar Nova Entidade (OSC/Órgão)**  
- **Classe Válida**:  
  - CNPJ válido (14 dígitos), e-mail válido (`exemplo@dominio.com`), site com HTTPS.  
- **Classes Inválidas**:  
  - CNPJ inválido (13 dígitos), e-mail sem `@` (`exemplodominio.com`), site sem HTTPS (`http://site.com`).  
- **Valor Limite**:  
  - Campo "Área de Atuação" com 1 caractere (inválido) vs. 2 caracteres (válido).  

#### **Caso de Teste CT002 – Editar Contatos Existentes**  
- **Classe Válida**:  
  - Atualizar telefone para formato válido (`(00) 00000-0000`).  
- **Classe Inválida**:  
  - Telefone com menos de 11 dígitos (`(00) 0000-0000`).  

---

### **2. Gestão de Usuários**  
#### **Caso de Teste CT003 – Banir Usuário**  
- **Classes Válidas**:  
  - Banimento temporário (1 a 30 dias) ou permanente.  
- **Classes Inválidas**:  
  - Banimento sem justificativa ou com justificativa vazia.  

#### **Caso de Teste CT004 – Promover a Moderador**  
- **Classe Válida**:  
  - Usuário com status `ATIVO`.  
- **Classe Inválida**:  
  - Usuário `BANIDO` ou `SUSPENSO`.  

---

### **3. Gerenciamento de Posts**  
#### **Caso de Teste CT005 – Publicar Post**  
- **Classe Válida**:  
  - Post com título (5 a 100 caracteres) e conteúdo (10 a 5000 caracteres).  
- **Classes Inválidas**:  
  - Título com 4 caracteres (inválido) ou 101 caracteres (inválido).  

#### **Caso de Teste CT006 – Arquivar Post**  
- **Valor Limite**:  
  - Post arquivado após 30 dias da exclusão (limite do histórico).  

---

### **4. Moderação de Conteúdo**  
#### **Caso de Teste CT007 – Reportar Conteúdo**  
- **Classes Válidas**:  
  - Conteúdo com `spam`, `fake news`, ou linguagem ofensiva.  
- **Classe Inválida**:  
  - Reporte sem motivo selecionado.  

---

### **5. Cadastro e Autenticação**  
#### **Caso de Teste CT008 – Criar Conta**  
- **Classes Válidas**:  
  - E-mail válido + senha com 8+ caracteres (incluindo símbolos).  
- **Classes Inválidas**:  
  - E-mail sem `@` ou senha com 7 caracteres.  

#### **Caso de Teste CT009 – Recuperar Senha**  
- **Valor Limite**:  
  - Token de recuperação expirado (após 24h) vs. válido (dentro de 24h).  

---

### **6. Comentários no Blog**  
#### **Caso de Teste CT010 – Editar Comentário**  
- **Classe Válida**:  
  - Edição dentro de 1h após criação.  
- **Classe Inválida**:  
  - Edição após 1h (bloqueada).  

---

### **7. Jogo (Party e Personagens)**  
#### **Caso de Teste CT011 – Montar Party**  
- **Classes Válidas**:  
  - Party com 1 a 4 personagens.  
- **Classes Inválidas**:  
  - Party com 0 ou 5 personagens.  

#### **Caso de Teste CT012 – Comprar Personagem**  
- **Valor Limite**:  
  - Saldo de moedas igual ao preço do personagem (transação válida) vs. saldo insuficiente (inválido).  

---

### **8. Gerenciamento de Conta**  
#### **Caso de Teste CT013 – Excluir Conta**  
- **Classe Válida**:  
  - Confirmação por 2FA (e-mail/SMS).  
- **Classe Inválida**:  
  - Tentativa sem 2FA.  

---