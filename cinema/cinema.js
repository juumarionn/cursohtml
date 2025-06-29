let logado = false;

  let lista = JSON.parse(localStorage.getItem("lista")) || [
    {
      imagem: "https://image.tmdb.org/t/p/original/4lJh65zHtPBYuGTFKsQpXT086GP.jpg",
      tipo: "Filme",
      titulo: "Matrix",
      genero: "Ação/Ficção",
      ano: 1999,
      avaliacao: 5,
      descricao: "Em um futuro próximo, Thomas Anderson (Keanu Reeves), um jovem programador de computador que mora em um cubículo escuro, é atormentado por estranhos pesadelos nos quais encontra-se conectado por cabos e contra sua vontade, em um imenso sistema de computadores do futuro. Em todas essas ocasiões, acorda gritando no exato momento em que os eletrodos estão para penetrar em seu cérebro. À medida que o sonho se repete, Anderson começa a ter dúvidas sobre a realidade. Por meio do encontro com os misteriosos Morpheus (Laurence Fishburne) e Trinity (Carrie-Anne Moss), Thomas descobre que é, assim como outras pessoas, vítima do Matrix, um sistema inteligente e artificial que manipula a mente das pessoas, criando a ilusão de um mundo real enquanto usa os cérebros e corpos dos indivíduos para produzir energia. Morpheus, entretanto, está convencido de que Thomas é Neo, o aguardado messias capaz de enfrentar o Matrix e conduzir as pessoas de volta à realidade e à liberdade.",
      comentariosExtras: []
    },
    {
      imagem: "https://th.bing.com/th/id/R.7a1bd33eb590f847fb8dc93501d12087?rik=diV1OGVCEVwwXA&riu=http%3a%2f%2fes.web.img1.acsta.net%2fpictures%2f17%2f10%2f24%2f09%2f04%2f3656474.jpg&ehk=ScRsR0T5eiveII730ReBKKj5QDo%2bk6VQpqE48cVz8eA%3d&risl=&pid=ImgRaw&r=0",
      tipo: "Série",
      titulo: "Stranger Things",
      genero: "Ficção científica",
      ano: 2016,
      avaliacao: 4,
      descricao: "A série começa em 1983, quando Will Byers, um menino de 12 anos, desaparece misteriosamente. Sua mãe, Joyce (Winona Ryder), e o xerife Jim Hopper (David Harbour) se unem para encontrá-lo. Enquanto isso, os amigos de Will, Mike (Finn Wolfhard), Dustin (Gaten Matarazzo) e Lucas (Caleb McLaughlin), também iniciam sua própria busca. Durante essa jornada, eles encontram uma garota enigmática chamada Onze (Millie Bobby Brown), que possui habilidades telecinéticas e escapa de um laboratório que realiza experimentos secretos. A história se desenrola em meio a mistérios, criaturas do Mundo Invertido e segredos do governo.",
      comentariosExtras: []
    },
    {
      imagem: "https://images.justwatch.com/poster/241712232/s718/a-origem.jpg",
      tipo: "Filme",
      titulo: "A Origem",
      genero: "Suspense",
      ano: 2010,
      avaliacao: 5,
      descricao: "Em um mundo onde é possível entrar na mente humana, Cobb (Leonardo DiCaprio) está entre os melhores na arte de roubar segredos valiosos do inconsciente, durante o estado de sono. Além disto ele é um fugitivo, pois está impedido de retornar aos Estados Unidos devido à morte de Mal (Marion Cotillard). Desesperado para rever seus filhos, Cobb aceita a ousada missão proposta por Saito (Ken Watanabe), um empresário japonês: entrar na mente de Richard Fischer (Cillian Murphy), o herdeiro de um império econômico, e plantar a ideia de desmembrá-lo. Para realizar este feito ele conta com a ajuda do parceiro Arthur (Joseph Gordon-Levitt), a inexperiente arquiteta de sonhos Ariadne (Ellen Page) e Eames (Tom Hardy), que consegue se disfarçar de forma precisa no mundo dos sonhos.",
      comentariosExtras: []
    }
  ];

  function salvarLocalStorage() {
    localStorage.setItem("lista", JSON.stringify(lista));
  }

  
  // localStorage.removeItem("lista");

  function atualizarGaleria() {
    $("#galeria").empty();
    lista.forEach((item, index) => {
      const cor = item.avaliacao > 4 ? "verde" : item.avaliacao >= 2 ? "laranja" : "vermelho";
      let comentariosHTML = "";
      if(item.comentariosExtras && item.comentariosExtras.length > 0){
        comentariosHTML = item.comentariosExtras.map(c => `<p>💬 ${c}</p>`).join("");
      }
      const card = $(`
        <div class="card" data-tipo="${item.tipo}">
          <img src="${item.imagem}" alt="${item.titulo}">
          <h3>${item.titulo} (${item.ano})</h3>
          <p><strong>Tipo:</strong> ${item.tipo}</p>
          <p><strong>Gênero:</strong> ${item.genero}</p>
          <p class="avaliacao ${cor}"><strong>Avaliação:</strong> ${item.avaliacao}</p>
          <p><strong>Descrição:</strong> ${item.descricao}</p>
          <div class="comentarios" id="comentarios-${index}">${comentariosHTML}</div>
          ${logado ? `
            <button class="btn btn-editar" data-index="${index}">Editar</button>
            <button class="btn btn-excluir" data-index="${index}">Excluir</button>
            <button class="btn btn-comentar" data-index="${index}">Comentar</button>
          ` : ''}
        </div>
      `);
      $("#galeria").append(card);
    });
  }

  $(document).ready(() => {
    atualizarGaleria();

    $("#menu-btn").click(() => $("#menu").slideToggle());

    $(".menu-link").click(function () {
      const secao = $(this).data("section");
      $(".formulario").hide();
      if (secao === "login") {
        $("#galeria").hide();
        $("#login-form").slideDown();
      } else if (secao === "home") {
        $("#galeria").show();
        atualizarGaleria();
      } else if (secao === "filmes" || secao === "series") {
        const tipo = secao === "filmes" ? "Filme" : "Série";
        $(".card").hide();
        $(`.card[data-tipo='${tipo}']`).show();
        $("#galeria").show();
      }
      $("#menu").slideUp();
    });

    $("#login-form").submit(function (e) {
      e.preventDefault();
      const usuario = $("#usuario").val();
      const senha = $("#senha").val();
      if (usuario === "admin" && senha === "1234") {
        alert("Login realizado!");
        logado = true;
        $(".btn-add").show();
        $("#btn-logout").show();
        $("#login-form").slideUp();
        $("#galeria").show();
        atualizarGaleria();
      } else {
        alert("Credenciais inválidas!");
      }
    });

    $("#abrir-form").click(() => {
      $(".formulario").hide();
      $("#galeria").hide();
      $("#formulario").slideToggle();
    });

    $("#formulario").submit(function (e) {
      e.preventDefault();
      const novoItem = {
        imagem: $("#imagem").val(),
        tipo: $("#tipo").val(),
        titulo: $("#titulo").val(),
        genero: $("#genero").val(),
        ano: parseInt($("#ano").val()),
        avaliacao: parseFloat($("#avaliacao").val()),
        descricao: $("#descricao").val(),
        comentariosExtras: []
      };
      lista.push(novoItem);
      salvarLocalStorage();
      atualizarGaleria();
      this.reset();
      $("#formulario").slideUp();
      $("#galeria").show();
    });

    $("#galeria").on("click", ".btn-comentar", function () {
      const index = $(this).data("index");
      const comentario = prompt("Digite seu comentário:");
      if (comentario) {
        lista[index].comentariosExtras.push(comentario);
        salvarLocalStorage();
        atualizarGaleria();
      }
    });

    $("#galeria").on("click", ".btn-excluir", function () {
      const index = $(this).data("index");
      if (confirm("Deseja excluir este item?")) {
        lista.splice(index, 1);
        salvarLocalStorage();
        atualizarGaleria();
      }
    });

    $("#galeria").on("click", ".btn-editar", function () {
      const index = $(this).data("index");
      const item = lista[index];
      const novoTitulo = prompt("Novo título:", item.titulo);
      const novaDescricao = prompt("Nova descrição:", item.descricao);
      if (novoTitulo && novaDescricao) {
        item.titulo = novoTitulo;
        item.descricao = novaDescricao;
        salvarLocalStorage();
        atualizarGaleria();
      }
    });


    $("#btn-logout").click(() => {
      logado = false;
      $(".btn-add").hide();
      $("#btn-logout").hide();
      atualizarGaleria();
      alert("Você saiu da conta.");
    });
  });