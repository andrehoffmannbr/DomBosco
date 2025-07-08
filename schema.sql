-- Schema para Sistema de Neuropsicologia - Supabase
-- Este schema substitui o armazenamento em localStorage por banco de dados

-- Tabela de usuários (coordenadores, funcionários, estagiários)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('coordinator', 'staff', 'intern')),
    email VARCHAR(255),
    phone VARCHAR(100),
    cpf VARCHAR(30),
    address TEXT,
    institution VARCHAR(500),
    graduation_period VARCHAR(100),
    education VARCHAR(500),
    discipline VARCHAR(500),
    change_history JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de clientes (adultos e menores de idade)
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    type VARCHAR(10) NOT NULL CHECK (type IN ('adult', 'minor')),
    name VARCHAR(255) NOT NULL,
    birth_date DATE,
    gender VARCHAR(20),
    
    -- Campos específicos para adultos
    email VARCHAR(255),
    phone VARCHAR(100),
    cpf VARCHAR(30),
    rg VARCHAR(50),
    naturalidade VARCHAR(255),
    estado_civil VARCHAR(30),
    escolaridade VARCHAR(50),
    profissao VARCHAR(255),
    contato_emergencia VARCHAR(255),
    
    -- Campos específicos para menores
    escola VARCHAR(255),
    tipo_escola VARCHAR(30),
    ano_escolar VARCHAR(30),
    nome_pai VARCHAR(255),
    idade_pai INTEGER,
    profissao_pai VARCHAR(255),
    telefone_pai VARCHAR(100),
    nome_mae VARCHAR(255),
    idade_mae INTEGER,
    profissao_mae VARCHAR(255),
    telefone_mae VARCHAR(100),
    responsavel_financeiro VARCHAR(255),
    outro_responsavel VARCHAR(255),
    
    -- Campos de endereço (comuns)
    cep VARCHAR(9),
    address TEXT,
    number VARCHAR(50),
    complement VARCHAR(255),
    neighborhood VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(2),
    observations TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de agendamentos
CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    time TIME NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'agendado' CHECK (status IN ('agendado', 'confirmado', 'concluido', 'cancelado')),
    assigned_to_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    assigned_to_user_name VARCHAR(255),
    observations TEXT,
    cancel_reason TEXT,
    cancel_date TIMESTAMP,
    canceled_by VARCHAR(255),
    cancel_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de atendimentos realizados
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    schedule_id INTEGER REFERENCES schedules(id) ON DELETE SET NULL,
    date DATE NOT NULL,
    anamnesis_type_id VARCHAR(50),
    attended_by VARCHAR(255),
    intern_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    notes TEXT,
    value DECIMAL(10,2),
    materials_used JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de notas dos clientes
