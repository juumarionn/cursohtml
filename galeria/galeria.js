let filmes = [
  { nome: "Vingadores: Ultimato", genero: "Ação", avaliacao: 4.7, descricao: "Uma batalha épica dos heróis.", imagem: "https://ovicio.com.br/wp-content/uploads/2019/03/20190314-avengers-endgame-poster.jpg" },
  { nome: "A Vida é Bela", genero: "Drama", avaliacao: 4.8, descricao: "Um emocionante drama familiar.", imagem: "https://upload.wikimedia.org/wikipedia/pt/thumb/8/8e/La_vita_%C3%A8_bella.jpg/220px-La_vita_%C3%A8_bella.jpg" },
  { nome: "Deadpool", genero: "Comédia", avaliacao: 4.2, descricao: "Comédia irreverente e cheia de ação.", imagem: "https://upload.wikimedia.org/wikipedia/pt/0/09/Deadpool_poster.jpg" },
  { nome: "Clube da Luta", genero: "Drama", avaliacao: 4.3, descricao: "Um olhar sombrio sobre a vida moderna.", imagem: "https://upload.wikimedia.org/wikipedia/pt/thumb/8/89/Clube_da_Luta_p%C3%B4ster.jpg/220px-Clube_da_Luta_p%C3%B4ster.jpg" }
];

let usuarioLogado = false;

// Carrega filmes do localStorage se existir
function carregarFilmesStorage() {
  const filmesStorage = localStorage.getItem("filmes");
  if (filmesStorage) {
    filmes = JSON.parse(filmesStorage);
  }
}

function salvarFilmesStorage() {
  localStorage.setItem("filmes", JSON.stringify(filmes));
}

function corAvaliacao(av) {
  if (av > 4) return "verde";
  if (av > 2) return "laranja";
  return "vermelho";
}

function mostrarFilmes(lista) {
  $("#galeria").empty();
  lista.forEach((f, index) => {
    let botoes;
    if (usuarioLogado) {
      botoes = `
        <button class="editar-filme" data-index="${index}">Editar</button>
        <button class="excluir-filme" data-index="${index}">Excluir</button>
      `;
    } else {
      botoes = `<button class="ver-detalhes" data-nome="${f.nome}">Ver Detalhes</button>`;
    }
    $("#galeria").append(`
      <div class="filme-box">
        <img src="${f.imagem}" alt="${f.nome}">
        <h3>${f.nome}</h3>
        <p><strong>Gênero:</strong> ${f.genero}</p>
        <p><strong>Avaliação:</strong> <span class="avaliacao ${corAvaliacao(f.avaliacao)}">${f.avaliacao.toFixed(1)}</span></p>
        ${botoes}
      </div>
    `);
  });
}

function carregarCarrossel() {
  $("#carrossel").empty();
  filmes.slice(-5).forEach(f => {
    const img = $(`<img src="${f.imagem}" alt="${f.nome}">`);
    img.click(function() {
      $(".carrossel img").removeClass("selecionado");
      $(this).addClass("selecionado");
    });
    $("#carrossel").append(img);
  });
}

function mostrarTelaHome() {
  $("#homePage").show();
  $("#loginPage").hide();
  $("#addMoviePage").hide();

  if(usuarioLogado) {
    $("#carrosselContainer").addClass("oculto");
    $("#btnAdicionarFilme").show();
    $("#linkLogin").hide();
    $("#linkLogout").show();
    $("#linkHome").hide();
  } else {
    $("#carrosselContainer").removeClass("oculto");
    $("#btnAdicionarFilme").hide();
    $("#linkLogin").show();
    $("#linkLogout").hide();
    $("#linkHome").hide();
  }
  mostrarFilmes(filmes);
  carregarCarrossel();
}

function mostrarTelaLogin() {
  $("#homePage").hide();
  $("#loginPage").show();
  $("#addMoviePage").hide();
  $("#linkHome").show();
  $("#linkLogin").hide();
  $("#linkLogout").hide();
}

function mostrarTelaAddFilme() {
  $("#homePage").hide();
  $("#loginPage").hide();
  $("#addMoviePage").show();
  $("#linkHome").show();
  $("#linkLogin").hide();
  $("#linkLogout").hide();
}

