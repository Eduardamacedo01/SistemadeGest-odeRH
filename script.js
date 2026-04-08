// script.js - Lógica JavaScript para o Sistema de Gestão de RH PsicWork

// Dados mock para armazenar funcionários, cargos e departamentos
let funcionarios = [
    { id: 1, nome: 'João Silva', cpf: '123.456.789-00', cargo: 'Analista de RH', departamento: 'Recursos Humanos', salario: 3500.00, dataAdmissao: '2023-01-15' },
    { id: 2, nome: 'Maria Santos', cpf: '987.654.321-00', cargo: 'Desenvolvedor', departamento: 'TI', salario: 4500.00, dataAdmissao: '2022-08-20' },
    { id: 3, nome: 'Pedro Oliveira', cpf: '456.789.123-00', cargo: 'Designer', departamento: 'Marketing', salario: 3200.00, dataAdmissao: '2023-03-10' }
];

let cargos = ['Analista de RH', 'Desenvolvedor', 'Designer', 'Gerente', 'Assistente Administrativo'];
let departamentos = ['Recursos Humanos', 'TI', 'Marketing', 'Financeiro', 'Operacional'];

let proximoId = 4;

// Elementos DOM
const funcionariosTable = document.getElementById('funcionariosTable');
const searchInput = document.getElementById('searchInput');
const modalFuncionario = new bootstrap.Modal(document.getElementById('modalFuncionario'));
const formFuncionario = document.getElementById('formFuncionario');
const modalTitle = document.getElementById('modalTitle');
const btnSalvar = document.getElementById('btnSalvar');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    atualizarDashboard();
    renderizarFuncionarios();
    popularSelects();
    configurarEventos();
});

// Atualizar indicadores do dashboard
function atualizarDashboard() {
    const totalFuncionarios = funcionarios.length;
    const novosContratados = funcionarios.filter(f => new Date(f.dataAdmissao) > new Date('2024-01-01')).length;
    const totalDepartamentos = new Set(funcionarios.map(f => f.departamento)).size;

    document.getElementById('totalFuncionarios').textContent = totalFuncionarios;
    document.getElementById('novosContratados').textContent = novosContratados;
    document.getElementById('totalDepartamentos').textContent = totalDepartamentos;
}

// Renderizar tabela de funcionários
function renderizarFuncionarios(filtrados = null) {
    const lista = filtrados || funcionarios;
    const tbody = funcionariosTable.querySelector('tbody');
    tbody.innerHTML = '';

    lista.forEach(func => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${func.id}</td>
            <td>${func.nome}</td>
            <td>${func.cpf}</td>
            <td>${func.cargo}</td>
            <td>${func.departamento}</td>
            <td>R$ ${func.salario.toFixed(2)}</td>
            <td>${formatarData(func.dataAdmissao)}</td>
            <td>
                <button class="btn btn-warning btn-sm me-2" onclick="editarFuncionario(${func.id})">
                    <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="btn btn-danger btn-sm" onclick="excluirFuncionario(${func.id})">
                    <i class="bi bi-trash"></i> Excluir
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Popular selects de cargo e departamento
function popularSelects() {
    const selectCargo = document.getElementById('cargo');
    const selectDepartamento = document.getElementById('departamento');

    cargos.forEach(cargo => {
        const option = document.createElement('option');
        option.value = cargo;
        option.textContent = cargo;
        selectCargo.appendChild(option);
    });

    departamentos.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        selectDepartamento.appendChild(option);
    });
}

// Configurar eventos
function configurarEventos() {
    // Busca
    searchInput.addEventListener('input', function() {
        const termo = this.value.toLowerCase();
        const filtrados = funcionarios.filter(func =>
            func.nome.toLowerCase().includes(termo) ||
            func.cargo.toLowerCase().includes(termo) ||
            func.departamento.toLowerCase().includes(termo)
        );
        renderizarFuncionarios(filtrados);
    });

    // Formulário
    formFuncionario.addEventListener('submit', salvarFuncionario);

    // Botão novo funcionário
    document.getElementById('btnNovoFuncionario').addEventListener('click', novoFuncionario);
}

// Novo funcionário
function novoFuncionario() {
    formFuncionario.reset();
    document.getElementById('funcionarioId').value = '';
    modalTitle.textContent = 'Cadastrar Funcionário';
    btnSalvar.innerHTML = '<i class="bi bi-check-lg"></i> Salvar';
    modalFuncionario.show();
}

// Editar funcionário
function editarFuncionario(id) {
    const func = funcionarios.find(f => f.id === id);
    if (func) {
        document.getElementById('funcionarioId').value = func.id;
        document.getElementById('nome').value = func.nome;
        document.getElementById('cpf').value = func.cpf;
        document.getElementById('cargo').value = func.cargo;
        document.getElementById('departamento').value = func.departamento;
        document.getElementById('salario').value = func.salario;
        document.getElementById('dataAdmissao').value = func.dataAdmissao;
        modalTitle.textContent = 'Editar Funcionário';
        btnSalvar.innerHTML = '<i class="bi bi-check-lg"></i> Atualizar';
        modalFuncionario.show();
    }
}

// Salvar funcionário
function salvarFuncionario(e) {
    e.preventDefault();

    const id = document.getElementById('funcionarioId').value;
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const cargo = document.getElementById('cargo').value;
    const departamento = document.getElementById('departamento').value;
    const salario = parseFloat(document.getElementById('salario').value);
    const dataAdmissao = document.getElementById('dataAdmissao').value;

    // Validação básica
    if (!nome || !cpf || !cargo || !departamento || !salario || !dataAdmissao) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    if (salario <= 0) {
        alert('O salário deve ser maior que zero.');
        return;
    }

    if (id) {
        // Editar
        const index = funcionarios.findIndex(f => f.id == id);
        if (index !== -1) {
            funcionarios[index] = { id: parseInt(id), nome, cpf, cargo, departamento, salario, dataAdmissao };
        }
    } else {
        // Novo
        const novoFunc = { id: proximoId++, nome, cpf, cargo, departamento, salario, dataAdmissao };
        funcionarios.push(novoFunc);
    }

    atualizarDashboard();
    renderizarFuncionarios();
    modalFuncionario.hide();
}

// Excluir funcionário
function excluirFuncionario(id) {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
        funcionarios = funcionarios.filter(f => f.id !== id);
        atualizarDashboard();
        renderizarFuncionarios();
    }
}

// Formatar data
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// Navegação entre seções
function mostrarSecao(secao) {
    // Esconder todas as seções
    document.querySelectorAll('.secao').forEach(s => s.style.display = 'none');

    // Mostrar seção selecionada
    document.getElementById(secao).style.display = 'block';

    // Atualizar navegação ativa
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
}