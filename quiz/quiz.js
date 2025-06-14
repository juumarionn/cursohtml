const quizData = [
    {
        question: "Qual é a capital do Brasil?",
        answers: {
            a: "Rio de Janeiro",
            b: "São Paulo",
            c: "Brasília",
            d: "Belo Horizonte"
        },
        correct: "c"
    },
    {
        question: "Quantos planetas existem no nosso Sistema Solar?",
        answers: {
            a: "7",
            b: "8",
            c: "9",
            d: "10"
        },
        correct: "b"
    },
    {
        question: "Quem pintou a Mona Lisa?",
        answers: {
            a: "Vincent van Gogh",
            b: "Pablo Picasso",
            c: "Leonardo da Vinci",
            d: "Michelangelo"
        },
        correct: "c"
    }
];

const questionDisplay = document.getElementById('question-display');
const nextButton = document.getElementById('next-question');
const resultsContainer = document.getElementById('results');

let currentQuestionIndex = 0;
let userAnswers = []; // Para armazenar as respostas do usuário

function displayQuestion() {
    // Esconde os resultados se estiverem visíveis
    resultsContainer.style.display = 'none';
    nextButton.style.display = 'block'; // Garante que o botão esteja visível

    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];
        const answersHtml = Object.keys(currentQuestion.answers)
            .map(letter => `
                <label>
                    <input type="radio" name="question" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>
            `).join('');

        questionDisplay.innerHTML = `
            <p>${currentQuestion.question}</p>
            <div class="answers">${answersHtml}</div>
        `;

        // Altera o texto do botão para "Ver Resultados" na última pergunta
        if (currentQuestionIndex === quizData.length - 1) {
            nextButton.textContent = "Finalizar";
        } else {
            nextButton.textContent = "Próxima Pergunta";
        }

    } else {
        // Todas as perguntas foram respondidas, mostra os resultados
        showResults();
    }
}

function saveAnswerAndProceed() {
    const selectedOption = document.querySelector('input[name="question"]:checked');

    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.value; // Salva a resposta
        currentQuestionIndex++;
        displayQuestion(); // Exibe a próxima pergunta ou resultados
    } else {
        alert("Por favor, selecione uma opção antes de prosseguir!");
    }
}

function showResults() {
    let numCorrect = 0;

    quizData.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            numCorrect++;
        }
    });

    questionDisplay.innerHTML = ''; // Limpa a pergunta
    nextButton.style.display = 'none'; // Esconde o botão
    resultsContainer.innerHTML = `Você acertou ${numCorrect} de ${quizData.length} perguntas!`;
    resultsContainer.style.display = 'block'; // Mostra os resultados
}

// Adiciona um listener ao botão "Próxima Pergunta"
nextButton.addEventListener('click', saveAnswerAndProceed);

// Seleção de seções
const homeSection = document.getElementById('inicioQuiz');
const quizSection = document.getElementById('quiz-section');
const pointsSection = document.getElementById('points-section');
const lastScoreDisplay = document.getElementById('last-score');

function showSection(section) {
    homeSection.style.display = 'none';
    quizSection.style.display = 'none';
    pointsSection.style.display = 'none';

    if (section === 'home') {
        homeSection.style.display = 'block';
    } else if (section === 'quiz') {
        quizSection.style.display = 'flex';
    } else if (section === 'points') {
        pointsSection.style.display = 'block';
        const lastScore = localStorage.getItem('lastScore');
        if (lastScore) {
            lastScoreDisplay.textContent = lastScore;
        } else {
            lastScoreDisplay.textContent = "Nenhum resultado ainda.";
        }
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    showSection('quiz');
    displayQuestion();
}

function showResults() {
    let numCorrect = 0;

    quizData.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            numCorrect++;
        }
    });

    const percentage = ((numCorrect / quizData.length) * 100).toFixed(2);
    const resultText = `Você acertou ${numCorrect} de ${quizData.length} perguntas (${percentage}%)!`;

    questionDisplay.innerHTML = '';
    nextButton.style.display = 'none';
    resultsContainer.innerHTML = resultText;
    resultsContainer.style.display = 'block';

    localStorage.setItem('lastScore', resultText);

    // Exibe botão para voltar para a home
    document.getElementById('returnHome').style.display = 'block';
}

function returnHome() {
    showSection('home');
    document.getElementById('returnHome').style.display = 'none';
    resultsContainer.style.display = 'none';
}