$(document).ready(function () {
  carregarFilmesStorage();
  mostrarTelaHome();

  // Scroll carrossel
  $(".carrossel-btn.left").click(() => {
    $("#carrossel").animate({ scrollLeft: "-=320" }, 400);
  });
  $(".carrossel-btn.right").click(() => {
    $("#carrossel").animate({ scrollLeft: "+=320" }, 400);
  });

  // Filtrar filmes
  $("#filtrarBtn").click(() => {
    const termo = $("#pesquisa").val().toLowerCase();
    const genero = $("#genero").val();
    const filtrados = filmes.filter(f =>
      f.nome.toLowerCase().includes(termo) &&
      (genero === "" || f.genero === genero)
    );
    mostrarFilmes(filtrados);
  });

  // Limpar filtros
  $("#limparBtn").click(() => {
    $("#pesquisa").val("");
    $("#genero").val("");
    mostrarFilmes(filmes);
  });

  // Filtrar em tempo real ao digitar
  $("#pesquisa").on("input", () => {
    $("#filtrarBtn").click();
  });

  // Ver detalhes do filme (popup)
  $(document).on("click", ".ver-detalhes", function () {
    const nome = $(this).data("nome");
    const f = filmes.find(f => f.nome === nome);
    if(f) {
      $("#detalhesConteudo").html(`
        <h2>${f.nome}</h2>
        <p><strong>Gênero:</strong> ${f.genero}</p>
        <p><strong>Avaliação:</strong> ${f.avaliacao.toFixed(1)}</p>
        <p><strong>Descrição:</strong> ${f.descricao}</p>
        <img src="${f.imagem}" alt="${f.nome}" />
      `);
      $("#popupDetalhes").fadeIn();
    }
  });

  // Fechar popup detalhes
  $("#popupDetalhes .close-btn").click(() => {
    $("#popupDetalhes").fadeOut();
  });

  // Botão Login
  $("#linkLogin").click(() => {
    mostrarTelaLogin();
  });

  // Botão Logout
  $("#linkLogout").click(() => {
    usuarioLogado = false;
    localStorage.removeItem("usuarioLogado");
    mostrarTelaHome();
  });

  // Botão Home
  $("#linkHome").click(() => {
    mostrarTelaHome();
  });

  // Login (simples)
  $("#formLogin").submit(function (e) {
    e.preventDefault();
    const usuario = $("#usuarioLogin").val().trim();
    const senha = $("#senhaLogin").val().trim();

    // Simples validação fixa para exemplo
    if (usuario === "admin" && senha === "1234") {
      usuarioLogado = true;
      localStorage.setItem("usuarioLogado", "true");
      mostrarTelaHome();
      alert("Login realizado com sucesso!");
    } else {
      alert("Usuário ou senha incorretos.");
    }
  });

  // Checar se usuário estava logado (localStorage)
  if(localStorage.getItem("usuarioLogado") === "true") {
    usuarioLogado = true;
    mostrarTelaHome();
  }

  // Botão para abrir tela adicionar filme
  $("#btnAdicionarFilme").click(() => {
    mostrarTelaAddFilme();
  });

  // Adicionar filme
  $("#formAdicionarFilme").submit(function (e) {
    e.preventDefault();

    const novoFilme = {
      nome: $("#nomeFilme").val().trim(),
      genero: $("#generoFilme").val(),
      avaliacao: parseFloat($("#avaliacaoFilme").val()),
      descricao: $("#descricaoFilme").val().trim(),
      imagem: $("#imagemFilme").val().trim()
    };

    filmes.push(novoFilme);
    salvarFilmesStorage();

    // Limpar form
    this.reset();

    alert("Filme adicionado!");
    mostrarTelaHome();
  });

  // Excluir filme
  $(document).on("click", ".excluir-filme", function() {
    const idx = $(this).data("index");
    if (confirm(`Tem certeza que deseja excluir o filme "${filmes[idx].nome}"?`)) {
      filmes.splice(idx, 1);
      salvarFilmesStorage();
      mostrarFilmes(filmes);
      carregarCarrossel();
    }
  });

  // Editar filme - abrir popup com dados
  $(document).on("click", ".editar-filme", function() {
    const idx = $(this).data("index");
    const f = filmes[idx];
    if (!f) return;

    $("#formEditarFilme").data("index", idx);
    $("#editarNomeFilme").val(f.nome);
    $("#editarGeneroFilme").val(f.genero);
    $("#editarAvaliacaoFilme").val(f.avaliacao);
    $("#editarDescricaoFilme").val(f.descricao);
    $("#editarImagemFilme").val(f.imagem);

    $("#popupEditar").fadeIn();
  });

  // Fechar popup editar
  $("#fecharEditar").click(() => {
    $("#popupEditar").fadeOut();
  });

  // Salvar edição filme
  $("#formEditarFilme").submit(function(e) {
    e.preventDefault();
    const idx = $(this).data("index");
    if (idx === undefined) return;

    filmes[idx] = {
      nome: $("#editarNomeFilme").val().trim(),
      genero: $("#editarGeneroFilme").val(),
      avaliacao: parseFloat($("#editarAvaliacaoFilme").val()),
      descricao: $("#editarDescricaoFilme").val().trim(),
      imagem: $("#editarImagemFilme").val().trim()
    };

    salvarFilmesStorage();
    mostrarFilmes(filmes);
    carregarCarrossel();
    $("#popupEditar").fadeOut();
  });
});