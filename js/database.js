// Database module for neuropsychology system - Supabase version
import { supabase, supabaseUtils } from './supabase-config.js';

export const db = {
    clients: [],
    appointments: [],
    schedules: [],
    dailyNotes: [], // New array for daily financial notes
    generalDocuments: [], // New array for general documents and notes
    users: [
        { id: 1, username: 'admin', password: 'admin123', name: 'Coordenador', role: 'coordinator' },
        { id: 2, username: 'staff', password: 'staff123', name: 'Funcionário', role: 'staff' },
        // New admin users
        { id: 18, username: 'raquel', password: 'admin123', name: 'Coordenadora Raquel', role: 'coordinator' },
        { id: 19, username: 'tatiana_admin', password: 'admin123', name: 'Coordenadora Tatiana', role: 'coordinator' },
        // New interns with full data
        { id: 5, username: 'frances', password: 'intern123', name: 'Frances Jane Bifano Freddi', role: 'intern', address: 'rua Castelo de Windsor 475/301 - bairro Castelo - Belo Horizonte MG.', institution: 'IESLA', graduationPeriod: '5°', education: 'Análise e Desenvolvimento de Sistemas', discipline: 'Neuropsicologia Infantil', phone: '(31)99826-6514', email: 'fjanebifano@gmail.com', cpf: '629.398.156-15' },
        { id: 6, username: 'vanessa', password: 'intern123', name: 'Vanessa', role: 'intern', address: 'Av. B, 456', institution: 'Centro Universitário', graduationPeriod: '7º Semestre', education: 'Psicologia', discipline: 'Reabilitação Cognitiva', phone: '(21) 92222-2222', email: 'vanessa@example.com', cpf: '222.333.444-55' },
        { id: 7, username: 'luciana', password: 'intern123', name: 'Luciana Villela Moyses', role: 'intern', address: 'Rua Deputado Gregoriano Canedo 18 Trevo', institution: 'IESLA', graduationPeriod: '7º Semestre', education: 'Letras', discipline: 'Psicodiagnóstico', phone: '(31) 99745-2225', email: 'luttivillela@gmail.com', cpf: '781.904.106-44' },
        { id: 8, username: 'debora', password: 'intern123', name: 'Debora', role: 'intern', address: 'Travessa D, 101', institution: 'Universidade Estadual', graduationPeriod: '8º Semestre', education: 'Psicologia', discipline: 'Neurociências', phone: '(21) 94444-4444', email: 'debora@example.com', cpf: '444.555.666-77' },
        { id: 9, username: 'renata', password: 'intern123', name: 'Renata', role: 'intern', address: 'Estrada E, 202', institution: 'Universidade Federal', graduationPeriod: '5º Semestre', education: 'Terapia Ocupacional', discipline: 'Cognição', phone: '(21) 95555-5555', email: 'renata@example.com', cpf: '555.666.777-88' },
        { id: 10, username: 'nathalia', password: 'intern123', name: 'Nathalia', role: 'intern', address: 'Rua F, 303', institution: 'Centro Universitário', graduationPeriod: '7º Semestre', education: 'Psicopedagogia', discipline: 'Aprendizagem', phone: '(21) 96666-6666', email: 'nathalia@example.com', cpf: '666.777.888-99' },
        { id: 11, username: 'walisson', password: 'intern123', name: 'Walisson', role: 'intern', address: 'Av. G, 404', institution: 'Faculdade Particular', graduationPeriod: '6º Semestre', education: 'Fonoaudiologia', discipline: 'Linguagem', phone: '(21) 97777-7777', email: 'walisson@example.com', cpf: '777.888.999-00' },
        { id: 12, username: 'tatiana', password: 'intern123', name: 'Tatiana', role: 'intern', address: 'Rua H, 505', institution: 'Universidade Estadual', graduationPeriod: '8º Semestre', education: 'Psicologia', discipline: 'Saúde Mental', phone: '(21) 98888-8888', email: 'tatiana@example.com', cpf: '888.999.000-11' },
        { id: 13, username: 'luiz', password: 'intern123', name: 'Luiz', role: 'intern', address: 'Alameda I, 606', institution: 'Universidade Federal', graduationPeriod: '5º Semestre', education: 'Psicologia', discipline: 'Avaliação Psicológica', phone: '(21) 99999-9999', email: 'luiz@example.com', cpf: '999.000.111-22' },
        { id: 14, username: 'pedro', password: 'intern123', name: 'Pedro', role: 'intern', address: 'Rua J, 707', institution: 'Centro Universitário', graduationPeriod: '7º Semestre', education: 'Psicologia', discipline: 'Neuropsicologia Adulto', phone: '(21) 90000-0000', email: 'pedro@example.com', cpf: '000.111.222-33' },
        { id: 15, username: 'pedro_alexandre', password: 'intern123', name: 'Pedro Alexandre Carneiro', role: 'intern', address: 'Rua Perdoes 781', institution: 'PUC Minas coração eucarístico', graduationPeriod: '4°', education: 'Psicologia', discipline: 'Neuropsicologia Adulto', phone: '(31)992384630', email: 'pedrinalex@gmail.com', cpf: '018.582.366-14' },
        { id: 16, username: 'wallisson', password: 'intern123', name: 'Wallisson Henrique Santos', role: 'intern', address: 'Rua Higienópolis, 137, Piratininga. Ibirité', institution: 'Pós graduação - Fumec', graduationPeriod: 'N/A', education: 'Psicólogo', discipline: 'N/A', phone: '99889-7105 / 98693-3477', email: 'wallissonpsicologo@gmail.com', cpf: '011.922.196-12' },
        { id: 20, username: 'renata_cantagalli', password: 'intern123', name: 'Renata Grichtolik Cantagalli Paiva', role: 'intern', address: 'Rua Bibliotecários, Bairro Alipio de Melo, BH/MG - 30840-070', institution: 'IESLA', graduationPeriod: 'Pós-Graduação / último semestre', education: '08/2025', discipline: 'N/A', phone: '(31) 98598-7608', email: 'renatacantagalli@gmail.com', cpf: '06050524688' },
        // NEW INTERN
        { id: 21, username: 'tatiana_souto', password: 'intern123', name: 'Tatiana Souto da Silveira', role: 'intern', address: 'Rua Gasparino Carvalho Silva, 63 - APTO 402 - Paquetá', institution: 'IESLA', graduationPeriod: '8', education: '07/2026', discipline: 'N/A', phone: '(31) 98742-9615', email: 'tatyssilveira1920@gmail.com', cpf: '057.454.456-96' }
    ],
    anamnesisTypes: [
        ...Array.from({length: 40}, (_, i) => ({ id: `anamnese-${i+1}`, name: `Anamnese ${i+1}` }))
    ],
    stockItems: [],
    stockMovements: [],
    nextClientId: 1,
    nextAppointmentId: 1,
    nextScheduleId: 1,
    nextNoteId: 1,
    nextChangeId: 1,
    nextDocumentId: 1,
    nextStockItemId: 1,
    nextMovementId: 1,
    nextUserId: 22, // Initialize with the next available ID after the hardcoded ones
    nextDailyNoteId: 1, // New ID counter for daily notes
    nextGeneralDocumentId: 1 // New ID counter for general documents
};

