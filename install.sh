#!/bin/bash

# Script de instalação para o Sistema de Neuropsicologia

echo "🚀 Instalando Sistema de Neuropsicologia..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    echo "💡 Baixe em: https://nodejs.org/"
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Por favor, instale o npm primeiro."
    exit 1
fi

echo "✅ Node.js e npm encontrados"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Verificar se a instalação foi bem-sucedida
if [ $? -eq 0 ]; then
    echo "✅ Dependências instaladas com sucesso!"
else
    echo "❌ Erro na instalação das dependências"
    exit 1
fi

echo ""
echo "🎉 Instalação concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure o Supabase seguindo as instruções em INSTRUCOES_MIGRACAO.md"
echo "2. Edite o arquivo js/supabase-config.js com suas credenciais"
echo "3. Execute 'npm run dev' para iniciar o servidor de desenvolvimento"
echo ""
echo "🔗 Links úteis:"
echo "- Supabase: https://supabase.com"
echo "- Documentação: README.md"
echo "- Instruções de migração: INSTRUCOES_MIGRACAO.md"
echo ""
echo "🚀 Para iniciar o sistema:"
echo "npm run dev" 