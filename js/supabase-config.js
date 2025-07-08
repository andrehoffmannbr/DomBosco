// Configuração do Supabase
const SUPABASE_URL = 'https://ncjtfggvxvvasntozcqw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5janRmZ2d2eHZ2YXNudG96Y3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTE3NDEsImV4cCI6MjA2NzA2Nzc0MX0.brzv2WhajL5o4ML16sYkCof_rgUfWN0RXQUQ72Yjil8'

// Importa o cliente do Supabase
import { createClient } from '@supabase/supabase-js'

// Cria a instância do cliente Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Configurações para diferentes ambientes
const config = {
    development: {
        url: SUPABASE_URL,
        anonKey: SUPABASE_ANON_KEY,
        debug: true
    },
    production: {
        url: SUPABASE_URL,
        anonKey: SUPABASE_ANON_KEY,
        debug: false
    }
}

// Detecta o ambiente atual
const environment = window.location.hostname === 'localhost' ? 'development' : 'production'
export const currentConfig = config[environment]

// Funções utilitárias para operações comuns do Supabase
export const supabaseUtils = {
    // Função para fazer login
    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        return { data, error }
    },

    // Função para fazer logout
    async signOut() {
        const { error } = await supabase.auth.signOut()
        return { error }
    },

    // Função para obter usuário atual
    async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser()
        return user
    },

    // Função para verificar sessão
    async getSession() {
        const { data: { session } } = await supabase.auth.getSession()
        return session
    },

    // Função para inserir dados
    async insert(table, data) {
        const { data: result, error } = await supabase
            .from(table)
            .insert(data)
            .select()
        return { data: result, error }
    },

    // Função para atualizar dados
    async update(table, id, data) {
        const { data: result, error } = await supabase
            .from(table)
            .update(data)
            .eq('id', id)
            .select()
        return { data: result, error }
    },

    // Função para deletar dados
    async delete(table, id) {
        const { data: result, error } = await supabase
            .from(table)
            .delete()
            .eq('id', id)
        return { data: result, error }
    },

    // Função para buscar dados
    async select(table, columns = '*', filters = {}) {
        let query = supabase.from(table).select(columns)
        
        // Aplicar filtros
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query = query.eq(key, value)
            }
        })

        const { data, error } = await query
        return { data, error }
    },

    // Função para buscar com condições mais complexas
    async selectWithConditions(table, columns = '*', conditions = []) {
        let query = supabase.from(table).select(columns)
        
        // Aplicar condições
        conditions.forEach(condition => {
            const { column, operator, value } = condition
            switch(operator) {
                case 'eq':
                    query = query.eq(column, value)
                    break
                case 'neq':
                    query = query.neq(column, value)
                    break
                case 'gt':
                    query = query.gt(column, value)
                    break
                case 'gte':
                    query = query.gte(column, value)
                    break
                case 'lt':
                    query = query.lt(column, value)
                    break
                case 'lte':
                    query = query.lte(column, value)
                    break
                case 'like':
                    query = query.like(column, value)
                    break
                case 'ilike':
                    query = query.ilike(column, value)
                    break
                case 'in':
                    query = query.in(column, value)
                    break
                default:
                    query = query.eq(column, value)
            }
        })

        const { data, error } = await query
        return { data, error }
    },

    // Função para contar registros
    async count(table, filters = {}) {
        let query = supabase.from(table).select('*', { count: 'exact' })
        
        // Aplicar filtros
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query = query.eq(key, value)
            }
        })

        const { count, error } = await query
        return { count, error }
    },

    // Função para atualizar contadores de ID
    async updateIdCounter(tableName, nextId) {
        const { data, error } = await supabase
            .from('id_counters')
            .update({ next_id: nextId })
            .eq('table_name', tableName)
        return { data, error }
    },

    // Função para obter próximo ID
    async getNextId(tableName) {
        const { data, error } = await supabase
            .from('id_counters')
            .select('next_id')
            .eq('table_name', tableName)
            .single()
        
        if (error) return { nextId: null, error }
        
        const nextId = data.next_id
        
        // Atualizar contador
        await this.updateIdCounter(tableName, nextId + 1)
        
        return { nextId, error: null }
    },

    // Função para upload de arquivos
    async uploadFile(bucket, path, file) {
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(path, file)
        return { data, error }
    },

    // Função para download de arquivos
    async downloadFile(bucket, path) {
        const { data, error } = await supabase.storage
            .from(bucket)
            .download(path)
        return { data, error }
    },

    // Função para obter URL pública de arquivo
    getPublicUrl(bucket, path) {
        const { data } = supabase.storage
            .from(bucket)
            .getPublicUrl(path)
        return data.publicUrl
    },

    // Função para escutar mudanças em tempo real
    subscribeToChanges(table, callback, filters = {}) {
        let subscription = supabase
            .channel(`${table}-changes`)
            .on('postgres_changes', { 
                event: '*', 
                schema: 'public', 
                table: table,
                filter: Object.entries(filters).map(([key, value]) => `${key}=eq.${value}`).join(' and ')
            }, callback)
            .subscribe()
        
        return subscription
    }
}

// Exporta configurações e utilitários
export { config, environment }

// Log de configuração (apenas em desenvolvimento)
if (currentConfig.debug) {
    console.log('Supabase configurado para ambiente:', environment)
    console.log('URL:', currentConfig.url)
} 