export async function saveDb() {
    try {
        // Salvar clientes
        if (db.clients.length > 0) {
            for (const client of db.clients) {
                await supabaseUtils.insert('clients', {
                    id: client.id,
                    type: client.type,
                    name: client.name,
                    birth_date: client.birthDate,
                    gender: client.gender,
                    email: client.email,
                    phone: client.phone,
                    cpf: client.cpf,
                    rg: client.rg,
                    naturalidade: client.naturalidade,
                    estado_civil: client.estadoCivil,
                    escolaridade: client.escolaridade,
                    profissao: client.profissao,
                    contato_emergencia: client.contatoEmergencia,
                    escola: client.escola,
                    tipo_escola: client.tipoEscola,
                    ano_escolar: client.anoEscolar,
                    nome_pai: client.nomePai,
                    idade_pai: client.idadePai,
                    profissao_pai: client.profissaoPai,
                    telefone_pai: client.telefonePai,
                    nome_mae: client.nomeMae,
                    idade_mae: client.idadeMae,
                    profissao_mae: client.profissaoMae,
                    telefone_mae: client.telefoneMae,
                    responsavel_financeiro: client.responsavelFinanceiro,
                    outro_responsavel: client.outroResponsavel,
                    cep: client.cep,
                    address: client.address,
                    number: client.number,
                    complement: client.complement,
                    neighborhood: client.neighborhood,
                    city: client.city,
                    state: client.state,
                    observations: client.observations
                });
            }
        }

        // Salvar agendamentos
        if (db.schedules.length > 0) {
            for (const schedule of db.schedules) {
                await supabaseUtils.insert('schedules', {
                    id: schedule.id,
                    client_id: schedule.clientId,
                    date: schedule.date,
                    time: schedule.time,
                    service_type: schedule.serviceType,
                    status: schedule.status,
                    assigned_to_user_id: schedule.assignedToUserId,
                    assigned_to_user_name: schedule.assignedToUserName,
                    observations: schedule.observations,
                    cancel_reason: schedule.cancelReason,
                    cancel_date: schedule.cancelDate,
                    canceled_by: schedule.canceledBy,
                    cancel_image: schedule.cancelImage
                });
            }
        }

        // Salvar atendimentos
        if (db.appointments.length > 0) {
            for (const appointment of db.appointments) {
                await supabaseUtils.insert('appointments', {
                    id: appointment.id,
                    client_id: appointment.clientId,
                    schedule_id: appointment.scheduleId,
                    date: appointment.date,
                    anamnesis_type_id: appointment.anamnesisTypeId,
                    attended_by: appointment.attendedBy,
                    intern_id: appointment.internId,
                    notes: appointment.notes,
                    value: appointment.value,
                    materials_used: JSON.stringify(appointment.materialsUsed || [])
                });
            }
        }

        // Salvar movimentações de estoque
        if (db.stockMovements.length > 0) {
            for (const movement of db.stockMovements) {
                await supabaseUtils.insert('stock_movements', {
                    id: movement.id,
                    item_id: movement.itemId,
                    type: movement.type,
                    quantity: movement.quantity,
                    item_unit_value: movement.itemUnitValue,
                    reason: movement.reason,
                    date: movement.date,
                    performed_by: movement.performedBy
                });
            }
        }

        // Salvar itens de estoque
        if (db.stockItems.length > 0) {
            for (const item of db.stockItems) {
                await supabaseUtils.insert('stock_items', {
                    id: item.id,
                    name: item.name,
                    category: item.category,
                    quantity: item.quantity,
                    min_stock: item.minStock,
                    unit: item.unit,
                    description: item.description,
                    unit_value: item.unitValue
                });
            }
        }

        // Salvar notas diárias
        if (db.dailyNotes.length > 0) {
            for (const note of db.dailyNotes) {
                await supabaseUtils.insert('daily_notes', {
                    id: note.id,
                    date: note.date,
                    title: note.title,
                    type: note.type,
                    value: note.value,
                    content: note.content,
                    file_name: note.fileName,
                    file_data: note.fileData,
                    created_by: note.createdBy
                });
            }
        }

        // Salvar usuários
        if (db.users.length > 0) {
            for (const user of db.users) {
                await supabaseUtils.insert('users', {
                    id: user.id,
                    username: user.username,
                    password: user.password,
                    name: user.name,
                    role: user.role,
                    email: user.email,
                    phone: user.phone,
                    cpf: user.cpf,
                    address: user.address,
                    institution: user.institution,
                    graduation_period: user.graduationPeriod,
                    education: user.education,
                    discipline: user.discipline,
                    change_history: JSON.stringify(user.changeHistory || [])
                });
            }
        }

        console.log('Dados salvos no Supabase com sucesso');
    } catch (error) {
        console.error('Erro ao salvar no Supabase:', error);
    }
}

