"use strict";

/*
=========================================================
CONFIGURAÇÃO DAS PÁGINAS
=========================================================
*/

const LOGIN_NEXT_PAGE = "Dashboard.html";
const REGISTER_NEXT_PAGE = "index.html";

/*
=========================================================
FUNÇÕES AUXILIARES
=========================================================
*/

function getElement(id) {
  return document.getElementById(id);
}

function setFieldError(input, errorElement, message) {
  if (!input || !errorElement) {
    return;
  }

  const inputContainer = input.closest(".input-container");

  errorElement.textContent = message;

  input.setAttribute(
    "aria-invalid",
    message ? "true" : "false"
  );

  if (inputContainer) {
    inputContainer.classList.toggle(
      "has-error",
      Boolean(message)
    );
  }
}

function showFormMessage(element, message, type) {
  if (!element) {
    return;
  }

  element.textContent = message;
  element.className = `form-message is-visible ${type}`;
}

function hideFormMessage(element) {
  if (!element) {
    return;
  }

  element.textContent = "";
  element.className = "form-message";
}

/*
=========================================================
VALIDAÇÕES
=========================================================
*/

function validateRequiredText(
  input,
  errorElement,
  fieldName
) {
  if (!input || !errorElement) {
    return false;
  }

  const value = input.value.trim();

  if (!value) {
    setFieldError(
      input,
      errorElement,
      `Informe ${fieldName}.`
    );

    return false;
  }

  setFieldError(input, errorElement, "");

  return true;
}

function validateEmail(input, errorElement) {
  if (!input || !errorElement) {
    return false;
  }

  const email = input.value.trim();

  if (!email) {
    setFieldError(
      input,
      errorElement,
      "Informe o seu e-mail."
    );

    return false;
  }

  if (!input.validity.valid) {
    setFieldError(
      input,
      errorElement,
      "Digite um e-mail válido."
    );

    return false;
  }

  setFieldError(input, errorElement, "");

  return true;
}

function validatePassword(
  input,
  errorElement,
  minimumLength = 6
) {
  if (!input || !errorElement) {
    return false;
  }

  const password = input.value;

  if (!password) {
    setFieldError(
      input,
      errorElement,
      "Informe a sua senha."
    );

    return false;
  }

  if (password.length < minimumLength) {
    setFieldError(
      input,
      errorElement,
      `A senha precisa ter pelo menos ${minimumLength} caracteres.`
    );

    return false;
  }

  setFieldError(input, errorElement, "");

  return true;
}

/*
=========================================================
MOSTRAR E OCULTAR SENHA
=========================================================
*/

function configurePasswordToggles() {
  const toggleButtons = document.querySelectorAll(
    "[data-password-toggle]"
  );

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const inputId = button.dataset.passwordToggle;
      const passwordInput = getElement(inputId);

      if (!passwordInput) {
        return;
      }

      const passwordIsVisible =
        passwordInput.type === "text";

      passwordInput.type = passwordIsVisible
        ? "password"
        : "text";

      button.classList.toggle(
        "is-visible",
        !passwordIsVisible
      );

      button.setAttribute(
        "aria-pressed",
        String(!passwordIsVisible)
      );

      button.setAttribute(
        "aria-label",
        passwordIsVisible
          ? "Mostrar senha"
          : "Ocultar senha"
      );

      passwordInput.focus({
        preventScroll: true
      });
    });
  });
}

/*
=========================================================
TELA DE LOGIN
=========================================================
*/

