/* =========================
   NEXA - COMPARATIVOS
========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ANIMAÇÃO DOS CARDS
    ========================== */

    const cards = document.querySelectorAll(".metodo-card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(25px)";

        setTimeout(() => {

            card.style.transition =
                "opacity .5s ease, transform .5s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 100);

    });


    /* =========================
       EFEITO 3D COM MOUSE
    ========================== */

    cards.forEach(card => {

        card.addEventListener("mousemove", (evento) => {

            const rect = card.getBoundingClientRect();

            const x =
                evento.clientX - rect.left;

            const y =
                evento.clientY - rect.top;

            const centroX = rect.width / 2;
            const centroY = rect.height / 2;

            const rotateX =
                ((y - centroY) / centroY) * -4;

            const rotateY =
                ((x - centroX) / centroX) * 4;

            card.style.transform = `
                perspective(800px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-7px)
            `;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(800px) rotateX(0) rotateY(0) translateY(0)";

        });

    });


    /* =========================
       ANIMAÇÃO DA TABELA
    ========================== */

    const linhas =
        document.querySelectorAll("tbody tr");

    linhas.forEach((linha, index) => {

        linha.style.opacity = "0";

        linha.style.transform =
            "translateX(-15px)";

        setTimeout(() => {

            linha.style.transition =
                "opacity .4s ease, transform .4s ease";

            linha.style.opacity = "1";

            linha.style.transform =
                "translateX(0)";

        }, 300 + index * 60);

    });


    /* =========================
       BOTÃO VOLTAR AO TOPO
    ========================== */

    const voltarTopo =
        document.createElement("button");

    voltarTopo.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';

    voltarTopo.className =
        "voltar-topo";

    document.body.appendChild(voltarTopo);


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            voltarTopo.classList.add("mostrar");

        } else {

            voltarTopo.classList.remove("mostrar");

        }

    });


    voltarTopo.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});