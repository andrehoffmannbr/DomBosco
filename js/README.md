# JavaScript - Sistema de Neuropsicologia

## 🔧 Configuração do Supabase

O arquivo `supabase-config.js` está **configurado e pronto para uso** com suas chaves do Supabase.

### ✅ Configuração Atual

```javascript
const SUPABASE_URL = 'https://ncjtfggvxvvasntozcqw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

### 📁 Estrutura dos Arquivos

- `supabase-config.js` - ✅ **Configurado** com suas chaves
- `database.js` - Sistema de dados atual (localStorage)
- `auth.js` - Sistema de autenticação
- `main.js` - Lógica principal da aplicação
- `ui.js` - Interface do usuário
- `clients.js` - Gestão de clientes
- `schedule.js` - Sistema de agendamentos
- `financial.js` - Relatórios financeiros
- `stock.js` - Controle de estoque
- `interns.js` - Gestão de estagiários
- `forms.js` - Manipulação de formulários

### 🔄 Próximos Passos (Futuro)

Quando implementar a migração completa:

1. **Substituir** `database.js` por versão do Supabase
2. **Atualizar** todos os módulos para usar `supabase-config.js`
3. **Implementar** funções assíncronas
4. **Configurar** autenticação do Supabase

### 🛠️ Funcionalidades Disponíveis

O arquivo `supabase-config.js` já inclui:

- ✅ Cliente Supabase configurado
- ✅ Funções CRUD (Create, Read, Update, Delete)
- ✅ Utilitários para queries complexas
- ✅ Sistema de contadores de ID
- ✅ Upload de arquivos
- ✅ Real-time subscriptions
- ✅ Detecção de ambiente (dev/prod)

### 📊 Exemplo de Uso

```javascript
import { supabase, supabaseUtils } from './supabase-config.js'

// Buscar usuários
const { data: users, error } = await supabaseUtils.select('users')

// Inserir cliente
const novoCliente = { name: 'João Silva', type: 'adult' }
const { data, error } = await supabaseUtils.insert('clients', novoCliente)

// Atualizar cliente
await supabaseUtils.update('clients', 1, { name: 'João Santos' })

// Deletar cliente
await supabaseUtils.delete('clients', 1)
```

### 🔒 Segurança

- Chaves configuradas para ambiente de produção
- Headers de segurança configurados
- Row Level Security (RLS) habilitado no Supabase
- Validação de dados implementada

---

**Status**: ✅ Configurado e pronto para uso na Vercel 