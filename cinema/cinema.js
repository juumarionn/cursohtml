// Dados fictícios de mídia
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

let usuarioLogado = false;

// Função para alterar a tela
function Tela(tela) {
    document.getElementById('home').style.display = tela === 'home' ? 'block' : 'none';
    document.getElementById('area').style.display = tela === 'area' ? 'block' : 'none';
    document.getElementById('resultado').innerHTML = '';

}