// ==========================================
// LOADSENSE
// CADASTRO
// ==========================================


document.addEventListener(
    "DOMContentLoaded",
    () => {


        // ==========================================
        // TEMA
        // ==========================================

        const lightThemeButton =
            document.getElementById(
                "lightThemeButton"
            );


        const darkThemeButton =
            document.getElementById(
                "darkThemeButton"
            );



        function aplicarTema(
            tema
        ) {


            const temaClaro =
                tema === "light";


            document
                .documentElement
                .classList
                .toggle(
                    "light-theme",
                    temaClaro
                );


            lightThemeButton
                ?.classList
                .toggle(
                    "active",
                    temaClaro
                );


            darkThemeButton
                ?.classList
                .toggle(
                    "active",
                    !temaClaro
                );


        }



        function salvarTema(
            tema
        ) {


            localStorage.setItem(
                "loadsense_tema",
                tema
            );


            aplicarTema(
                tema
            );


        }



        const temaSalvo =
            localStorage.getItem(
                "loadsense_tema"
            ) || "dark";


        aplicarTema(
            temaSalvo
        );



        lightThemeButton
            ?.addEventListener(
                "click",
                () => {


                    salvarTema(
                        "light"
                    );


                }
            );



        darkThemeButton
            ?.addEventListener(
                "click",
                () => {


                    salvarTema(
                        "dark"
                    );


                }
            );



        // ==========================================
        // ELEMENTOS
        // ==========================================

        const formulario =
            document.getElementById(
                "cadastroForm"
            );


        const nome =
            document.getElementById(
                "nome"
            );


        const empresa =
            document.getElementById(
                "empresa"
            );


        const email =
            document.getElementById(
                "email"
            );


        const senha =
            document.getElementById(
                "senha"
            );


        const confirmarSenha =
            document.getElementById(
                "confirmarSenha"
            );


        const aceitarTermos =
            document.getElementById(
                "aceitarTermos"
            );


        const cadastroButton =
            document.getElementById(
                "cadastroButton"
            );



        // ==========================================
        // SENHA
        // ==========================================

        function configurarSenha(
            botaoId,
            input
        ) {


            const botao =
                document.getElementById(
                    botaoId
                );


            botao?.addEventListener(
                "click",
                () => {


                    input.type =
                        input.type === "password"
                            ? "text"
                            : "password";


                }
            );


        }



        configurarSenha(
            "mostrarSenha",
            senha
        );


        configurarSenha(
            "mostrarConfirmacao",
            confirmarSenha
        );



        // ==========================================
        // ERRO
        // ==========================================

        function mostrarErro(
            input,
            id,
            mensagem
        ) {


            const elemento =
                document.getElementById(
                    id
                );


            input
                ?.classList
                .add(
                    "input-error"
                );


            elemento.textContent =
                mensagem;


            elemento.classList.add(
                "visible"
            );


        }



        function limparErro(
            input,
            id
        ) {


            const elemento =
                document.getElementById(
                    id
                );


            input
                ?.classList
                .remove(
                    "input-error"
                );


            elemento.textContent =
                "";


            elemento.classList.remove(
                "visible"
            );


        }



        nome.addEventListener(
            "input",
            () =>
                limparErro(
                    nome,
                    "nomeError"
                )
        );


        empresa.addEventListener(
            "input",
            () =>
                limparErro(
                    empresa,
                    "empresaError"
                )
        );


        email.addEventListener(
            "input",
            () =>
                limparErro(
                    email,
                    "emailError"
                )
        );


        senha.addEventListener(
            "input",
            () =>
                limparErro(
                    senha,
                    "senhaError"
                )
        );


        confirmarSenha.addEventListener(
            "input",
            () =>
                limparErro(
                    confirmarSenha,
                    "confirmarSenhaError"
                )
        );


        aceitarTermos.addEventListener(
            "change",
            () =>
                limparErro(
                    null,
                    "termosError"
                )
        );



        // ==========================================
        // CADASTRO
        // ==========================================

        formulario.addEventListener(
            "submit",
            event => {


                event.preventDefault();


                let valido =
                    true;



                if (
                    nome.value
                        .trim()
                        .length < 3
                ) {


                    mostrarErro(
                        nome,
                        "nomeError",
                        "Informe seu nome completo."
                    );


                    valido =
                        false;


                }



                if (
                    empresa.value
                        .trim()
                        .length < 2
                ) {


                    mostrarErro(
                        empresa,
                        "empresaError",
                        "Informe o nome da empresa."
                    );


                    valido =
                        false;


                }



                const emailRegex =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



                if (
                    !emailRegex.test(
                        email.value.trim()
                    )
                ) {


                    mostrarErro(
                        email,
                        "emailError",
                        "Informe um e-mail válido."
                    );


                    valido =
                        false;


                }



                if (
                    senha.value.length < 6
                ) {


                    mostrarErro(
                        senha,
                        "senhaError",
                        "A senha deve possuir pelo menos 6 caracteres."
                    );


                    valido =
                        false;


                }



                if (
                    confirmarSenha.value !==
                    senha.value
                ) {


                    mostrarErro(
                        confirmarSenha,
                        "confirmarSenhaError",
                        "As senhas não coincidem."
                    );


                    valido =
                        false;


                }



                if (
                    !aceitarTermos.checked
                ) {


                    mostrarErro(
                        null,
                        "termosError",
                        "Aceite os termos para continuar."
                    );


                    valido =
                        false;


                }



                if (!valido) {

                    return;

                }



                const usuario = {


                    nome:
                        nome.value.trim(),


                    empresa:
                        empresa.value.trim(),


                    email:
                        email.value.trim()


                };



                localStorage.setItem(
                    "loadsense_cadastro",
                    JSON.stringify(
                        usuario
                    )
                );



                cadastroButton.classList.add(
                    "loading"
                );


                cadastroButton.textContent =
                    "Criando conta...";



                setTimeout(
                    () => {


                        alert(
                            "Conta criada com sucesso!"
                        );


                        window.location.href =
                            "../Login/Login.html";


                    },
                    600
                );


            }
        );


    }
);