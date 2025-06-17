const listaMidias = [
    {
        nome: "Vingadores", tipo: "filme", imagem: "https://image.tmdb.org/t/p/original/7jvlqGsxeMKscskuUZgKk0Kuv99.jpg",
        genero: "Ação", ano: 2019, duracao: "3h 2min", avaliacao: 4.8, comentarios: []
    },
    {
        nome: "Stranger Things", tipo: "serie", imagem: "https://es.web.img3.acsta.net/c_210_280/pictures/17/08/31/23/41/560893.jpg",
        genero: "Ficção", ano: 2016, duracao: "4 temporadas", avaliacao: 4.5, comentarios: []
    },
    {
        nome: "Homem-Aranha", tipo: "filme", imagem: "https://br.web.img3.acsta.net/r_1920_1080/medias/nmedia/18/89/74/47/20122663.jpg",
        genero: "Ação", ano: 2002, duracao: "2h 1min", avaliacao: 4.2, comentarios: []
    }
];

let usuarioLogado = null;

function Tela(tela) {
    document.getElementById('home').style.display = tela === 'home' ? 'block' : 'none';
    document.getElementById('area').style.display = tela === 'area' ? 'block' : 'none';
    document.getElementById('resultado').innerHTML = '';
}

function buscar() {
    const textoBusca = document.getElementById('inputBusca').value.toLowerCase();
    const filtro = document.getElementById('filtroTipo').value;

    const resultado = listaMidias.filter(item => {
        const correspondeTexto = item.nome.toLowerCase().includes(textoBusca);
        const correspondeTipo = filtro === "todos" || item.tipo === filtro;
        return correspondeTexto && correspondeTipo;
    });

    mostrarResultado(resultado);
}

function limparBusca() {
    document.getElementById('inputBusca').value = '';
    document.getElementById('filtroTipo').value = 'todos';
    mostrarResultado(listaMidias);
}

function mostrarResultado(lista) {
    const divResultado = document.getElementById('resultado');
    divResultado.innerHTML = '';

    lista.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <h3>${item.nome}</h3>
            <p>${item.tipo === 'filme' ? 'Filme' : 'Série'}</p>
        `;

        if (usuarioLogado === 'cinematografista') {
            card.innerHTML += `
                <button onclick="editarMidia('${item.nome}')">Editar</button>
                <button onclick="excluirMidia('${item.nome}')">Excluir</button>
            `;
        } else {
            card.innerHTML += `
                <button onclick="abrirModal(listaMidias.find(m => m.nome === '${item.nome}'))">Detalhes</button>
            `;
        }

        divResultado.appendChild(card);
    });
}

function abrirModal(item) {
    const modal = document.getElementById('modalDetalhes');
    const conteudo = document.getElementById('conteudoModal');

    let estrelas = '⭐'.repeat(Math.round(item.avaliacao));
    let comentariosHTML = item.comentarios.map(c => `<p>- ${c}</p>`).join('');

    conteudo.innerHTML = `
        <h2>${item.nome}</h2>
        <img src="${item.imagem}" width="100%">
        <p><strong>Gênero:</strong> ${item.genero}</p>
        <p><strong>Ano:</strong> ${item.ano}</p>
        <p><strong>Duração:</strong> ${item.duracao}</p>
        <p><strong>Avaliação:</strong> ${estrelas} (${item.avaliacao})</p>

        <h3>Comentários</h3>
        ${comentariosHTML || "<p>Sem comentários ainda.</p>"}

        <input type="text" id="novoComentario" placeholder="Escreva um comentário">
        <button onclick="adicionarComentario('${item.nome}')">Comentar</button>
    `;

    modal.style.display = 'block';
}

function fecharModal() {
    document.getElementById('modalDetalhes').style.display = 'none';
}

function adicionarComentario(nome) {
    const comentario = document.getElementById('novoComentario').value.trim();
    if (comentario === '') return;

    const item = listaMidias.find(m => m.nome === nome);
    item.comentarios.push(comentario);
    abrirModal(item);
}

function login() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const tipo = document.getElementById('tipoUsuario').value;

    if (usuario && senha) {
        usuarioLogado = tipo;
        alert(`Logado como ${tipo}`);
        document.getElementById('loginForm').style.display = 'none';

        if (usuarioLogado === 'cinematografista') {
            document.getElementById('areaCinematografista').style.display = 'block';
        }

        Tela('home');
        mostrarResultado(listaMidias);
    } else {
        alert('Preencha usuário e senha');
    }
}

function editarMidia(nome) {
    const item = listaMidias.find(m => m.nome === nome);
    if (!item) return;

    item.nome = prompt('Nome:', item.nome) || item.nome;
    item.genero = prompt('Gênero:', item.genero) || item.genero;
    item.ano = prompt('Ano:', item.ano) || item.ano;
    item.duracao = prompt('Duração:', item.duracao) || item.duracao;
    item.avaliacao = Number(prompt('Avaliação de 1 a 5:', item.avaliacao)) || item.avaliacao;
    item.imagem = prompt('URL da imagem:', item.imagem) || item.imagem;

    mostrarResultado(listaMidias);
}

function excluirMidia(nome) {
    const confirmar = confirm(`Deseja excluir ${nome}?`);
    if (confirmar) {
        const index = listaMidias.findIndex(m => m.nome === nome);
        listaMidias.splice(index, 1);
        mostrarResultado(listaMidias);
    }
}

function cadastrarMidia() {
    const nome = document.getElementById('novoNome').value;
    const genero = document.getElementById('novoGenero').value;
    const ano = document.getElementById('novoAno').value;
    const duracao = document.getElementById('novaDuracao').value;
    const avaliacao = Number(document.getElementById('novaAvaliacao').value);
    const imagem = document.getElementById('novaImagem').value;
    const tipo = document.getElementById('novoTipo').value;

    if (nome && genero && ano && duracao && avaliacao && imagem) {
        listaMidias.push({
            nome, tipo, genero, ano, duracao, avaliacao, imagem, comentarios: []
        });
        mostrarResultado(listaMidias);

        document.getElementById('novoNome').value = '';
        document.getElementById('novoGenero').value = '';
        document.getElementById('novoAno').value = '';
        document.getElementById('novaDuracao').value = '';
        document.getElementById('novaAvaliacao').value = '';
        document.getElementById('novaImagem').value = '';
        document.getElementById('novoTipo').value = 'filme';
    } else {
        alert('Preencha todos os campos!');
    }
}