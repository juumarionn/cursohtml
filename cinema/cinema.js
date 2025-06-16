<script>
    const listaMidias = [
        { nome: "Vingadores", tipo: "filme" },
        { nome: "Stranger Things", tipo: "serie" },
        { nome: "Homem-Aranha", tipo: "filme" },
        { nome: "The Witcher", tipo: "serie" },
        { nome: "Barbie", tipo: "filme" },
        { nome: "La Casa de Papel", tipo: "serie" }
    ];

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

    function mostrarResultado(lista) {
        const divResultado = document.getElementById('resultado');
        divResultado.innerHTML = '';

        if (lista.length === 0) {
            divResultado.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            return;
        }

        const ul = document.createElement('ul');

        lista.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nome} - ${item.tipo === 'filme' ? 'Filme' : 'Série'}`;
            ul.appendChild(li);
        });

        divResultado.appendChild(ul);
    }
</script>