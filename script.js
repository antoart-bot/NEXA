document.addEventListener("DOMContentLoaded", () => {

    console.log("NEXA: JavaScript carregado!");

    /* =====================================================
       CONFIGURAÇÃO
       ===================================================== */

    const cards = document.querySelectorAll(".card-home");

    let favoritos = JSON.parse(
        localStorage.getItem("nexaFavoritos")
    ) || [];

    let conquistas = JSON.parse(
        localStorage.getItem("nexaConquistas")
    ) || [];


    /* =====================================================
       NOTIFICAÇÃO
       ===================================================== */

    function notificacao(mensagem, tipo = "normal") {

        const antiga = document.querySelector(".nexa-notificacao");

        if (antiga) {
            antiga.remove();
        }

        const caixa = document.createElement("div");

        caixa.className = `nexa-notificacao ${tipo}`;

        caixa.innerHTML = `
            <span class="nexa-notificacao-icone">
                ${tipo === "favorito" ? "♥" : "✓"}
            </span>

            <span class="nexa-notificacao-texto">
                ${mensagem}
            </span>
        `;

        document.body.appendChild(caixa);

        setTimeout(() => {
            caixa.classList.add("mostrar");
        }, 50);

        setTimeout(() => {

            caixa.classList.remove("mostrar");

            setTimeout(() => {
                caixa.remove();
            }, 400);

        }, 3000);
    }


    /* =====================================================
       CONQUISTAS
       ===================================================== */

    function conquistar(id, titulo, descricao) {

        if (conquistas.includes(id)) {
            return;
        }

        conquistas.push(id);

        localStorage.setItem(
            "nexaConquistas",
            JSON.stringify(conquistas)
        );

        const caixa = document.createElement("div");

        caixa.className = "nexa-conquista";

        caixa.innerHTML = `
            <div class="nexa-conquista-icon">
                🏆
            </div>

            <div class="nexa-conquista-info">

                <small>CONQUISTA DESBLOQUEADA</small>

                <strong>${titulo}</strong>

                <p>${descricao}</p>

            </div>
        `;

        document.body.appendChild(caixa);

        setTimeout(() => {
            caixa.classList.add("mostrar");
        }, 80);

        setTimeout(() => {

            caixa.classList.remove("mostrar");

            setTimeout(() => {
                caixa.remove();
            }, 500);

        }, 5000);
    }


    /* =====================================================
       FAVORITOS
       ===================================================== */

    cards.forEach((card, index) => {

        /*
         * Cada card recebe um identificador baseado
         * no link dele.
         */

        const link = card.querySelector("a");

        const identificador =
            link?.getAttribute("href") ||
            `card-${index}`;

        const botao = document.createElement("button");

        botao.className = "nexa-favorito";

        botao.setAttribute(
            "aria-label",
            "Adicionar aos favoritos"
        );

        const estaFavoritado =
            favoritos.includes(identificador);

        botao.innerHTML =
            estaFavoritado ? "♥" : "♡";

        if (estaFavoritado) {
            botao.classList.add("ativo");
        }

        card.appendChild(botao);


        botao.addEventListener("click", (evento) => {

            evento.preventDefault();
            evento.stopPropagation();

            const posicao =
                favoritos.indexOf(identificador);


            /* REMOVER */

            if (posicao !== -1) {

                favoritos.splice(posicao, 1);

                botao.innerHTML = "♡";

                botao.classList.remove("ativo");

                notificacao(
                    "Conteúdo removido dos favoritos."
                );

            }

            /* ADICIONAR */

            else {

                favoritos.push(identificador);

                botao.innerHTML = "♥";

                botao.classList.add("ativo");

                notificacao(
                    "Conteúdo salvo nos favoritos!",
                    "favorito"
                );

                conquistar(
                    "primeiro-favorito",
                    "Primeiro favorito",
                    "Você salvou seu primeiro conteúdo na NEXA."
                );
            }


            localStorage.setItem(
                "nexaFavoritos",
                JSON.stringify(favoritos)
            );

        });

    });


    /* =====================================================
       INTERAÇÃO DOS CARDS
       ===================================================== */

    cards.forEach(card => {

        card.addEventListener("mousemove", (evento) => {

            if (window.innerWidth <= 700) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                evento.clientX - rect.left;

            const y =
                evento.clientY - rect.top;

            const centroX =
                rect.width / 2;

            const centroY =
                rect.height / 2;

            const rotacaoX =
                ((y - centroY) / centroY) * -3;

            const rotacaoY =
                ((x - centroX) / centroX) * 3;

            card.style.transform = `
                perspective(900px)
                rotateX(${rotacaoX}deg)
                rotateY(${rotacaoY}deg)
                translateY(-8px)
            `;

            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =====================================================
       ANIMAÇÃO DOS CARDS
       ===================================================== */

    const observador =
        new IntersectionObserver(
            (elementos) => {

                elementos.forEach((elemento) => {

                    if (elemento.isIntersecting) {

                        elemento.target.classList.add(
                            "nexa-visivel"
                        );

                        observador.unobserve(
                            elemento.target
                        );
                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    cards.forEach((card, index) => {

        card.style.setProperty(
            "--delay",
            `${index * 100}ms`
        );

        card.classList.add(
            "nexa-animar"
        );

        observador.observe(card);

    });


    /* =====================================================
       PRIMEIRA INTERAÇÃO
       ===================================================== */

    if (
        !localStorage.getItem(
            "nexaPrimeiraVisita"
        )
    ) {

        setTimeout(() => {

            notificacao(
                "Bem-vinda à NEXA! Informação também é cuidado."
            );

            localStorage.setItem(
                "nexaPrimeiraVisita",
                "true"
            );

        }, 1000);

    }


    /* =====================================================
       CONQUISTA: EXPLORADOR
       ===================================================== */

    cards.forEach(card => {

        const link =
            card.querySelector("a");

        if (!link) return;

        link.addEventListener("click", () => {

            conquistar(
                "explorador",
                "Exploradora NEXA",
                "Você começou a explorar os conteúdos da NEXA."
            );

        });

    });


    /* =====================================================
       BOTÃO VOLTAR AO TOPO
       ===================================================== */

    const topo =
        document.createElement("button");

    topo.id = "nexa-topo";

    topo.innerHTML = "↑";

    topo.setAttribute(
        "aria-label",
        "Voltar ao topo"
    );

    document.body.appendChild(topo);


    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            topo.classList.add("mostrar");

        } else {

            topo.classList.remove("mostrar");

        }

    });


    topo.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });



    /* =====================================================
       VOCÊ SABIA?
       ===================================================== */

    const fatos = [

        "A prevenção é uma das formas mais importantes de cuidar da saúde.",

        "Buscar informações confiáveis ajuda a tomar decisões mais conscientes.",

        "Cada pessoa possui necessidades diferentes de cuidado e orientação.",

        "Conversar com profissionais de saúde pode ajudar a esclarecer dúvidas.",

        "Cuidar da saúde envolve informação, prevenção e acompanhamento.",

        "Conhecimento também faz parte do cuidado com a saúde."

    ];


    const areaFato =
        document.querySelector(
            "#nexa-voce-sabia"
        );


    if (areaFato) {

        const texto =
            areaFato.querySelector(
                ".nexa-fato-texto"
            );

        const botao =
            areaFato.querySelector(
                ".nexa-outro-fato"
            );


        function novoFato() {

            const numero =
                Math.floor(
                    Math.random() * fatos.length
                );

            texto.textContent =
                fatos[numero];

        }


        novoFato();


        if (botao) {

            botao.addEventListener(
                "click",
                () => {

                    novoFato();

                    notificacao(
                        "Novo fato carregado!"
                    );

                }
            );

        }

    }


    /* =====================================================
       FINAL
       ===================================================== */

    console.log(
        "NEXA: sistema carregado com sucesso."
    );

});