CREATE TABLE client_notes (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de documentos dos clientes
CREATE TABLE client_documents (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(30) NOT NULL,
    description TEXT,
    file_name VARCHAR(255),
    file_data TEXT, -- Para armazenar dados do arquivo em base64
    uploaded_by VARCHAR(255),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de tipos de anamnese
CREATE TABLE anamnesis_types (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de itens do estoque
CREATE TABLE stock_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    min_stock INTEGER NOT NULL DEFAULT 0,
    unit VARCHAR(20) NOT NULL,
    description TEXT,
    unit_value DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de movimentações de estoque
CREATE TABLE stock_movements (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES stock_items(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('entrada', 'saida', 'exclusao')),
    quantity INTEGER NOT NULL,
    item_unit_value DECIMAL(10,2) DEFAULT 0,
    reason VARCHAR(255),
    date DATE NOT NULL,
    performed_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de notas diárias (financeiras e administrativas)
CREATE TABLE daily_notes (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('receita', 'despesa', 'observacao')),
    value DECIMAL(10,2),
    content TEXT NOT NULL,
    file_name VARCHAR(255),
    file_data TEXT, -- Para armazenar dados do arquivo em base64
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de documentos gerais
CREATE TABLE general_documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(30) NOT NULL,
    content TEXT,
    file_name VARCHAR(255),
    file_data TEXT, -- Para armazenar dados do arquivo em base64
    uploaded_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de contadores para IDs (para manter compatibilidade com o sistema atual)
CREATE TABLE id_counters (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(50) UNIQUE NOT NULL,
    next_id INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados iniciais para contadores
INSERT INTO id_counters (table_name, next_id) VALUES
    ('clients', 1),
    ('appointments', 1),
    ('schedules', 1),
    ('client_notes', 1),
    ('client_documents', 1),
    ('stock_items', 1),
    ('stock_movements', 1),
    ('daily_notes', 1),
    ('general_documents', 1),
    ('users', 22); -- Começar em 22 pois já temos usuários hardcoded até ID 21

-- Inserir usuários padrão do sistema
INSERT INTO users (id, username, password, name, role, email, phone, cpf, address, institution, graduation_period, education, discipline) VALUES
    (1, 'admin', 'admin123', 'Coordenador', 'coordinator', '', '', '', '', '', '', '', ''),
    (2, 'staff', 'staff123', 'Funcionário', 'staff', '', '', '', '', '', '', '', ''),
    (18, 'raquel', 'admin123', 'Coordenadora Raquel', 'coordinator', '', '', '', '', '', '', '', ''),
    (19, 'tatiana_admin', 'admin123', 'Coordenadora Tatiana', 'coordinator', '', '', '', '', '', '', '', ''),
    (5, 'frances', 'intern123', 'Frances Jane Bifano Freddi', 'intern', 'fjanebifano@gmail.com', '(31)99826-6514', '629.398.156-15', 'rua Castelo de Windsor 475/301 - bairro Castelo - Belo Horizonte MG.', 'IESLA', '5°', 'Análise e Desenvolvimento de Sistemas', 'Neuropsicologia Infantil'),
    (6, 'vanessa', 'intern123', 'Vanessa', 'intern', 'vanessa@example.com', '(21) 92222-2222', '222.333.444-55', 'Av. B, 456', 'Centro Universitário', '7º Semestre', 'Psicologia', 'Reabilitação Cognitiva'),
    (7, 'luciana', 'intern123', 'Luciana Villela Moyses', 'intern', 'luttivillela@gmail.com', '(31) 99745-2225', '781.904.106-44', 'Rua Deputado Gregoriano Canedo 18 Trevo', 'IESLA', '7º Semestre', 'Letras', 'Psicodiagnóstico'),
    (8, 'debora', 'intern123', 'Debora', 'intern', 'debora@example.com', '(21) 94444-4444', '444.555.666-77', 'Travessa D, 101', 'Universidade Estadual', '8º Semestre', 'Psicologia', 'Neurociências'),
    (9, 'renata', 'intern123', 'Renata', 'intern', 'renata@example.com', '(21) 95555-5555', '555.666.777-88', 'Estrada E, 202', 'Universidade Federal', '5º Semestre', 'Terapia Ocupacional', 'Cognição'),
    (10, 'nathalia', 'intern123', 'Nathalia', 'intern', 'nathalia@example.com', '(21) 96666-6666', '666.777.888-99', 'Rua F, 303', 'Centro Universitário', '7º Semestre', 'Psicopedagogia', 'Aprendizagem'),
    (11, 'walisson', 'intern123', 'Walisson', 'intern', 'walisson@example.com', '(21) 97777-7777', '777.888.999-00', 'Av. G, 404', 'Faculdade Particular', '6º Semestre', 'Fonoaudiologia', 'Linguagem'),
    (12, 'tatiana', 'intern123', 'Tatiana', 'intern', 'tatiana@example.com', '(21) 98888-8888', '888.999.000-11', 'Rua H, 505', 'Universidade Estadual', '8º Semestre', 'Psicologia', 'Saúde Mental'),
    (13, 'luiz', 'intern123', 'Luiz', 'intern', 'luiz@example.com', '(21) 99999-9999', '999.000.111-22', 'Alameda I, 606', 'Universidade Federal', '5º Semestre', 'Psicologia', 'Avaliação Psicológica'),
    (14, 'pedro', 'intern123', 'Pedro', 'intern', 'pedro@example.com', '(21) 90000-0000', '000.111.222-33', 'Rua J, 707', 'Centro Universitário', '7º Semestre', 'Psicologia', 'Neuropsicologia Adulto'),
    (15, 'pedro_alexandre', 'intern123', 'Pedro Alexandre Carneiro', 'intern', 'pedrinalex@gmail.com', '(31)992384630', '018.582.366-14', 'Rua Perdoes 781', 'PUC Minas coração eucarístico', '4°', 'Psicologia', 'Neuropsicologia Adulto'),
    (16, 'wallisson', 'intern123', 'Wallisson Henrique Santos', 'intern', 'wallissonpsicologo@gmail.com', '99889-7105 / 98693-3477', '011.922.196-12', 'Rua Higienópolis, 137, Piratininga. Ibirité', 'Pós graduação - Fumec', 'N/A', 'Psicólogo', 'N/A'),
    (20, 'renata_cantagalli', 'intern123', 'Renata Grichtolik Cantagalli Paiva', 'intern', 'renatacantagalli@gmail.com', '(31) 98598-7608', '06050524688', 'Rua Bibliotecários, Bairro Alipio de Melo, BH/MG - 30840-070', 'IESLA', 'Pós-Graduação / último semestre', '08/2025', 'N/A'),
    (21, 'tatiana_souto', 'intern123', 'Tatiana Souto da Silveira', 'intern', 'tatyssilveira1920@gmail.com', '(31) 98742-9615', '057.454.456-96', 'Rua Gasparino Carvalho Silva, 63 - APTO 402 - Paquetá', 'IESLA', '8', '07/2026', 'N/A');

-- Inserir tipos de anamnese padrão
INSERT INTO anamnesis_types (id, name) 
SELECT 'anamnese-' || n, 'Anamnese ' || n
FROM generate_series(1, 40) n;

-- Inserir itens de estoque de exemplo
INSERT INTO stock_items (name, category, quantity, min_stock, unit, description, unit_value) VALUES
    ('Lápis HB', 'papelaria', 50, 10, 'unidade', 'Lápis para desenhos e escrita', 1.50),
    ('Papel A4', 'papelaria', 25, 5, 'resma', 'Papel branco para impressão', 20.00),
    ('Teste WISC-IV', 'testes', 3, 1, 'kit', 'Escala de Inteligência Wechsler para Crianças', 800.00),
    ('Blocos de Madeira', 'brinquedos', 8, 2, 'caixa', 'Blocos coloridos para atividades lúdicas', 45.00),
    ('Quebra-cabeça 100 peças', 'jogos', 15, 3, 'pacote', 'Quebra-cabeças diversos temas', 30.00);

-- Criar índices para otimização
CREATE INDEX idx_clients_type ON clients(type);
CREATE INDEX idx_clients_name ON clients(name);
CREATE INDEX idx_schedules_date ON schedules(date);
CREATE INDEX idx_schedules_client_id ON schedules(client_id);
CREATE INDEX idx_schedules_assigned_to_user_id ON schedules(assigned_to_user_id);
CREATE INDEX idx_appointments_client_id ON appointments(client_id);
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_client_notes_client_id ON client_notes(client_id);
CREATE INDEX idx_client_documents_client_id ON client_documents(client_id);
CREATE INDEX idx_stock_movements_item_id ON stock_movements(item_id);
CREATE INDEX idx_stock_movements_date ON stock_movements(date);
CREATE INDEX idx_daily_notes_date ON daily_notes(date);
CREATE INDEX idx_daily_notes_type ON daily_notes(type);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_username ON users(username);

-- Criar triggers para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON schedules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stock_items_updated_at BEFORE UPDATE ON stock_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_id_counters_updated_at BEFORE UPDATE ON id_counters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS) para segurança
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE general_documents ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança serão configuradas posteriormente baseadas nas necessidades específicas
-- Por exemplo, estagiários só podem ver seus próprios agendamentos e pacientes

-- Comentários sobre as tabelas
COMMENT ON TABLE users IS 'Usuários do sistema: coordenadores, funcionários e estagiários';
COMMENT ON TABLE clients IS 'Clientes do sistema: adultos e menores de idade';
COMMENT ON TABLE schedules IS 'Agendamentos de consultas e atendimentos';
COMMENT ON TABLE appointments IS 'Histórico de atendimentos realizados';
COMMENT ON TABLE client_notes IS 'Notas e observações sobre os clientes';
COMMENT ON TABLE client_documents IS 'Documentos anexados aos clientes';
COMMENT ON TABLE anamnesis_types IS 'Tipos de anamnese disponíveis no sistema';
COMMENT ON TABLE stock_items IS 'Itens disponíveis no estoque';
COMMENT ON TABLE stock_movements IS 'Movimentações de entrada e saída do estoque';
COMMENT ON TABLE daily_notes IS 'Notas diárias financeiras e administrativas';
COMMENT ON TABLE general_documents IS 'Documentos gerais do sistema';
COMMENT ON TABLE id_counters IS 'Contadores de IDs para manter compatibilidade'; 