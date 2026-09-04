// 🔥 FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getDatabase,
  ref,
  push
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyABnSnVlJghgdnZO-PL-cyJBVaS9d29iSI",
  authDomain: "mapa-f6979.firebaseapp.com",
  databaseURL: "https://mapa-f6979-default-rtdb.firebaseio.com",
  projectId: "mapa-f6979",
  storageBucket: "mapa-f6979.appspot.com",
  messagingSenderId: "71217218892",
  appId: "1:71217218892:web:b75e90375a9c873215fbe9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// =========================
// 🧠 QUIZ MELHORADO
// =========================

const perguntas = [

  {
    pergunta: "Você está chegando na Rotatória da BR-135 e uma carreta já está fazendo a curva. De quem é a preferência?",
    respostas: [
      "Minha, porque carretas são lentas e eu cheguei rápido.",
      "De quem piscar o farol primeiro.",
      "Da carreta, pois ela já está circulando na rotatória (Art. 29 CTB)."
    ],
    correta: 2,
    explicacao: "Segundo o Código de Trânsito, a preferência é de quem já está na rotatória."
  },

  {
    pergunta: "Na Avenida José Olavo Sampaio (BR-226), com pista estreita e buracos, qual a melhor estratégia?",
    respostas: [
      "Ultrapassar logo para não cair nos buracos.",
      "Manter distância do veículo à frente e evitar ultrapassagens arriscadas.",
      "Andar pelo acostamento."
    ],
    correta: 1,
    explicacao: "Manter distância evita acidentes em freadas bruscas."
  },

  {
    pergunta: "São 07:00 da manhã na Rua Vitorino Lucena. O que esperar?",
    respostas: [
      "Fiscalização intensa com muitos guardas de trânsito.",
      "Rua vazia e trânsito livre.",
      "Horário de pico com trânsito intenso e pouca sinalização."
    ],
    correta: 2,
    explicacao: "É um dos horários mais movimentados da via."
  },

  {
    pergunta: "Ao pilotar uma moto na Rua Mário Pereira, que possui relevos altos e muito trânsito, você deve",
    respostas: [
      "Acelerar para passar rápido.",
      "Andar em zigue-zague para desviar de todos os carros.",
      "Reduzir a velocidade e manter estabilidade nos relevos."
    ],
    correta: 2,
    explicacao: "Relevos + trânsito = risco alto de queda."
  },

  {
    pergunta: "Você vai passar pela Rua Raimundo França (Campo Dantas) à noite. Qual o maior perigo?",
    respostas: [
      "Falta de iluminação e buracos escondidos.",
      "Excesso de placas de sinalização que distraem o motorista.",
      "Som automotivo muito alto.",
    ],
    correta:0,
    explicacao: "A baixa iluminação dificulta ver obstáculos."
  },

  {
    pergunta: "Na Rua Magalhães de Almeida, qual exige mais atenção?",
    respostas: [
      "Entrada e saída de veículos grandes.",
      "A presença de muitos ciclistas em grupo.",
      "Feiras bloqueando a rua."
    ],
    correta: 0,
    explicacao: "Carretas geram pontos cegos perigosos."
  }

];
// =========================
// VARIÁVEIS
// =========================

let perguntaAtual = 0;
let pontos = 0;
let respondeu = false;

// ELEMENTOS
const perguntaEl = document.getElementById("pergunta");
const respostasEl = document.getElementById("respostas");
const proximoBtn = document.getElementById("proximo");
const resultadoEl = document.getElementById("resultado");

// =========================
// MOSTRAR PERGUNTA
// =========================

function mostrarPergunta() {

  respondeu = false;

  proximoBtn.style.display = "none";

  respostasEl.innerHTML = "";

  const pergunta = perguntas[perguntaAtual];

  perguntaEl.innerHTML = `
    <span>
      ${perguntaAtual + 1}/${perguntas.length}
    </span>

    <h3>${pergunta.pergunta}</h3>
  `;

  pergunta.respostas.forEach((resposta, index) => {

    const button = document.createElement("button");

    button.innerText = resposta;

    button.classList.add("resposta-btn");

    button.onclick = () => selecionarResposta(button, index);

    respostasEl.appendChild(button);

  });

}

// =========================
// SELECIONAR RESPOSTA
// =========================

function selecionarResposta(button, index) {

  if (respondeu) return;

  respondeu = true;

  const correta = perguntas[perguntaAtual].correta;

  const botoes = document.querySelectorAll(".resposta-btn");

  botoes.forEach((btn, i) => {

    btn.disabled = true;

    if (i === correta) {
      btn.style.background = "#16a34a";
    }

    if (i === index && i !== correta) {
      btn.style.background = "#dc2626";
    }

  });

  if (index === correta) {
    pontos++;
  }

  proximoBtn.style.display = "block";

}

// =========================
// PRÓXIMA
// =========================

proximoBtn.onclick = () => {

  perguntaAtual++;

  if (perguntaAtual < perguntas.length) {

    mostrarPergunta();

  } else {

    finalizarQuiz();

  }

};

// =========================
// FINALIZAR
// =========================

function finalizarQuiz() {

  perguntaEl.style.display = "none";
  respostasEl.style.display = "none";
  proximoBtn.style.display = "none";

  resultadoEl.style.display = "block";

  let mensagem = "";
  let emoji = "";

  if (pontos === 6) {

    emoji = "🏆";
    mensagem = "Mestre da Direção Defensiva! Você é um exemplo para o trânsito de Presidente Dutra!";

  } else if (pontos >= 3) {

    emoji = "👏";
    mensagem = "Motorista Atento. Você conhece os riscos, mas precisa de mais cautela.";

  } else {

    emoji = "⚠️";
    mensagem = "Perigo no Volante! Leia nosso guia de ruas e avenidas antes de sair de casa.";

  }

  resultadoEl.innerHTML = `

    <div class="resultado-final">

      <h2>${emoji}</h2>

      <h3>
        Você acertou ${pontos} de ${perguntas.length}
      </h3>

      <p>${mensagem}</p>

    </div>

  `;

  // 🔥 SALVAR FIREBASE

  const quizRef = ref(db, "quizResultados");

  push(quizRef, {

    pontos: pontos,
    total: perguntas.length,
    porcentagem: ((pontos / perguntas.length) * 100).toFixed(0) + "%",

    data: new Date().toLocaleString("pt-BR")

  });

  // REINICIAR

  document
    .getElementById("reiniciarQuiz")
    .onclick = reiniciarQuiz;

}


// INICIAR
mostrarPergunta();