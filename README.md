# Sistema de Neuropsicologia

Sistema de gestão para clínicas de neuropsicologia com suporte a múltiplos usuários, controle de estoque e relatórios financeiros.

## 🚀 Funcionalidades

- **Gestão de Clientes**: Cadastro de adultos e menores de idade
- **Agendamentos**: Sistema completo de agenda com status e atribuições
- **Controle de Estoque**: Gerenciamento de materiais e movimentações
- **Relatórios Financeiros**: Acompanhamento de receitas e despesas
- **Múltiplos Usuários**: Coordenadores, funcionários e estagiários
- **Documentos**: Upload e gerenciamento de arquivos por cliente

## 📊 Tipos de Usuários

- **Coordenador**: Acesso total ao sistema
- **Staff**: Acesso a clientes e agendamentos
- **Estagiário**: Acesso limitado aos próprios agendamentos

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: Supabase (PostgreSQL)
- **Autenticação**: Sistema próprio com roles
- **Armazenamento**: Banco de dados relacional

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- Conta no Supabase
- Navegador moderno com suporte a ES6 modules

## 🔧 Instalação

1. **Clone o repositório**:
   ```bash
   git clone seu-repositorio
   cd sistema-neuropsicologia
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o Supabase**:
   - Crie um projeto no [Supabase](https://supabase.com)
   - Execute o arquivo `schema.sql` no SQL Editor
   - Copie suas credenciais para `js/supabase-config.js`

4. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

## 📁 Estrutura do Projeto

```
sistema-neuropsicologia/
├── index.html              # Página principal
├── style.css               # Estilos do sistema
├── schema.sql              # Schema do banco de dados
├── package.json            # Dependências e scripts
├── INSTRUCOES_MIGRACAO.md  # Guia de migração
├── js/
│   ├── supabase-config.js  # Configuração do Supabase
│   ├── database.js         # Camada de dados
│   ├── auth.js             # Autenticação
│   ├── main.js             # Lógica principal
│   ├── ui.js               # Interface do usuário
│   ├── clients.js          # Gestão de clientes
│   ├── schedule.js         # Sistema de agendamentos
│   ├── financial.js        # Relatórios financeiros
│   ├── stock.js            # Controle de estoque
│   ├── interns.js          # Gestão de estagiários
│   └── forms.js            # Manipulação de formulários
```

## 🔒 Usuários Padrão

### Coordenadores
- `admin` / `admin123`
- `raquel` / `admin123`
- `tatiana_admin` / `admin123`

### Staff
- `staff` / `staff123`

### Estagiários
- `frances` / `intern123`
- `vanessa` / `intern123`
- `luciana` / `intern123`
- E outros... (consulte o schema.sql)

## 💾 Banco de Dados

O sistema utiliza as seguintes tabelas principais:

- **users**: Usuários do sistema
- **clients**: Clientes (adultos e menores)
- **schedules**: Agendamentos
- **appointments**: Histórico de atendimentos
- **stock_items**: Itens do estoque
- **stock_movements**: Movimentações do estoque
- **daily_notes**: Notas financeiras diárias

## 🔐 Segurança

- Row Level Security (RLS) habilitado
- Controle de acesso baseado em roles
- Validação de dados no frontend e backend
- Senhas em texto simples (⚠️ **Para demo apenas**)

## 📈 Funcionalidades por Usuário

### Coordenador
- ✅ Todos os recursos do sistema
- ✅ Relatórios financeiros completos
- ✅ Gestão de estoque
- ✅ Gerenciamento de estagiários
- ✅ Visualização de todos os clientes

### Staff
- ✅ Cadastro e edição de clientes
- ✅ Gerenciamento de agendamentos
- ✅ Relatórios de clientes
- ✅ Visualização de todos os pacientes

### Estagiário
- ✅ Visualização da agenda pessoal
- ✅ Confirmação de atendimentos
- ✅ Visualização dos próprios pacientes
- ❌ Sem acesso a relatórios financeiros

## 🚀 Próximos Passos

1. **Migração Completa**: Substituir localStorage por Supabase
2. **Autenticação Segura**: Implementar hash de senhas
3. **Políticas RLS**: Configurar segurança granular
4. **Testes**: Implementar testes automatizados
5. **PWA**: Transformar em Progressive Web App

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

Para dúvidas ou problemas, consulte as instruções em `INSTRUCOES_MIGRACAO.md` ou abra uma issue no repositório.

---

**Status**: 🔄 Em migração para Supabase
**Versão**: 1.0.0
**Última atualização**: 2024 