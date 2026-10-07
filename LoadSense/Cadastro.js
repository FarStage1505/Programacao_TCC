import {
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    auth
} from "./firebase-config.js";


/* =====================================================
   ELEMENTOS
===================================================== */

const form =
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


const mostrarSenha =
    document.getElementById(
        "mostrarSenha"
    );


const mostrarConfirmacao =
    document.getElementById(
        "mostrarConfirmacao"
    );


/* =====================================================
   ERROS
===================================================== */

const nomeError =
    document.getElementById(
        "nomeError"
    );


const empresaError =
    document.getElementById(
        "empresaError"
    );


const emailError =
    document.getElementById(
        "emailError"
    );


const senhaError =
    document.getElementById(
        "senhaError"
    );


const confirmarSenhaError =
    document.getElementById(
        "confirmarSenhaError"
    );


const termosError =
    document.getElementById(
        "termosError"
    );


/* =====================================================
   LIMPAR ERROS
===================================================== */

function clearErrors() {

    const errors = [

        nomeError,
        empresaError,
        emailError,
        senhaError,
        confirmarSenhaError,
        termosError

    ];


    errors.forEach(
        error => {

            if (!error) {
                return;
            }

            error.textContent =
                "";

            error.classList.remove(
                "visible"
            );

        }
    );


    const inputs = [

        nome,
        empresa,
        email,
        senha,
        confirmarSenha

    ];


    inputs.forEach(
        input => {

            if (!input) {
                return;
            }

            input.classList.remove(
                "input-error"
            );

        }
    );

}


/* =====================================================
   MOSTRAR ERRO
===================================================== */

function showError(
    input,
    errorElement,
    message
) {

    if (input) {

        input.classList.add(
            "input-error"
        );

    }


    if (errorElement) {

        errorElement.textContent =
            message;

        errorElement.classList.add(
            "visible"
        );

    }

}


/* =====================================================
   MOSTRAR / ESCONDER SENHA
===================================================== */

function togglePassword(
    input,
    button
) {

    if (!input || !button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            const isPassword =
                input.type ===
                "password";


            input.type =
                isPassword
                    ? "text"
                    : "password";


            button.innerHTML =
                isPassword
                    ? "🙈"
                    : "👁";

        }
    );

}


togglePassword(
    senha,
    mostrarSenha
);


togglePassword(
    confirmarSenha,
    mostrarConfirmacao
);


/* =====================================================
   TEMA
===================================================== */

const lightThemeButton =
    document.getElementById(
        "lightThemeButton"
    );


const darkThemeButton =
    document.getElementById(
        "darkThemeButton"
    );


function updateThemeButtons() {

    const light =
        document.documentElement.classList
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
   CADASTRO
===================================================== */

form.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        clearErrors();


        const nomeValue =
            nome.value.trim();


        const empresaValue =
            empresa.value.trim();


        const emailValue =
            email.value.trim();


        const senhaValue =
            senha.value;


        const confirmarValue =
            confirmarSenha.value;


        let hasError =
            false;


        /* NOME */

        if (!nomeValue) {

            showError(
                nome,
                nomeError,
                "Digite seu nome completo."
            );

            hasError =
                true;

        }


        /* EMPRESA */

        if (!empresaValue) {

            showError(
                empresa,
                empresaError,
                "Digite o nome da empresa."
            );

            hasError =
                true;

        }


        /* EMAIL */

        if (!emailValue) {

            showError(
                email,
                emailError,
                "Digite seu e-mail."
            );

            hasError =
                true;

        }

        else {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    emailValue
                )
            ) {

                showError(
                    email,
                    emailError,
                    "Digite um e-mail válido."
                );

                hasError =
                    true;

            }

        }


        /* SENHA */

        if (!senhaValue) {

            showError(
                senha,
                senhaError,
                "Digite uma senha."
            );

            hasError =
                true;

        }

        else if (
            senhaValue.length <
            6
        ) {

            showError(
                senha,
                senhaError,
                "A senha precisa ter pelo menos 6 caracteres."
            );

            hasError =
                true;

        }


        /* CONFIRMAÇÃO */

        if (!confirmarValue) {

            showError(
                confirmarSenha,
                confirmarSenhaError,
                "Confirme sua senha."
            );

            hasError =
                true;

        }

        else if (
            senhaValue !==
            confirmarValue
        ) {

            showError(
                confirmarSenha,
                confirmarSenhaError,
                "As senhas não coincidem."
            );

            hasError =
                true;

        }


        /* TERMOS */

        if (
            !aceitarTermos.checked
        ) {

            if (termosError) {

                termosError.textContent =
                    "Você precisa aceitar os termos.";

                termosError.classList.add(
                    "visible"
                );

            }

            hasError =
                true;

        }


        if (hasError) {
            return;
        }


        /* =================================================
           DESABILITAR BOTÃO
        ================================================= */

        cadastroButton.classList.add(
            "loading"
        );


        cadastroButton.disabled =
            true;


        cadastroButton.textContent =
            "Criando conta...";


        try {


            /* =================================================
               CRIAR USUÁRIO NO FIREBASE
            ================================================= */

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    emailValue,
                    senhaValue
                );


            const user =
                userCredential.user;


            /* =================================================
               SALVAR NOME NO PERFIL FIREBASE
            ================================================= */

            await updateProfile(
                user,
                {
                    displayName:
                        nomeValue
                }
            );


            console.log(
                "Usuário criado:",
                user.uid
            );


            console.log(
                "E-mail:",
                user.email
            );


            /* =================================================
               REDIRECIONAMENTO
            ================================================= */

            window.location.href =
                "Dashboard.html";


        }

        catch (error) {

            console.error(
                "Erro no cadastro Firebase:",
                error
            );


            cadastroButton.classList.remove(
                "loading"
            );


            cadastroButton.disabled =
                false;


            cadastroButton.textContent =
                "Criar conta →";


            switch (
                error.code
            ) {


                case
                    "auth/email-already-in-use":

                    showError(
                        email,
                        emailError,
                        "Este e-mail já está cadastrado."
                    );

                    break;


                case
                    "auth/invalid-email":

                    showError(
                        email,
                        emailError,
                        "Digite um e-mail válido."
                    );

                    break;


                case
                    "auth/weak-password":

                    showError(
                        senha,
                        senhaError,
                        "A senha informada é muito fraca."
                    );

                    break;


                case
                    "auth/network-request-failed":

                    alert(
                        "Não foi possível conectar ao Firebase. Verifique sua internet."
                    );

                    break;


                default:

                    alert(
                        "Não foi possível realizar o cadastro.\nCódigo: " +
                        error.code
                    );

            }

        }

    }
);