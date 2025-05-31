// declarando as variaveis
let produtos = []; // produtos é uma array(lista) onde serão armazenados produtos
let adicionando = -1;

// função chamada quando clicamos no botão para adicionar produto
function adicionarProduto() {
    const nome = document.getElementById("nome").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const quantidade = parseInt(document.getElementById("quantidade").value);

    // garantir que o nome nao esteja vazio e que o preço/quantidade sejam numeros
    if(!nome ||  isNaN(preco) || isNaN(quantidade)){
        alert("Preencha todos os campos vazios");
        return;
    }

    const produto = {nome, preco, quantidade};

    // decide enre adicionar ou editar
    if(adicionando === -1){
        produtos.push(produto); // adiciona novo
    } else {
        produtos[adicionando] = produto; // edita existente
        adicionando = -1;
    }

    document.getElementById("nome").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("quantidade").value = "";

    atualizarTabela();
}