function configureLoginForm() {
  const form = getElement("loginForm");

  if (!form) {
    return;
  }

  const emailInput = getElement("loginEmail");
  const passwordInput = getElement("loginPassword");

  const emailError = getElement("loginEmailError");
  const passwordError = getElement(
    "loginPasswordError"
  );

  if (
    !emailInput ||
    !passwordInput ||
    !emailError ||
    !passwordError
  ) {
    console.error(
      "Um ou mais elementos do formulário de login não foram encontrados."
    );

    return;
  }

  emailInput.addEventListener("blur", () => {
    validateEmail(emailInput, emailError);
  });

  passwordInput.addEventListener("blur", () => {
    validatePassword(
      passwordInput,
      passwordError,
      6
    );
  });

  emailInput.addEventListener("input", () => {
    if (emailError.textContent) {
      validateEmail(emailInput, emailError);
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordError.textContent) {
      validatePassword(
        passwordInput,
        passwordError,
        6
      );
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailIsValid = validateEmail(
      emailInput,
      emailError
    );

    const passwordIsValid = validatePassword(
      passwordInput,
      passwordError,
      6
    );

    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    const loginData = {
      email: emailInput.value.trim(),
      password: passwordInput.value
    };

    console.log(
      "Dados do login preparados:",
      loginData.email
    );

    /*
    =====================================================
    ÁREA RESERVADA PARA O BACK-END DO LOGIN
    =====================================================

    Quando a API estiver pronta, você poderá usar:

    try {
      const response = await fetch("/api/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(loginData)
      });

      const result = await response.json();

      if (!response.ok) {
        alert(
          result.message ||
          "E-mail ou senha incorretos."
        );

        return;
      }

      localStorage.setItem(
        "token",
        result.token
      );

      window.location.href = LOGIN_NEXT_PAGE;
    } catch (error) {
      console.error(error);

      alert(
        "Não foi possível conectar ao servidor."
      );
    }
    */

    window.location.href = LOGIN_NEXT_PAGE;
  });
}

/*
=========================================================
TELA DE CADASTRO
=========================================================
*/

function configureRegisterForm() {
  const form = getElement("registerForm");

  if (!form) {
    return;
  }

  const nameInput = getElement("registerName");
  const emailInput = getElement("registerEmail");
  const passwordInput = getElement(
    "registerPassword"
  );
  const confirmPasswordInput = getElement(
    "registerConfirmPassword"
  );

  const nameError = getElement(
    "registerNameError"
  );
  const emailError = getElement(
    "registerEmailError"
  );
  const passwordError = getElement(
    "registerPasswordError"
  );
  const confirmPasswordError = getElement(
    "registerConfirmPasswordError"
  );

  const formMessage = getElement(
    "registerFormMessage"
  );

  const submitButton = form.querySelector(
    'button[type="submit"]'
  );

  const submitButtonText =
    submitButton?.querySelector("span");

  if (
    !nameInput ||
    !emailInput ||
    !passwordInput ||
    !confirmPasswordInput ||
    !nameError ||
    !emailError ||
    !passwordError ||
    !confirmPasswordError ||
    !submitButton
  ) {
    console.error(
      "Um ou mais elementos do formulário de cadastro não foram encontrados."
    );

    return;
  }

  function validateName() {
    const name = nameInput.value.trim();

    const nameWasProvided =
      validateRequiredText(
        nameInput,
        nameError,
        "o seu nome"
      );

    if (!nameWasProvided) {
      return false;
    }

    if (name.length < 3) {
      setFieldError(
        nameInput,
        nameError,
        "Digite um nome com pelo menos 3 caracteres."
      );

      return false;
    }

    setFieldError(nameInput, nameError, "");

    return true;
  }

  function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmedPassword =
      confirmPasswordInput.value;

    if (!confirmedPassword) {
      setFieldError(
        confirmPasswordInput,
        confirmPasswordError,
        "Confirme a sua senha."
      );

      return false;
    }

    if (password !== confirmedPassword) {
      setFieldError(
        confirmPasswordInput,
        confirmPasswordError,
        "As senhas não são iguais."
      );

      return false;
    }

    setFieldError(
      confirmPasswordInput,
      confirmPasswordError,
      ""
    );

    return true;
  }

  nameInput.addEventListener(
    "blur",
    validateName
  );

  emailInput.addEventListener("blur", () => {
    validateEmail(emailInput, emailError);
  });

  passwordInput.addEventListener("blur", () => {
    validatePassword(
      passwordInput,
      passwordError,
      8
    );

    if (confirmPasswordInput.value) {
      validateConfirmPassword();
    }
  });

  confirmPasswordInput.addEventListener(
    "blur",
    validateConfirmPassword
  );

  nameInput.addEventListener("input", () => {
    hideFormMessage(formMessage);

    if (nameError.textContent) {
      validateName();
    }
  });

  emailInput.addEventListener("input", () => {
    hideFormMessage(formMessage);

    if (emailError.textContent) {
      validateEmail(
        emailInput,
        emailError
      );
    }
  });

  passwordInput.addEventListener("input", () => {
    hideFormMessage(formMessage);

    if (passwordError.textContent) {
      validatePassword(
        passwordInput,
        passwordError,
        8
      );
    }

    if (confirmPasswordInput.value) {
      validateConfirmPassword();
    }
  });

  confirmPasswordInput.addEventListener(
    "input",
    () => {
      hideFormMessage(formMessage);

      if (confirmPasswordError.textContent) {
        validateConfirmPassword();
      }
    }
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    hideFormMessage(formMessage);

    const nameIsValid = validateName();

    const emailIsValid = validateEmail(
      emailInput,
      emailError
    );

    const passwordIsValid = validatePassword(
      passwordInput,
      passwordError,
      8
    );

    const confirmationIsValid =
      validateConfirmPassword();

    if (
      !nameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !confirmationIsValid
    ) {
      return;
    }

    const registerData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value
    };

    console.log(
      "Cadastro preparado:",
      {
        name: registerData.name,
        email: registerData.email
      }
    );

    submitButton.disabled = true;

    if (submitButtonText) {
      submitButtonText.textContent =
        "Conta criada";
    }

    showFormMessage(
      formMessage,
      "Conta criada com sucesso. Redirecionando para o login...",
      "success"
    );

    /*
    =====================================================
    ÁREA RESERVADA PARA O BACK-END DO CADASTRO
    =====================================================

    Quando a API estiver pronta, transforme a função do
    submit em async e use:

    try {
      const response = await fetch(
        "/api/cadastro",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(registerData)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        showFormMessage(
          formMessage,
          result.message ||
          "Não foi possível criar a conta.",
          "error"
        );

        submitButton.disabled = false;

        if (submitButtonText) {
          submitButtonText.textContent =
            "Criar conta";
        }

        return;
      }

      window.location.href =
        REGISTER_NEXT_PAGE;
    } catch (error) {
      console.error(error);

      showFormMessage(
        formMessage,
        "Não foi possível conectar ao servidor.",
        "error"
      );

      submitButton.disabled = false;

      if (submitButtonText) {
        submitButtonText.textContent =
          "Criar conta";
      }
    }
    */

    window.setTimeout(() => {
      window.location.href =
        REGISTER_NEXT_PAGE;
    }, 900);
  });
}

