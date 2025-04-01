# Projeto Interdisciplinar - 5º Semestre

**Repositório do projeto interdisciplinar do 5º semestre**  
Desenvolvido por: **Lucas Barbosa** e **Marcelo Araújo**

## 🌿 Estratégia de Branches
### Padrão de Nomeação

categoria/motivo-existencia

### Categorias
| Categoria | Descrição                          | Exemplo                |
|-----------|------------------------------------|------------------------|
| `feat`    | Nova funcionalidade                | `feat/tela-login`      |
| `doc`     | Documentação                       | `doc/atualiza-readme`  |
| `bug`     | Correção de bugs                   | `bug/corrige-erro-500` |
| `sub`     | Branch secundária (testes, etc.)   | `sub/testes-unitarios` |

### Branches Especiais
- `main` → Branch principal (protegida)
- `sub/testes-unitarios` → Testes unitários
- `sub/testes-integracao` → Testes de integração

## 🛠️ Tecnologias Utilizadas
- **Frontend**: React Native
- **Backend**: Node.js
- **Banco de Dados**: SQLite
- **Ferramentas**: GitHub Projects, Figma, PlantUML

## ⚙️ Configuração do Ambiente
```
git clone https://github.com/seu-usuario/lm-projeto-interdisciplinar-sem-5.git
cd lm-projeto-interdisciplinar-sem-5
npm install
```
## 🤝 Como Contribuir
1. Crie uma branch:
   ```bash
   git checkout -b feat/nova-funcionalidade
   ```
2. Faça commit das alterações:
   ```bash
   git commit -m "feat: adiciona tela de login"
   ```
3. Envie para o repositório:
   ```bash
   git push origin feat/nova-funcionalidade
   ```
4. Abra um **Pull Request** para revisão.

## 📌 Kanban no GitHub
### Colunas Recomendadas
| Coluna          | Função                                |
|-----------------|---------------------------------------|
| `Backlog`       | Tarefas não priorizadas               |
| `In Progress`   | Em andamento                          |
| `Code Review`   | Em revisão (PR aberto)                |
| `Done`          | Concluído e mergeado                  |
