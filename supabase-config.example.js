// Arquivo de exemplo para configuração do Supabase
// Copie este arquivo para js/supabase-config.js e substitua pelos valores do seu projeto

// Configuração do Supabase
// Substitua pelos valores do seu projeto Supabase
const SUPABASE_URL = 'https://seu-projeto.supabase.co'  // ← Substitua por sua URL
const SUPABASE_ANON_KEY = 'sua-chave-anonima-aqui'       // ← Substitua por sua chave

// Exemplo de valores reais (não use estes):
// const SUPABASE_URL = 'https://abcdefghijklmnop.supabase.co'
// const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY4...'

// Instruções:
// 1. Crie um projeto no Supabase (https://supabase.com)
// 2. Vá para Settings → API no painel do Supabase
// 3. Copie a URL e a chave anônima
// 4. Execute o arquivo schema.sql no SQL Editor
// 5. Substitua os valores acima
// 6. Copie este arquivo para js/supabase-config.js

// Importa o cliente do Supabase
import { createClient } from '@supabase/supabase-js'

// Cria a instância do cliente Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Resto do código igual ao arquivo original... 