export async function loadDb() {
    try {
        // Carregar clientes do Supabase
        const { data: clients, error: clientsError } = await supabaseUtils.select('clients');
        if (!clientsError && clients) {
            db.clients = clients.map(client => ({
                id: client.id,
                type: client.type,
                name: client.name,
                birthDate: client.birth_date,
                gender: client.gender,
                email: client.email,
                phone: client.phone,
                cpf: client.cpf,
                rg: client.rg,
                naturalidade: client.naturalidade,
                estadoCivil: client.estado_civil,
                escolaridade: client.escolaridade,
                profissao: client.profissao,
                contatoEmergencia: client.contato_emergencia,
                escola: client.escola,
                tipoEscola: client.tipo_escola,
                anoEscolar: client.ano_escolar,
                nomePai: client.nome_pai,
                idadePai: client.idade_pai,
                profissaoPai: client.profissao_pai,
                telefonePai: client.telefone_pai,
                nomeMae: client.nome_mae,
                idadeMae: client.idade_mae,
                profissaoMae: client.profissao_mae,
                telefoneMae: client.telefone_mae,
                responsavelFinanceiro: client.responsavel_financeiro,
                outroResponsavel: client.outro_responsavel,
                cep: client.cep,
                address: client.address,
                number: client.number,
                complement: client.complement,
                neighborhood: client.neighborhood,
                city: client.city,
                state: client.state,
                observations: client.observations,
                appointments: [],
                notes: [],
                documents: []
            }));
        }

        // Carregar agendamentos do Supabase
        const { data: schedules, error: schedulesError } = await supabaseUtils.select('schedules');
        if (!schedulesError && schedules) {
            db.schedules = schedules.map(schedule => ({
                id: schedule.id,
                clientId: schedule.client_id,
                date: schedule.date,
                time: schedule.time,
                serviceType: schedule.service_type,
                status: schedule.status,
                assignedToUserId: schedule.assigned_to_user_id,
                assignedToUserName: schedule.assigned_to_user_name,
                observations: schedule.observations,
                cancelReason: schedule.cancel_reason,
                cancelDate: schedule.cancel_date,
                canceledBy: schedule.canceled_by,
                cancelImage: schedule.cancel_image
            }));
        } else {
            db.schedules = [];
        }

        // Carregar atendimentos do Supabase
        const { data: appointments, error: appointmentsError } = await supabaseUtils.select('appointments');
        if (!appointmentsError && appointments) {
            db.appointments = appointments.map(appointment => ({
                id: appointment.id,
                clientId: appointment.client_id,
                scheduleId: appointment.schedule_id,
                date: appointment.date,
                anamnesisTypeId: appointment.anamnesis_type_id,
                attendedBy: appointment.attended_by,
                internId: appointment.intern_id,
                notes: appointment.notes,
                value: appointment.value,
                materialsUsed: appointment.materials_used ? JSON.parse(appointment.materials_used) : []
            }));
        } else {
            db.appointments = [];
        }

        // Carregar itens de estoque do Supabase
        const { data: stockItems, error: stockItemsError } = await supabaseUtils.select('stock_items');
        if (!stockItemsError && stockItems) {
            db.stockItems = stockItems.map(item => ({
                id: item.id,
                name: item.name,
                category: item.category,
                quantity: item.quantity,
                minStock: item.min_stock,
                unit: item.unit,
                description: item.description,
                unitValue: item.unit_value
            }));
        } else {
            // Se não tem itens no Supabase, criar os itens de exemplo
            const sampleStockItems = [
                { id: 1, name: 'Lápis HB', category: 'papelaria', quantity: 50, minStock: 10, unit: 'unidade', description: 'Lápis para desenhos e escrita', unitValue: 1.50 },
                { id: 2, name: 'Papel A4', category: 'papelaria', quantity: 25, minStock: 5, unit: 'resma', description: 'Papel branco para impressão', unitValue: 20.00 },
                { id: 3, name: 'Teste WISC-IV', category: 'testes', quantity: 3, minStock: 1, unit: 'kit', description: 'Escala de Inteligência Wechsler para Crianças', unitValue: 800.00 },
                { id: 4, name: 'Blocos de Madeira', category: 'brinquedos', quantity: 8, minStock: 2, unit: 'caixa', description: 'Blocos coloridos para atividades lúdicas', unitValue: 45.00 },
                { id: 5, name: 'Quebra-cabeça 100 peças', category: 'jogos', quantity: 15, minStock: 3, unit: 'pacote', description: 'Quebra-cabeças diversos temas', unitValue: 30.00 }
            ];
            db.stockItems = sampleStockItems;
        }

        // Carregar movimentações de estoque do Supabase
        const { data: stockMovements, error: stockMovementsError } = await supabaseUtils.select('stock_movements');
        if (!stockMovementsError && stockMovements) {
            db.stockMovements = stockMovements.map(movement => ({
                id: movement.id,
                itemId: movement.item_id,
                type: movement.type,
                quantity: movement.quantity,
                itemUnitValue: movement.item_unit_value,
                reason: movement.reason,
                date: movement.date,
                performedBy: movement.performed_by
            }));
        } else {
            db.stockMovements = [];
        }

        // Carregar notas diárias do Supabase
        const { data: dailyNotes, error: dailyNotesError } = await supabaseUtils.select('daily_notes');
        if (!dailyNotesError && dailyNotes) {
            db.dailyNotes = dailyNotes.map(note => ({
                id: note.id,
                date: note.date,
                title: note.title,
                type: note.type,
                value: note.value,
                content: note.content,
                fileName: note.file_name,
                fileData: note.file_data,
                createdBy: note.created_by,
                createdAt: note.created_at
            }));
        } else {
            db.dailyNotes = [];
        }

        // Carregar usuários do Supabase
        const { data: supabaseUsers, error: usersError } = await supabaseUtils.select('users');
        if (!usersError && supabaseUsers) {
            // Mesclar usuários do Supabase com os usuários hardcoded
            const hardcodedUsers = db.users;
            const dynamicUsers = supabaseUsers.map(user => ({
                id: user.id,
                username: user.username,
                password: user.password,
                name: user.name,
                role: user.role,
                email: user.email,
                phone: user.phone,
                cpf: user.cpf,
                address: user.address,
                institution: user.institution,
                graduationPeriod: user.graduation_period,
                education: user.education,
                discipline: user.discipline,
                changeHistory: user.change_history ? JSON.parse(user.change_history) : []
            }));

            // Combinar usuários, priorizando os do Supabase se houver conflito de ID
            const userMap = new Map();
            hardcodedUsers.forEach(user => userMap.set(user.id, user));
            dynamicUsers.forEach(user => userMap.set(user.id, user));
            db.users = Array.from(userMap.values());
        }

        // Inicializar arrays vazios se necessário
        if (!db.generalDocuments) db.generalDocuments = [];

        // Atualizar contadores baseados nos dados carregados
        db.nextClientId = db.clients.length > 0 ? Math.max(...db.clients.map(c => c.id)) + 1 : 1;
        db.nextAppointmentId = db.appointments.length > 0 ? Math.max(...db.appointments.map(a => a.id)) + 1 : 1;
        db.nextScheduleId = db.schedules.length > 0 ? Math.max(...db.schedules.map(s => s.id)) + 1 : 1;
        db.nextStockItemId = db.stockItems.length > 0 ? Math.max(...db.stockItems.map(i => i.id)) + 1 : 6;
        db.nextMovementId = db.stockMovements.length > 0 ? Math.max(...db.stockMovements.map(m => m.id)) + 1 : 1;
        db.nextDailyNoteId = db.dailyNotes.length > 0 ? Math.max(...db.dailyNotes.map(n => n.id)) + 1 : 1;
        db.nextUserId = db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 22;

        console.log('Dados carregados do Supabase com sucesso');
    } catch (error) {
        console.error('Erro ao carregar do Supabase:', error);
        // Em caso de erro, manter dados padrão
        db.clients = [];
        db.appointments = [];
        db.schedules = [];
        db.dailyNotes = [];
        db.stockMovements = [];
        if (!db.stockItems || db.stockItems.length === 0) {
            const sampleStockItems = [
                { id: 1, name: 'Lápis HB', category: 'papelaria', quantity: 50, minStock: 10, unit: 'unidade', description: 'Lápis para desenhos e escrita', unitValue: 1.50 },
                { id: 2, name: 'Papel A4', category: 'papelaria', quantity: 25, minStock: 5, unit: 'resma', description: 'Papel branco para impressão', unitValue: 20.00 },
                { id: 3, name: 'Teste WISC-IV', category: 'testes', quantity: 3, minStock: 1, unit: 'kit', description: 'Escala de Inteligência Wechsler para Crianças', unitValue: 800.00 },
                { id: 4, name: 'Blocos de Madeira', category: 'brinquedos', quantity: 8, minStock: 2, unit: 'caixa', description: 'Blocos coloridos para atividades lúdicas', unitValue: 45.00 },
                { id: 5, name: 'Quebra-cabeça 100 peças', category: 'jogos', quantity: 15, minStock: 3, unit: 'pacote', description: 'Quebra-cabeças diversos temas', unitValue: 30.00 }
            ];
            db.stockItems = sampleStockItems;
        }
    }
}