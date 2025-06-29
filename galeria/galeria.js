  let filmes = [
    { nome: "Vingadores: Ultimato", genero: "Ação", avaliacao: 4.7, descricao: "Em Vingadores: Ultimato, após Thanos eliminar metade das criaturas vivas em Vingadores: Guerra Infinita, os heróis precisam lidar com a dor da perda de amigos e seus entes queridos. Com Tony Stark (Robert Downey Jr.) vagando perdido no espaço sem água nem comida, o Capitão América/Steve Rogers (Chris Evans) e a Viúva Negra/Natasha Romanov (Scarlett Johansson) precisam liderar a resistência contra o titã louco.", imagem: "https://ovicio.com.br/wp-content/uploads/2019/03/20190314-avengers-endgame-poster.jpg" },
    { nome: "A Vida é Bela", genero: "Drama", avaliacao: 4.8, descricao: "Durante a Segunda Guerra Mundial na Itália, o judeu Guido (Roberto Benigni) e seu filho Giosué são levados para um campo de concentração nazista. Afastado da mulher, ele tem que usar sua imaginação para fazer o menino acreditar que estão participando de uma grande brincadeira, com o intuito de protegê-lo do terror e da violência que os cercam.", imagem: "https://th.bing.com/th/id/OIP.kQSED0N0PB4WArGlap5cjgAAAA?w=184&h=264&c=7&r=0&o=7&pid=1.7&rm=3" },
    { nome: "Deadpool", genero: "Comédia", avaliacao: 4.2, descricao: "Ex-militar e mercenário, Wade Wilson (Ryan Reynolds) é diagnosticado com câncer em estado terminal, porém encontra uma possibilidade de cura em uma sinistra experiência científica. Recuperado, com poderes e um incomum senso de humor, ele torna-se Deadpool e busca vingança contra o homem que destruiu sua vida.", imagem: "https://tse3.mm.bing.net/th/id/OIP.K9F8hQGdE2NorzmgagJ_kQHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { nome: "Clube da Luta", genero: "Drama", avaliacao: 4.3, descricao: "Um homem deprimido que sofre de insônia conhece um estranho vendedor chamado Tyler Durden e se vê morando em uma casa suja depois que seu perfeito apartamento é destruído. A dupla forma um clube com regras rígidas onde homens lutam. A parceria perfeita é comprometida quando uma mulher, Marla, atrai a atenção de Tyler.", imagem: "https://tse3.mm.bing.net/th/id/OIP.ugyPz6Wv_QfE29HYZGuyNgHaK-?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" }
  ];

  let usuarioLogado = false;

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

  let indiceCarrossel = 0;

  // localStorage.removeItem("filmes"); só usa se for mexer em algo no codigo, serve para limpar o armazenamento e salvar as alteracoes, mas so pode estar ai se estiver testando e nao funcionando para valer

  function carregarCarrossel() {
    $("#carrossel").empty();
    filmes.slice(-5).forEach(f => {
      const img = $(`<img src="${f.imagem}" alt="${f.nome}" data-nome="${f.nome}">`);
      $("#carrossel").append(img);
    });
    atualizarSlide();
  }
  
  function atualizarSlide() {
    const total = $("#carrossel img").length;
    if (indiceCarrossel < 0) indiceCarrossel = total - 1;
    if (indiceCarrossel >= total) indiceCarrossel = 0;
    const largura = $("#carrosselContainer").width();
    $("#carrossel").css("transform", `translateX(-${indiceCarrossel * largura}px)`);
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
    $(document).on("click", "#carrossel img", function () {
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
    
    $(".carrossel-btn.left").click(() => {
      indiceCarrossel--;
      atualizarSlide();
    });
    $(".carrossel-btn.right").click(() => {
      indiceCarrossel++;
      atualizarSlide();
    });

    // filtrar
    $("#filtrarBtn").click(() => {
      const termo = $("#pesquisa").val().toLowerCase();
      const genero = $("#genero").val();
      const filtrados = filmes.filter(f =>
        f.nome.toLowerCase().includes(termo) &&
        (genero === "" || f.genero === genero)
      );
      mostrarFilmes(filtrados);
    });

    // limpar filtro
    $("#limparBtn").click(() => {
      $("#pesquisa").val("");
      $("#genero").val("");
      mostrarFilmes(filmes);
    });

    // filtrar quando estiver digitando
    $("#pesquisa").on("input", () => {
      $("#filtrarBtn").click();
    });

    // pop up dos detalhes
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

    $("#popupDetalhes .close-btn").click(() => {
      $("#popupDetalhes").fadeOut();
    });

    // botao do login
    $("#linkLogin").click(() => {
      mostrarTelaLogin();
    });

    // botao para sair do login (logout)
    $("#linkLogout").click(() => {
      usuarioLogado = false;
      localStorage.removeItem("usuarioLogado");
      mostrarTelaHome();
    });

    // botao para voltar ao inicio (home)
    $("#linkHome").click(() => {
      mostrarTelaHome();
    });

    $("#formLogin").submit(function (e) {
      e.preventDefault();
      const usuario = $("#usuarioLogin").val().trim();
      const senha = $("#senhaLogin").val().trim();

      // login feito com comparação
      if (usuario === "admin" && senha === "1234") { // pode colocar mais, sem validacao ou segurança, mas serve (sem validacao por ser feito por comparacao)
        usuarioLogado = true;
        localStorage.setItem("usuarioLogado", "true");
        mostrarTelaHome();
        alert("Login realizado com sucesso!");
      } else {
        alert("Usuário ou senha incorretos.");
      }
    });

    if(localStorage.getItem("usuarioLogado") === "true") {
      usuarioLogado = true;
      mostrarTelaHome();
    }

    $("#btnAdicionarFilme").click(() => {
      mostrarTelaAddFilme();
    });

    // para adicionar um filme
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
      this.reset();

      alert("Filme adicionado!");
      mostrarTelaHome();
    });

    // para excluir algum filme
    $(document).on("click", ".excluir-filme", function() {
      const idx = $(this).data("index");
      if (confirm(`Tem certeza que deseja excluir o filme "${filmes[idx].nome}"?`)) {
        filmes.splice(idx, 1);
        salvarFilmesStorage();
        mostrarFilmes(filmes);
        carregarCarrossel();
      }
    });

    // para editar algum filme
    // tem novas nomenclaturas de constantes para o salvamento (como no java)
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

    $("#fecharEditar").click(() => {
      $("#popupEditar").fadeOut();
    });

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