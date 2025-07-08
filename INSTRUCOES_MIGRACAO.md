# Instruções de Migração para Supabase

## Problemas Corrigidos no Schema

✅ **Erro de caracteres corrigido**: Aumentei os limites dos campos para acomodar os dados existentes:
- `phone`: `VARCHAR(20)` → `VARCHAR(100)`
- `cpf`: `VARCHAR(14)` → `VARCHAR(30)`
- `rg`: `VARCHAR(20)` → `VARCHAR(50)`
- `institution`: `VARCHAR(255)` → `VARCHAR(500)`
- `graduation_period`: `VARCHAR(50)` → `VARCHAR(100)`
- `education`: `VARCHAR(255)` → `VARCHAR(500)`
- `discipline`: `VARCHAR(255)` → `VARCHAR(500)`
- `number`: `VARCHAR(20)` → `VARCHAR(50)`
- `telefone_pai/telefone_mae`: `VARCHAR(20)` → `VARCHAR(100)`

## Passo a Passo para Implementação

### 1. Configurar o Supabase

1. **Execute o schema corrigido** no SQL Editor do Supabase:
   - Copie todo o conteúdo do arquivo `schema.sql`
   - Cole no SQL Editor do Supabase
   - Execute o comando

2. **Obtenha suas credenciais** do Supabase:
   - Acesse Settings → API
   - Copie a `URL` do projeto
   - Copie a `anon/public key`

### 2. Configurar o Arquivo de Configuração

3. **Edite o arquivo `js/supabase-config.js`**:
   ```javascript
   // Substitua estas linhas com seus valores reais:
   const SUPABASE_URL = 'https://seu-projeto.supabase.co'  // ← Sua URL aqui
   const SUPABASE_ANON_KEY = 'sua-chave-anonima-aqui'      // ← Sua chave aqui
   ```

### 3. Instalar Dependências

4. **Instale o cliente do Supabase**:
   ```bash
   npm install @supabase/supabase-js
   ```

   Ou se não usar npm, adicione via CDN no HTML:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   ```

### 4. Próximos Passos (Após Configuração)

Depois de configurar o Supabase, precisaremos:

1. **Modificar o `database.js`** para usar Supabase em vez de localStorage
2. **Atualizar os módulos** para trabalhar com funções assíncronas
3. **Implementar autenticação** real do Supabase
4. **Configurar políticas de segurança** (RLS)

## Exemplo de Uso do Arquivo de Configuração

```javascript
// Importar configuração
import { supabase, supabaseUtils } from './supabase-config.js'

// Exemplo: Buscar todos os clientes
const { data: clients, error } = await supabaseUtils.select('clients')

// Exemplo: Inserir novo cliente
const novoCliente = {
    name: 'João Silva',
    type: 'adult',
    email: 'joao@email.com'
}
const { data, error } = await supabaseUtils.insert('clients', novoCliente)

// Exemplo: Atualizar cliente
const { data, error } = await supabaseUtils.update('clients', 1, { 
    name: 'João Silva Santos' 
})

// Exemplo: Deletar cliente
const { data, error } = await supabaseUtils.delete('clients', 1)
```

## Estrutura das Tabelas Criadas

- ✅ `users` - Usuários do sistema (coordenadores, staff, estagiários)
- ✅ `clients` - Clientes (adultos e menores de idade)
- ✅ `schedules` - Agendamentos de consultas
- ✅ `appointments` - Histórico de atendimentos realizados
- ✅ `client_notes` - Notas dos clientes
- ✅ `client_documents` - Documentos dos clientes
- ✅ `anamnesis_types` - Tipos de anamnese (40 tipos pré-cadastrados)
- ✅ `stock_items` - Itens do estoque
- ✅ `stock_movements` - Movimentações do estoque
- ✅ `daily_notes` - Notas diárias financeiras
- ✅ `general_documents` - Documentos gerais
- ✅ `id_counters` - Contadores de ID (para compatibilidade)

## Dados Iniciais Incluídos

- ✅ **Usuários**: Todos os 17 usuários do sistema atual
- ✅ **Tipos de Anamnese**: 40 tipos (anamnese-1 a anamnese-40)
- ✅ **Estoque**: 5 itens de exemplo
- ✅ **Contadores**: Configurados para começar nos valores corretos

## Segurança Implementada

- ✅ **Row Level Security (RLS)** habilitado em todas as tabelas
- ✅ **Índices** criados para otimização de performance
- ✅ **Triggers** para atualização automática de timestamps
- ✅ **Constraints** para validação de dados

## Vantagens da Migração

1. **Dados persistem** mesmo após limpar o navegador
2. **Múltiplos usuários** podem acessar simultaneamente
3. **Backup automático** dos dados
4. **Sincronização em tempo real** entre dispositivos
5. **Melhor performance** com queries SQL otimizadas
6. **Segurança robusta** com autenticação e autorização

## Teste Após Configuração

Para testar se está funcionando:

```javascript
// Teste básico no console do navegador
import { supabase } from './js/supabase-config.js'

// Verificar conexão
supabase.from('users').select('count').then(console.log)
```

Se retornar dados, a configuração está correta!

---

**Próximo passo**: Após configurar o Supabase, me informe para que eu possa criar o novo `database.js` que substituirá o localStorage pelo Supabase. 