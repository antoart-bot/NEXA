const API_URL = "https://nexa-backend-alpha.vercel.app/api/chat";

const formulario = document.querySelector("#form-chat");
const campo = document.querySelector("#pergunta");
const botaoEnviar = document.querySelector("#enviar");
const chat = document.querySelector("#chat");
const statusAI = document.querySelector("#status-ai");


function adicionarMensagem(texto, tipo) {

    const mensagem = document.createElement("div");

    mensagem.className = `mensagem mensagem-${tipo}`;


    const avatar = document.createElement("div");

    avatar.className = "avatar-pequeno";

    avatar.textContent =
        tipo === "ai" ? "N" : "Você";


    const balao = document.createElement("div");

    balao.className = "balao";

const conteudo = document.createElement("div");

conteudo.className = "conteudo-resposta";

conteudo.innerHTML = texto
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^\* (.*)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "<br><br>")
    .replace(/\n/g, "<br>");

balao.appendChild(conteudo);

    mensagem.appendChild(avatar);

    mensagem.appendChild(balao);

    chat.appendChild(mensagem);


    chat.scrollTo({
        top: chat.scrollHeight,
        behavior: "smooth"
    });


    return balao;
}


async function enviarPergunta(pergunta) {

    if (!pergunta.trim()) {
        return;
    }


    adicionarMensagem(
        pergunta,
        "usuario"
    );


    campo.value = "";

    botaoEnviar.disabled = true;

    statusAI.textContent =
        "Nexa AI está pensando...";


    try {

        const resposta = await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    mensagem: pergunta
                })
            }
        );


        const dados = await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                dados.erro ||
                "Erro no servidor."
            );

        }


        adicionarMensagem(
            dados.resposta,
            "ai"
        );


        statusAI.textContent = "";


    } catch (erro) {

        console.error(
            "Erro na Nexa AI:",
            erro
        );


        adicionarMensagem(
            "Desculpe, não consegui responder agora. Tente novamente em alguns segundos.",
            "ai"
        );


        statusAI.textContent =
            "Erro ao conectar com a Nexa AI.";

    }


    botaoEnviar.disabled = false;

    campo.focus();
}


formulario.addEventListener(
    "submit",
    (evento) => {

        evento.preventDefault();

        enviarPergunta(
            campo.value
        );

    }
);


document
    .querySelectorAll(".sugestoes button")
    .forEach(botao => {

        botao.addEventListener(
            "click",
            () => {

                const pergunta =
                    botao.dataset.pergunta;

                campo.value =
                    pergunta;

                enviarPergunta(
                    pergunta
                );

            }
        );

    });