/*
=========================================================
DASHBOARD
=========================================================
*/

function configureDashboard() {
  const searchInput = getElement(
    "operationSearch"
  );

  const operationRows = Array.from(
    document.querySelectorAll(
      ".operation-row"
    )
  );

  const operationsCounter = getElement(
    "operationsCounter"
  );

  const emptyOperations = getElement(
    "emptyOperations"
  );

  const navigationLinks =
    document.querySelectorAll(
      ".dashboard-nav-link"
    );

  /*
  Se a página atual não for o Dashboard,
  a função é encerrada sem gerar erros.
  */

  if (!searchInput) {
    return;
  }

  function normalizeText(text) {
    return String(text)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function updateOperationsCounter(
    visibleOperations
  ) {
    if (!operationsCounter) {
      return;
    }

    operationsCounter.textContent =
      visibleOperations === 1
        ? "1 operação"
        : `${visibleOperations} operações`;
  }

  function filterOperations() {
    const searchTerm = normalizeText(
      searchInput.value
    );

    let visibleOperations = 0;

    operationRows.forEach((row) => {
      const rowContent =
        row.dataset.search ||
        row.textContent ||
        "";

      const searchableText =
        normalizeText(rowContent);

      const shouldDisplay =
        searchableText.includes(searchTerm);

      row.classList.toggle(
        "is-hidden",
        !shouldDisplay
      );

      if (shouldDisplay) {
        visibleOperations += 1;
      }
    });

    updateOperationsCounter(
      visibleOperations
    );

    if (emptyOperations) {
      emptyOperations.classList.toggle(
        "is-visible",
        visibleOperations === 0
      );
    }
  }

  searchInput.addEventListener(
    "input",
    filterOperations
  );

  navigationLinks.forEach((link) => {
    link.addEventListener(
      "click",
      (event) => {
        const destination =
          link.getAttribute("href");

        /*
        Os links com "#" ainda são provisórios.
        Por isso, não mudam de página.
        */

        if (
          destination &&
          destination.startsWith("#")
        ) {
          event.preventDefault();
        }

        navigationLinks.forEach(
          (navigationItem) => {
            navigationItem.classList.remove(
              "active"
            );
          }
        );

        link.classList.add("active");
      }
    );
  });

  updateOperationsCounter(
    operationRows.length
  );
}

/*
=========================================================
INICIALIZAÇÃO
=========================================================
*/

document.addEventListener(
  "DOMContentLoaded",
  () => {
    configurePasswordToggles();
    configureLoginForm();
    configureRegisterForm();
    configureDashboard();
  }
);