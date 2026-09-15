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

            if (tema === "light") {

                document.body.classList.add(
                    "light-theme"
                );


                lightThemeButton?.classList.add(
                    "active"
                );


                darkThemeButton?.classList.remove(
                    "active"
                );

            }

            else {

                document.body.classList.remove(
                    "light-theme"
                );


                darkThemeButton?.classList.add(
                    "active"
                );


                lightThemeButton?.classList.remove(
                    "active"
                );

            }


            localStorage.setItem(
                "loadsense_tema",
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



        lightThemeButton?.addEventListener(
            "click",
            () => {

                aplicarTema(
                    "light"
                );

            }
        );


        darkThemeButton?.addEventListener(
            "click",
            () => {

                aplicarTema(
                    "dark"
                );

            }
        );



        // ==========================================
        // LOGIN
        // ==========================================

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        const emailInput =
            document.getElementById(
                "email"
            );


        const senhaInput =
            document.getElementById(
                "senha"
            );


        const emailError =
            document.getElementById(
                "emailError"
            );


        const senhaError =
            document.getElementById(
                "senhaError"
            );


        const loginButton =
            document.getElementById(
                "loginButton"
            );


        const showPassword =
            document.getElementById(
                "showPassword"
            );


        const forgotPassword =
            document.getElementById(
                "forgotPassword"
            );



        // ==========================================
        // MOSTRAR SENHA
        // ==========================================

        showPassword?.addEventListener(
            "click",
            () => {

                senhaInput.type =
                    senhaInput.type === "password"
                        ? "text"
                        : "password";

            }
        );



        // ==========================================
        // VALIDAR EMAIL
        // ==========================================

        function validarEmail(
            email
        ) {

            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(
                    email
                );

        }



        // ==========================================
        // ERROS
        // ==========================================

        function mostrarErro(
            input,
            erro,
            mensagem
        ) {

            input.classList.add(
                "input-error"
            );


            erro.textContent =
                mensagem;


            erro.classList.add(
                "visible"
            );

        }



        function limparErro(
            input,
            erro
        ) {

            input.classList.remove(
                "input-error"
            );


            erro.textContent =
                "";


            erro.classList.remove(
                "visible"
            );

        }



        emailInput?.addEventListener(
            "input",
            () => {

                limparErro(
                    emailInput,
                    emailError
                );

            }
        );


        senhaInput?.addEventListener(
            "input",
            () => {

                limparErro(
                    senhaInput,
                    senhaError
                );

            }
        );



        // ==========================================
        // SUBMIT
        // ==========================================

        loginForm?.addEventListener(
            "submit",
            event => {


                event.preventDefault();


                const email =
                    emailInput.value.trim();


                const senha =
                    senhaInput.value;


                let valido =
                    true;



                if (!email) {

                    mostrarErro(
                        emailInput,
                        emailError,
                        "Informe seu e-mail."
                    );

                    valido =
                        false;

                }

                else if (
                    !validarEmail(
                        email
                    )
                ) {

                    mostrarErro(
                        emailInput,
                        emailError,
                        "Informe um e-mail válido."
                    );

                    valido =
                        false;

                }



                if (!senha) {

                    mostrarErro(
                        senhaInput,
                        senhaError,
                        "Informe sua senha."
                    );

                    valido =
                        false;

                }



                if (!valido) {

                    return;

                }



                loginButton.classList.add(
                    "loading"
                );


                loginButton.innerHTML =
                    "<span>Entrando...</span>";



                localStorage.setItem(
                    "loadsense_usuario",
                    JSON.stringify({

                        email:
                            email,

                        nome:
                            "Renato Admin",

                        perfil:
                            "Administrador"

                    })
                );



                setTimeout(
                    () => {

                        window.location.href =
                            "../Dashboards/Dashboards.html";

                    },
                    600
                );


            }
        );



        // ==========================================
        // ESQUECI A SENHA
        // ==========================================

        forgotPassword?.addEventListener(
            "click",
            event => {

                event.preventDefault();

                alert(
                    "A recuperação de senha será conectada posteriormente."
                );

            }
        );


    }
);