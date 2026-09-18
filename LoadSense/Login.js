import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =====================================================
   ELEMENTOS
===================================================== */

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


const emailError =
    document.getElementById(
        "emailError"
    );


const senhaError =
    document.getElementById(
        "senhaError"
    );


const lightThemeButton =
    document.getElementById(
        "lightThemeButton"
    );


const darkThemeButton =
    document.getElementById(
        "darkThemeButton"
    );


/* =====================================================
   ERROS
===================================================== */

function clearErrors() {

    if (emailError) {

        emailError.textContent =
            "";

        emailError.classList.remove(
            "visible"
        );

    }


    if (senhaError) {

        senhaError.textContent =
            "";

        senhaError.classList.remove(
            "visible"
        );

    }


    emailInput?.classList.remove(
        "input-error"
    );


    senhaInput?.classList.remove(
        "input-error"
    );

}


function showError(
    input,
    error,
    message
) {

    input?.classList.add(
        "input-error"
    );


    if (error) {

        error.textContent =
            message;

        error.classList.add(
            "visible"
        );

    }

}


/* =====================================================
   MOSTRAR SENHA
===================================================== */

showPassword?.addEventListener(
    "click",
    () => {


        const isPassword =
            senhaInput.type ===
            "password";


        senhaInput.type =
            isPassword
                ? "text"
                : "password";


        showPassword.innerHTML =
            isPassword

                ? `

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                    >

                        <path
                            d="
                                M3 3
                                L21 21
                            "
                            stroke="currentColor"
                            stroke-width="1.6"
                            stroke-linecap="round"
                        />

                        <path
                            d="
                                M10.6 6.7
                                C11.05 6.57
                                11.51 6.5
                                12 6.5
                                C16.2 6.5 19.4 8.5 21.5 12
                                C20.7 13.3 19.8 14.4 18.7 15.3
                            "
                            stroke="currentColor"
                            stroke-width="1.6"
                            stroke-linecap="round"
                        />

                        <path
                            d="
                                M6.1 9.4
                                C4.6 10.1 3.4 11
                                2.5 12
                                C4.6 15.5 7.8 17.5 12 17.5
                                C13.3 17.5 14.5 17.3 15.6 16.9
                            "
                            stroke="currentColor"
                            stroke-width="1.6"
                            stroke-linecap="round"
                        />

                    </svg>

                `

                : `

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                    >

                        <path
                            d="
                                M2.5 12
                                C4.6 8.5 7.8 6.5 12 6.5
                                C16.2 6.5 19.4 8.5 21.5 12
                                C19.4 15.5 16.2 17.5 12 17.5
                                C7.8 17.5 4.6 15.5 2.5 12Z
                            "
                            stroke="currentColor"
                            stroke-width="1.6"
                        />

                        <circle
                            cx="12"
                            cy="12"
                            r="2.5"
                            stroke="currentColor"
                            stroke-width="1.6"
                        />

                    </svg>

                `;

    }
);


/* =====================================================
   TEMA
===================================================== */

function updateThemeButtons() {

    const light =
        document.documentElement
            .classList
            .contains(
                "light-theme"
            );


    lightThemeButton?.classList.toggle(
        "active",
        light
    );


    darkThemeButton?.classList.toggle(
        "active",
        !light
    );

}


function setTheme(
    theme
) {

    if (
        theme ===
        "light"
    ) {

        document.documentElement.classList.add(
            "light-theme"
        );


        localStorage.setItem(
            "loadsense-theme",
            "light"
        );

    }

    else {

        document.documentElement.classList.remove(
            "light-theme"
        );


        localStorage.setItem(
            "loadsense-theme",
            "dark"
        );

    }


    updateThemeButtons();

}


const savedTheme =
    localStorage.getItem(
        "loadsense-theme"
    );


setTheme(
    savedTheme ===
    "light"
        ? "light"
        : "dark"
);


lightThemeButton?.addEventListener(
    "click",
    () => {

        setTheme(
            "light"
        );

    }
);


darkThemeButton?.addEventListener(
    "click",
    () => {

        setTheme(
            "dark"
        );

    }
);


/* =====================================================
   LOGIN
===================================================== */

loginForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        clearErrors();


        const email =
            emailInput.value.trim();


        const senha =
            senhaInput.value;


        let hasError =
            false;


        if (!email) {

            showError(
                emailInput,
                emailError,
                "Digite seu e-mail."
            );

            hasError =
                true;

        }


        if (!senha) {

            showError(
                senhaInput,
                senhaError,
                "Digite sua senha."
            );

            hasError =
                true;

        }


        if (hasError) {
            return;
        }


        loginButton.disabled =
            true;


        loginButton.classList.add(
            "loading"
        );


        const originalContent =
            loginButton.innerHTML;


        loginButton.innerHTML = `

            <span>
                Entrando...
            </span>

        `;


        try {


            const result =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    senha
                );


            console.log(
                "Login realizado:",
                result.user.uid
            );


            console.log(
                "Usuário:",
                result.user.email
            );


            /*
               COLOQUE AQUI O CAMINHO REAL DO
               SEU DASHBOARD.
            */

            window.location.href =
                "../Dashboard/Dashboard.html";


        }

        catch (error) {

            console.error(
                "Erro no login:",
                error
            );


            loginButton.disabled =
                false;


            loginButton.classList.remove(
                "loading"
            );


            loginButton.innerHTML =
                originalContent;


            switch (
                error.code
            ) {


                case
                    "auth/invalid-credential":

                    showError(
                        senhaInput,
                        senhaError,
                        "E-mail ou senha incorretos."
                    );

                    break;


                case
                    "auth/invalid-email":

                    showError(
                        emailInput,
                        emailError,
                        "Digite um e-mail válido."
                    );

                    break;


                case
                    "auth/user-disabled":

                    showError(
                        emailInput,
                        emailError,
                        "Esta conta foi desativada."
                    );

                    break;


                case
                    "auth/network-request-failed":

                    alert(
                        "Não foi possível conectar ao Firebase."
                    );

                    break;


                default:

                    alert(
                        "Erro ao fazer login.\nCódigo: " +
                        error.code
                    );

            }

        }

    }
);


/* =====================================================
   RECUPERAÇÃO DE SENHA
===================================================== */

forgotPassword?.addEventListener(
    "click",
    async event => {

        event.preventDefault();


        clearErrors();


        const email =
            emailInput.value.trim();


        if (!email) {

            showError(
                emailInput,
                emailError,
                "Digite seu e-mail para recuperar a senha."
            );


            emailInput.focus();


            return;

        }


        try {

            await sendPasswordResetEmail(
                auth,
                email
            );


            alert(
                "Se existir uma conta para esse e-mail, as instruções de recuperação serão enviadas."
            );

        }

        catch (error) {

            console.error(
                "Erro na recuperação:",
                error
            );


            if (
                error.code ===
                "auth/invalid-email"
            ) {

                showError(
                    emailInput,
                    emailError,
                    "Digite um e-mail válido."
                );

            }

            else {

                alert(
                    "Não foi possível iniciar a recuperação da senha."
                );

            }

        }

    }
);


/* =====================================================
   VERIFICAR USUÁRIO JÁ LOGADO
===================================================== */

onAuthStateChanged(
    auth,
    user => {

        if (user) {

            console.log(
                "Usuário atualmente autenticado:",
                user.email
            );

        }

    }
);


console.log(
    "LoadSense Login + Firebase carregado."
);