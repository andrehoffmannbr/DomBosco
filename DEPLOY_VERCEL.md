# Deploy na Vercel - Sistema de Neuropsicologia

## ✅ Configuração Completa

As chaves do Supabase já foram configuradas no arquivo `js/supabase-config.js`:

- **URL**: https://ncjtfggvxvvasntozcqw.supabase.co
- **Chave configurada**: ✅ Pronta para uso
- **Arquivo vercel.json**: ✅ Criado

## 📋 Passos para Deploy

### 1. Preparação do Projeto
```bash
# Instalar dependências (se ainda não instalou)
npm install

# Testar localmente
npm run dev
```

### 2. Deploy na Vercel

#### Opção A: Via Dashboard da Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Selecione o projeto
4. Deploy automático

#### Opção B: Via CLI da Vercel
```bash
# Instalar CLI da Vercel
npm i -g vercel

# Fazer deploy
vercel

# Seguir as instruções interativas
```

### 3. Configurações Opcionais na Vercel

Se quiser usar variáveis de ambiente na Vercel:

1. **Acesse o painel do projeto na Vercel**
2. **Vá para Settings → Environment Variables**
3. **Adicione as variáveis**:
   ```
   SUPABASE_URL = https://ncjtfggvxvvasntozcqw.supabase.co
   SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5janRmZ2d2eHZ2YXNudG96Y3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTE3NDEsImV4cCI6MjA2NzA2Nzc0MX0.brzv2WhajL5o4ML16sYkCof_rgUfWN0RXQUQ72Yjil8
   ```

### 4. Configurações do Domínio

Após o deploy, você pode:
- Usar o domínio gerado automaticamente pela Vercel
- Adicionar um domínio personalizado
- Configurar HTTPS (automático na Vercel)

### 5. Verificação

Após o deploy, teste:
1. **Acesse o site** no domínio da Vercel
2. **Faça login** com um usuário de teste
3. **Verifique** se os dados estão sendo salvos no Supabase

### 6. Usuários de Teste

Use essas credenciais para testar:
- **Coordenador**: `admin` / `admin123`
- **Funcionário**: `staff` / `staff123`
- **Estagiário**: `frances` / `intern123`

## 🔧 Configurações Incluídas

- ✅ **Vercel.json**: Configurado para aplicação estática
- ✅ **Headers de segurança**: Adicionados automaticamente
- ✅ **Supabase**: Chaves configuradas e prontas
- ✅ **Package.json**: Scripts de build configurados

## 📱 Responsividade

O sistema já é responsivo e funcionará em:
- Desktop
- Tablet
- Mobile

## 🔒 Segurança

- Headers de segurança configurados
- HTTPS automático na Vercel
- Chaves do Supabase protegidas

## 📊 Monitoramento

A Vercel oferece:
- Analytics automático
- Logs de erro
- Métricas de performance
- Monitoramento de uptime

---

## 🚀 Próximo Passo

**Seu projeto está pronto para deploy!**

1. Conecte seu repositório na Vercel
2. O deploy será automático
3. Teste o sistema no domínio gerado

**URL do projeto**: Será gerada automaticamente pela Vercel 