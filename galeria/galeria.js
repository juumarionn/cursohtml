$(document).ready(function() {
  const filmes = [
    {
      titulo: "Vingadores: Ultimato",
      genero: "acao",
      ano: 2019,
      elenco: "Robert Downey Jr., Chris Evans, Scarlett Johansson",
      avaliacao: "8.4",
      duracao: "3h 1min",
      imagem: "https://image.tmdb.org/t/p/original/7jvlqGsxeMKscskuUZgKk0Kuv99.jpg",
      descricao: "Os Vingadores enfrentam a maior ameaça que já enfrentaram."
    },
    {
      titulo: "O Rei Leão",
      genero: "comedia",
      ano: 1994,
      elenco: "Matthew Broderick, James Earl Jones, Jeremy Irons",
      avaliacao: "8.5",
      duracao: "1h 28min",
      imagem: "https://image.tmdb.org/t/p/original/ysfzXwodmQvGHxAlsip1VMl1WsS.jpg",
      descricao: "A jornada do jovem Simba para se tornar o Rei da Pedra do Reino."
    },
    {
      titulo: "Forrest Gump",
      genero: "drama",
      ano: 1994,
      elenco: "Tom Hanks, Robin Wright, Gary Sinise",
      avaliacao: "8.8",
      duracao: "2h 22min",
      imagem: "https://image.tmdb.org/t/p/original/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
      descricao: "A história inspiradora de Forrest Gump e suas contribuições para a história americana."
    }
  ];

  function renderizarFilmes(filtro = 'todos') {
    $('#gallery').empty();
    filmes.forEach(filme => {
      if (filtro === 'todos' || filme.genero === filtro) {
        const card = $(`
          <div class="card" data-genero="${filme.genero}">
            <img src="${filme.imagem}" alt="${filme.titulo}">
            <div class="info">
              <h3>${filme.titulo}</h3>
              <p>${filme.descricao}</p>
              <button class="ver-mais" data-titulo="${filme.titulo}">Ver mais</button>
            </div>
          </div>
        `);
        $('#gallery').append(card);
      }
    });
  }

  $('#gallery').on('click', '.ver-mais', function () {
    const titulo = $(this).data('titulo');
    const filme = filmes.find(f => f.titulo === titulo);
    if (filme) abrirPopup(filme);
  });

  function abrirPopup(filme) {
    $('#tituloPopup').text(filme.titulo);
    $('#posterPopup').attr('src', filme.imagem);
    $('#anoPopup').text(filme.ano);
    $('#duracaoPopup').text(filme.duracao);
    $('#elencoPopup').text(filme.elenco);
    $('#avaliacaoPopup').text(filme.avaliacao);
    $('#descricaoPopup').text(filme.descricao);
    $('#popup').fadeIn();
  }

  $('#fecharPopup, #fecharPopup2').on('click', function() {
    $('#popup').fadeOut();
  });

  $('.filter-btn').on('click', function() {
    const filtro = $(this).data('genre');
    renderizarFilmes(filtro);
  });

  $('#search').on('input', function() {
    const termo = $(this).val().toLowerCase();
    $('#gallery .card').each(function() {
      const titulo = $(this).find('h3').text().toLowerCase();
      $(this).toggle(titulo.includes(termo));
    });
  });

  $('.hamburger').on('click', function() {
    $('.menu-content').slideToggle();
  });

  $(document).on('click', function(event) {
    if (!$(event.target).closest('.menu').length) {
      $('.menu-content').slideUp();
    }
  });

  renderizarFilmes();
});
