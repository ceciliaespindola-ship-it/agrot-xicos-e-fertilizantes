const questions = [
  {
    question: "Por que o uso excessivo de agrotóxicos é prejudicial ao meio ambiente?",
    choices: [
      "Eles ajudam a equilibrar o ecossistema",
      "Podem contaminar a água e o solo",
      "São totalmente seguros",
      "Aumentam a biodiversidade"
    ],
    answer: 1
  },
  {
    question: "Qual o efeito do uso excessivo de fertilizantes químicos?",
    choices: [
      "Melhora a fertilidade do solo a longo prazo",
      "Contamina rios e lençóis freáticos",
      "Reduz a produção agrícola",
      "Aumenta a biodiversidade no solo"
    ],
    answer: 1
  },
  {
    question: "O que podemos fazer para reduzir os impactos desses produtos?",
    choices: [
      "Aumentar o uso de agrotóxicos",
      "Adotar práticas de agricultura sustentável e orgânica",
      "Ignorar os efeitos ambientais",
      "Usar fertilizantes ainda mais químicos"
    ],
    answer: 1
  },
  {
    question: "Qual das opções abaixo é uma consequência do uso descontrolado de agrotóxicos?",
    choices: [
      "Aumento da saúde pública",
      "Resistência de pragas e impacto na saúde humana",
      "Solo mais fértil por mais tempo",
      "Água mais limpa"
    ],
    answer: 1
  },
  {
    question: "Por que é importante cuidar do solo e da água?",
    choices: [
      "Para garantir alimentos mais nutritivos e um planeta mais saudável",
      "Para aumentar o uso de produtos químicos",
      "Para facilitar a agricultura intensiva",
      "Não há importância nisso"
    ],
    answer: 0
  }
];

const frasesAcerto = [
  "Ótimo trabalho! Você está contribuindo para um planeta mais saudável! 🌿",
  "Parabéns! Sua consciência ambiental é inspiradora! 🌟",
  "Excelente! Cada passo faz a diferença! 💚",
  "Você arrasou! Continue sempre assim! 😄",
  "Você está no caminho certo! 🌞"
];

const frasesErro = [
  "Não desanime! Cada erro é uma oportunidade de aprender mais! 🌱",
  "Vamos lá! Pense no impacto que podemos ter juntos! 🌍",
  "Continue tentando! Seu esforço é importante!",
  "Não se preocupe, você vai conseguir! ✨",
  "Aprenda com os erros e siga em frente! 💪"
];

const iconsContainer = document.getElementById('icons-container');

let currentQuestionIndex = 0;
let score = 0;

// Elementos do DOM
const startBtn = document.getElementById("start-btn");
const startContainer = document.getElementById("start-container");
const initialPhrase = document.getElementById("initial-phrase");
const quizSection = document.getElementById("quiz-section");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

// Função para iniciar ou reiniciar o quiz
function startQuiz() {
  // Esconder botão de início/tentar novamente
  document.getElementById("start-container").classList.add("hidden");
  // Esconder frase inicial
  initialPhrase.style.display = "none";

  // Mostrar quiz
  quizSection.classList.remove("hidden");
  // Resetar pontuação e índice
  currentQuestionIndex = 0;
  score = 0;
  // Esconder botão de tentar novamente
  restartBtn.style.display = "none";
  // Mostrar primeira questão
  showQuestion();
}

// Mostrar pergunta
function showQuestion() {
  const q = questions[currentQuestionIndex];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";
  feedbackEl.innerHTML = "";
  nextBtn.style.display = "none";

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => selectAnswer(index);
    choicesEl.appendChild(btn);
  });
}

// Quando o usuário responde
function selectAnswer(selectedIndex) {
  const q = questions[currentQuestionIndex];

  // Desativar botões
  Array.from(choicesEl.children).forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.answer) {
      btn.style.border = "2px solid yellow"; // destaque na resposta certa
    }
  });

  // Limpar ícones existentes
  iconsContainer.innerHTML = "";

  if (selectedIndex === q.answer) {
    score++;
    // ícone verde
    addIcon('green');
    const frase = frasesAcerto[Math.floor(Math.random() * frasesAcerto.length)];
    feedbackEl.innerHTML = `<p style='color: lightgreen;'>${frase}</p>`;
  } else {
    // ícone vermelho
    addIcon('red');
    const fraseErro = frasesErro[Math.floor(Math.random() * frasesErro.length)];
    feedbackEl.innerHTML = `<p style='color: orange;'>${fraseErro}<br/>Resposta correta: ${q.choices[q.answer]}</p>`;
  }

  nextBtn.style.display = "inline-block";

  if (selectedIndex === q.answer) {
    const mensagensFelizes = [
      "Você está no caminho certo! 🌞",
      "Continue assim, seu esforço faz a diferença! 🌼",
      "Juntos podemos transformar o mundo! 🌍"
    ];
    const msgFeliz = mensagensFelizes[Math.floor(Math.random() * mensagensFelizes.length)];
    feedbackEl.innerHTML += `<p style='margin-top:10px; font-weight:bold;'>${msgFeliz}</p>`;
  }
}

// Função para adicionar ícones de luizinha
function addIcon(cor) {
  const span = document.createElement('span');
  span.style.fontSize = '2em';
  span.style.display = 'inline-block';
  span.style.width = '30px';
  span.style.height = '30px';
  span.style.lineHeight = '30px';

  iconsContainer.appendChild(span);
}

// Próxima pergunta ou fim
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// Mostrar resultados finais
function showResults() {
  questionEl.textContent = "Fim do Quiz!";
  choicesEl.innerHTML = "";
  feedbackEl.innerHTML = "";
  nextBtn.style.display = "none";

  const porcentagem = Math.round((score / questions.length) * 100);
  let mensagemFinal = "";

  if (porcentagem >= 80) {
    mensagemFinal = "Excelente! Você compreende a importância de cuidar do meio ambiente.";
  } else if (porcentagem >= 50) {
    mensagemFinal = "Ótimo começo! Continue aprendendo e agindo pelo planeta.";
  } else {
    mensagemFinal = "Não desanime! Cada passo conta na preservação do nosso planeta.";
  }

  resultEl.innerHTML = `<h3>Você acertou ${score} de ${questions.length} perguntas (${porcentagem}%).</h3><p>${mensagemFinal}</p>`;

  // Mostrar botão de tentar novamente
  restartBtn.style.display = "inline-block";
}

// Evento do botão iniciar
document.getElementById("start-btn").onclick = startQuiz;
// Evento do botão tentar novamente
document.getElementById("restart-btn").onclick = startQuiz;