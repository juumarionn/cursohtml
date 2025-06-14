const perguntasQuiz = [
    {
        pergunta: "Qual é a capital do Brasil?",
        opcoes: { a: "Rio de Janeiro", b: "São Paulo", c: "Brasília", d: "Belo Horizonte" },
        correta: "c"
    },
    {
        pergunta: "Quantos planetas existem no nosso Sistema Solar?",
        opcoes: { a: "7", b: "8", c: "9", d: "10" },
        correta: "b"
    },
    {
        pergunta: "Quem pintou a Mona Lisa?",
        opcoes: { a: "Vincent van Gogh", b: "Pablo Picasso", c: "Leonardo da Vinci", d: "Michelangelo" },
        correta: "c"
    }
];

const Perg = document.getElementById('pergunta-aqui');
const BotaoProx = document.getElementById('botao-prox');
const Result = document.getElementById('resultado-aqui');
const UltPont = document.getElementById('ultima-pontuacao');
const BotaoVoltar = document.getElementById('botao-voltar');

let int = 0;
let usuario = [];

function mostrarPerg() {
    Result.style.display = 'none';
    BotaoProx.style.display = 'block';
    BotaoVoltar.style.display = 'none';

    if (int < perguntasQuiz.length) {
        const pAtual = perguntasQuiz[int];
        const htmlOpts = Object.keys(pAtual.opcoes)
            .map(l => `
                <label>
                    <input type="radio" name="resposta" value="${l}">
                    ${l} : ${pAtual.opcoes[l]}
                </label>
            `).join('');

        Perg.innerHTML = `
            <p>${pAtual.pergunta}</p>
            <div class="respostas">${htmlOpts}</div>
        `;

        BotaoProx.textContent = 
            (int === perguntasQuiz.length - 1) ? "Finalizar" : "Próxima";
    } else {
        mostrarResult();
    }
}

function avQuiz() {
    const optSel = document.querySelector('input[name="resposta"]:checked');
    if (optSel) {
        usuario[int] = optSel.value;
        int++;
        mostrarPerg();
    } else {
        alert("Escolha uma opção antes de continuar!");
    }
}

function mostrarResult() {
    let acertos = 0;
    perguntasQuiz.forEach((p, i) => {
        if (usuario[i] === p.correta) {
            acertos++;
        }
    });

    const pct = ((acertos / perguntasQuiz.length) * 100).toFixed(2);
    const textoF = `Você acertou ${acertos} de ${perguntasQuiz.length} perguntas (${pct}%)!`;

    Perg.innerHTML = '';
    BotaoProx.style.display = 'none';
    Result.innerHTML = textoF;
    Result.style.display = 'block';

    localStorage.setItem('ultimaPontuacaoQuiz', textoF);
    BotaoVoltar.style.display = 'block';
}

function Tela(tela) {
    document.querySelectorAll('.tela-quiz').forEach(sec => {
        sec.style.display = 'none';
    });

    if (tela === 'inicio') {
        document.getElementById('inicio').style.display = 'block';
    } else if (tela === 'quiz') {
        document.getElementById('quiz').style.display = 'flex';
    } else if (tela === 'pontos') {
        document.getElementById('pontos').style.display = 'block';
        const pontSalva = localStorage.getItem('ultimaPontuacaoQuiz');
        UltPont.textContent = pontSalva || "Nenhum resultado ainda.";
    }
}

function iniQuiz() {
    int = 0;
    usuario = [];
    Tela('quiz');
    mostrarPerg();
}

BotaoProx.addEventListener('click', avQuiz);

document.addEventListener('DOMContentLoaded', () => {
    Tela('inicio'); 
});