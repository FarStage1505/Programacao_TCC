// ==========================================
// LOADSENSE
// DASHBOARD
// ==========================================


document.addEventListener(
    "DOMContentLoaded",
    () => {


        // ==========================================
        // CARREGAR TEMA ESCOLHIDO
        // ==========================================

        const tema =
            localStorage.getItem(
                "loadsense_tema"
            ) || "dark";


        document
            .documentElement
            .classList
            .toggle(
                "light-theme",
                tema === "light"
            );



        // ==========================================
        // USUÁRIO
        // ==========================================

        const usuarioSalvo =
            localStorage.getItem(
                "loadsense_usuario"
            );


        if (usuarioSalvo) {


            try {


                const usuario =
                    JSON.parse(
                        usuarioSalvo
                    );


                const nome =
                    document.querySelector(
                        ".profile-name"
                    );


                const perfil =
                    document.querySelector(
                        ".profile-role"
                    );


                const avatar =
                    document.querySelector(
                        ".avatar"
                    );



                if (
                    nome &&
                    usuario.nome
                ) {


                    nome.textContent =
                        usuario.nome;


                }



                if (
                    perfil &&
                    usuario.perfil
                ) {


                    perfil.textContent =
                        usuario.perfil;


                }



                if (
                    avatar &&
                    usuario.nome
                ) {


                    const palavras =
                        usuario.nome
                            .trim()
                            .split(/\s+/);



                    if (
                        palavras.length === 1
                    ) {


                        avatar.textContent =
                            palavras[0]
                                .substring(
                                    0,
                                    2
                                )
                                .toUpperCase();


                    }

                    else {


                        avatar.textContent =
                            (
                                palavras[0][0] +
                                palavras[
                                    palavras.length - 1
                                ][0]
                            )
                                .toUpperCase();


                    }


                }


            }

            catch (erro) {


                console.error(
                    "Erro ao carregar usuário:",
                    erro
                );


            }


        }



        // ==========================================
        // BUSCA
        // ==========================================

        const searchInput =
            document.getElementById(
                "dashboardSearch"
            );


        const operations =
            document.querySelectorAll(
                ".operation-row"
            );


        const noResults =
            document.getElementById(
                "noResults"
            );



        searchInput?.addEventListener(
            "input",
            () => {


                const busca =
                    searchInput
                        .value
                        .toLowerCase()
                        .trim();


                let encontrados =
                    0;



                operations.forEach(
                    operation => {


                        const dados =
                            operation
                                .dataset
                                .search
                                .toLowerCase();


                        const mostrar =
                            dados.includes(
                                busca
                            );


                        operation.style.display =
                            mostrar
                                ? "grid"
                                : "none";


                        if (mostrar) {

                            encontrados++;

                        }


                    }
                );



                noResults.style.display =
                    encontrados === 0
                        ? "block"
                        : "none";


            }
        );



        // ==========================================
        // ALERTAS
        // ==========================================

        const notificationButton =
            document.getElementById(
                "notificationButton"
            );


        notificationButton
            ?.addEventListener(
                "click",
                () => {


                    window.location.href =
                        "../Alertas/Alertas.html";


                }
            );


    }
);