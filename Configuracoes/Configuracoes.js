/* =====================================================
   LOADSENSE | CONFIGURAÇÕES + DOCUMENTOS LEGAIS
===================================================== */


/* =====================================================
   ELEMENTOS
===================================================== */

const settingsScreen =
    document.getElementById(
        "settingsScreen"
    );


const legalScreen =
    document.getElementById(
        "legalScreen"
    );


const legalContent =
    document.getElementById(
        "legalContent"
    );


const toast =
    document.getElementById(
        "toast"
    );


const themeButton =
    document.getElementById(
        "themeButton"
    );


const notificationButton =
    document.getElementById(
        "notificationButton"
    );


const testConnection =
    document.getElementById(
        "testConnection"
    );


const topSearch =
    document.getElementById(
        "topSearch"
    );


const weightTolerance =
    document.getElementById(
        "weightTolerance"
    );


const overloadLimit =
    document.getElementById(
        "overloadLimit"
    );


const weightUnit =
    document.getElementById(
        "weightUnit"
    );


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        showToast.timer
    );


    showToast.timer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2800
        );

}


/* =====================================================
   CONFIGURAÇÕES SALVAS
===================================================== */

const SETTINGS_KEY =
    "loadsense_configuracoes";


function saveSettings() {

    const settings = {

        weightTolerance:
            weightTolerance?.value ||
            "1.5",

        overloadLimit:
            overloadLimit?.value ||
            "3.0",

        weightUnit:
            weightUnit?.value ||
            "kg"

    };


    try {

        localStorage.setItem(
            SETTINGS_KEY,
            JSON.stringify(
                settings
            )
        );

    }

    catch (error) {

        console.error(
            "Erro ao salvar configurações:",
            error
        );

    }

}


function loadSettings() {

    try {

        const saved =
            localStorage.getItem(
                SETTINGS_KEY
            );


        if (!saved) {
            return;
        }


        const settings =
            JSON.parse(
                saved
            );


        if (
            weightTolerance &&
            settings.weightTolerance !==
                undefined
        ) {

            weightTolerance.value =
                settings.weightTolerance;

        }


        if (
            overloadLimit &&
            settings.overloadLimit !==
                undefined
        ) {

            overloadLimit.value =
                settings.overloadLimit;

        }


        if (
            weightUnit &&
            settings.weightUnit !==
                undefined
        ) {

            weightUnit.value =
                settings.weightUnit;

        }

    }

    catch (error) {

        console.error(
            "Erro ao carregar configurações:",
            error
        );

    }

}


loadSettings();


[
    weightTolerance,
    overloadLimit,
    weightUnit
]

    .filter(Boolean)

    .forEach(
        element => {

            element.addEventListener(
                "change",
                () => {

                    saveSettings();

                    showToast(
                        "Configuração salva."
                    );

                }
            );

        }
    );


/* =====================================================
   TOGGLES
===================================================== */

document
    .querySelectorAll(
        ".toggle"
    )
    .forEach(
        toggle => {


            const preference =
                toggle.dataset.preference;


            const key =
                `loadsense_preference_${preference}`;


            const saved =
                localStorage.getItem(
                    key
                );


            if (
                saved === "true"
            ) {

                toggle.classList.add(
                    "on"
                );

            }


            if (
                saved === "false"
            ) {

                toggle.classList.remove(
                    "on"
                );

            }


            toggle.addEventListener(
                "click",
                () => {


                    const enabled =
                        toggle.classList.toggle(
                            "on"
                        );


                    localStorage.setItem(
                        key,
                        String(enabled)
                    );


                    showToast(

                        enabled
                            ? "Preferência ativada."
                            : "Preferência desativada."

                    );

                }
            );

        }
    );


/* =====================================================
   TESTAR HARDWARE
===================================================== */

if (testConnection) {

    testConnection.addEventListener(
        "click",
        () => {


            const oldText =
                testConnection.textContent;


            testConnection.disabled =
                true;


            testConnection.textContent =
                "Testando conexão...";


            setTimeout(
                () => {


                    testConnection.disabled =
                        false;


                    testConnection.textContent =
                        oldText;


                    showToast(
                        "ESP32 e leitor RFID estão conectados."
                    );


                },
                1200
            );

        }
    );

}


/* =====================================================
   TEMA
===================================================== */

const savedTheme =
    localStorage.getItem(
        "loadsense_theme"
    );


if (
    savedTheme ===
    "light"
) {

    document.body.classList.add(
        "light-mode"
    );

}


if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {


            const light =
                document.body.classList.toggle(
                    "light-mode"
                );


            localStorage.setItem(
                "loadsense_theme",
                light
                    ? "light"
                    : "dark"
            );


            showToast(

                light
                    ? "Modo claro ativado."
                    : "Modo escuro ativado."

            );

        }
    );

}


/* =====================================================
   NOTIFICAÇÕES
===================================================== */

if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        () => {

            showToast(
                "Você possui 10 alertas pendentes."
            );

        }
    );

}


/* =====================================================
   PESQUISA
===================================================== */

if (topSearch) {

    topSearch.addEventListener(
        "keydown",
        event => {


            if (
                event.key !==
                "Enter"
            ) {

                return;

            }


            const value =
                topSearch.value.trim();


            if (!value) {

                showToast(
                    "Digite algo para pesquisar."
                );

                return;

            }


            showToast(
                `Pesquisa: ${value}`
            );

        }
    );

}


/* =====================================================
   CONTEÚDO LEGAL
===================================================== */

const legalPages = {


    termos: {

        title:
            "Termos de Uso",

        update:
            "Última atualização: 02 de setembro de 2026",

        intro:
            "Estes Termos de Uso estabelecem as condições de utilização da plataforma LoadSense e definem responsabilidades, regras de acesso e limites de utilização.",

        content: `

            <section class="legal-section">

                <h2>
                    <span class="legal-number">1.</span>
                    Aceitação dos termos
                </h2>

                <p>
                    Ao utilizar a plataforma LoadSense, o usuário declara
                    que leu, compreendeu e concorda com estes Termos de Uso.
                    A utilização da plataforma implica aceitação das condições
                    aqui apresentadas.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">2.</span>
                    Uso da plataforma
                </h2>

                <p>
                    O LoadSense oferece captura de dados de pesagem em tempo
                    real, cálculo de divergências entre carga esperada e carga
                    real, geração de alertas operacionais e relatórios.
                    A plataforma é uma ferramenta de apoio à gestão e não
                    substitui balanças rodoviárias oficiais aferidas pelo
                    INMETRO para fins fiscais ou legais.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">3.</span>
                    Cadastro e responsabilidades da conta
                </h2>

                <p>
                    O usuário é responsável pela veracidade dos dados
                    informados, pela guarda de suas credenciais e por toda
                    atividade realizada em sua conta. Contas são pessoais e
                    intransferíveis. Suspeitas de uso indevido devem ser
                    comunicadas imediatamente ao administrador da organização.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">4.</span>
                    Uso do hardware ESP32/HX711
                </h2>

                <p>
                    A precisão das leituras depende da correta instalação,
                    calibração e manutenção das células de carga. O usuário se
                    compromete a manter a calibração periódica registrada na
                    plataforma e a não adulterar o firmware ou os dados
                    transmitidos pelos dispositivos.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">5.</span>
                    Condutas proibidas
                </h2>

                <p>
                    É vedado: (a) inserir dados falsos de pesagem;
                    (b) tentar acessar contas de terceiros;
                    (c) realizar engenharia reversa, scraping automatizado
                    ou sobrecarga intencional dos servidores;
                    (d) utilizar a plataforma para finalidade ilícita,
                    incluindo excesso de peso deliberado em vias públicas.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">6.</span>
                    Propriedade intelectual
                </h2>

                <p>
                    A marca LoadSense, o software, a interface, os relatórios
                    e os modelos analíticos são de titularidade dos autores
                    do projeto. Os dados operacionais inseridos permanecem
                    de titularidade da empresa usuária.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">7.</span>
                    Limitação de responsabilidade
                </h2>

                <p>
                    A plataforma é fornecida "no estado em que se encontra",
                    em caráter de protótipo acadêmico. Não há garantia de
                    disponibilidade ininterrupta. O LoadSense não se
                    responsabiliza por multas, autuações ou prejuízos
                    decorrentes de decisões tomadas exclusivamente com base
                    nas informações exibidas.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">8.</span>
                    Suspensão e encerramento
                </h2>

                <p>
                    O acesso poderá ser suspenso em caso de violação destes
                    Termos. O usuário pode solicitar o encerramento da conta
                    a qualquer momento, com exclusão dos dados conforme a
                    Política de Privacidade.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">9.</span>
                    Alterações e foro
                </h2>

                <p>
                    Estes Termos podem ser atualizados a qualquer tempo, com
                    aviso na plataforma. Aplica-se a legislação brasileira,
                    elegendo-se o foro competente para questões relacionadas
                    à utilização da plataforma.
                </p>

            </section>

        `

    },


    privacidade: {

        title:
            "Política de Privacidade",

        update:
            "Última atualização: 02 de setembro de 2026",

        intro:
            "Esta política descreve como o LoadSense coleta, utiliza, armazena e protege os dados pessoais e operacionais tratados na plataforma, em conformidade com a Lei nº 13.709/2018 (LGPD).",

        content: `

            <section class="legal-section">

                <h2>
                    <span class="legal-number">1.</span>
                    Dados coletados
                </h2>

                <p>
                    <strong>Cadastrais:</strong>
                    nome, e-mail corporativo, cargo e empresa.
                    <br>

                    <strong>Operacionais:</strong>
                    placa do veículo, motorista responsável, peso esperado,
                    peso real medido, divergência, data/hora e rota.
                    <br>

                    <strong>Técnicos:</strong>
                    identificador do dispositivo ESP32, status de conexão,
                    taxa de amostragem do HX711, logs de acesso e endereço IP.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">2.</span>
                    Finalidades do tratamento
                </h2>

                <p>
                    Autenticar usuários, exibir indicadores em tempo real,
                    gerar alertas de divergência, produzir relatórios
                    gerenciais, treinar recomendações analíticas internas e
                    garantir a segurança da plataforma.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">3.</span>
                    Base legal
                </h2>

                <p>
                    O tratamento se apoia na execução de contrato, no legítimo
                    interesse para segurança operacional e no cumprimento de
                    obrigação legal referente ao transporte rodoviário de cargas.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">4.</span>
                    Compartilhamento
                </h2>

                <p>
                    Os dados não são vendidos. Podem ser compartilhados com
                    provedores de infraestrutura em nuvem, com a empresa
                    transportadora titular da operação e com autoridades
                    mediante requisição legal.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">5.</span>
                    Armazenamento e segurança
                </h2>

                <p>
                    Os registros de pesagem são mantidos por até 5 anos para
                    fins de auditoria. Aplicamos criptografia em trânsito,
                    controle de acesso por perfil e registro de auditoria
                    de operações sensíveis.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">6.</span>
                    Direitos do titular
                </h2>

                <p>
                    O titular pode solicitar confirmação da existência de
                    tratamento, acesso, correção, eliminação, informação sobre
                    compartilhamentos e demais direitos previstos na legislação
                    aplicável.
                </p>

            </section>

        `

    },


    cookies: {

        title:
            "Política de Cookies",

        update:
            "Última atualização: 02 de setembro de 2026",

        intro:
            "Utilizamos cookies e tecnologias similares para manter sua sessão segura, lembrar preferências e melhorar o desempenho da central LoadSense.",

        content: `

            <section class="legal-section">

                <h2>
                    <span class="legal-number">1.</span>
                    O que são cookies
                </h2>

                <p>
                    São pequenos arquivos gravados no navegador que permitem
                    reconhecer o dispositivo e manter informações entre as
                    visitas.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">2.</span>
                    Cookies utilizados
                </h2>


                <div class="cookie-table-wrap">

                    <table class="cookie-table">

                        <thead>

                            <tr>

                                <th>
                                    Nome
                                </th>

                                <th>
                                    Tipo
                                </th>

                                <th>
                                    Finalidade
                                </th>

                                <th>
                                    Prazo
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <tr>

                                <td class="cookie-name">
                                    ls_session
                                </td>

                                <td class="cookie-type">
                                    Essencial
                                </td>

                                <td>
                                    Manter o usuário autenticado na central
                                </td>

                                <td>
                                    Sessão
                                </td>

                            </tr>


                            <tr>

                                <td class="cookie-name">
                                    ls_theme
                                </td>

                                <td class="cookie-type">
                                    Preferência
                                </td>

                                <td>
                                    Guardar o tema escuro e ajustes de interface
                                </td>

                                <td>
                                    12 meses
                                </td>

                            </tr>


                            <tr>

                                <td class="cookie-name">
                                    ls_filtros
                                </td>

                                <td class="cookie-type">
                                    Funcional
                                </td>

                                <td>
                                    Lembrar filtros da planilha operacional
                                </td>

                                <td>
                                    30 dias
                                </td>

                            </tr>


                            <tr>

                                <td class="cookie-name">
                                    ls_metrics
                                </td>

                                <td class="cookie-type">
                                    Analítico
                                </td>

                                <td>
                                    Medir uso de telas e desempenho
                                </td>

                                <td>
                                    6 meses
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">3.</span>
                    Gerenciamento
                </h2>

                <p>
                    Cookies essenciais não podem ser desativados sem comprometer
                    o login. Os demais podem ser bloqueados nas configurações
                    do navegador ou no painel de Configurações da plataforma.
                </p>

            </section>

        `

    },


    lgpd: {

        title:
            "LGPD e Tratamento de Dados",

        update:
            "Última atualização: 02 de setembro de 2026",

        intro:
            "Central de transparência do LoadSense: aqui você entende como exercer seus direitos previstos na Lei Geral de Proteção de Dados e acompanha nossas práticas de governança.",

        content: `

            <section class="legal-section">

                <h2>
                    <span class="legal-number">1.</span>
                    Exerça seus direitos
                </h2>


                <div class="rights-grid">


                    <div class="right-card">

                        <div class="right-icon">
                            ↓
                        </div>

                        <div class="right-text">

                            <strong>
                                Exportar meus dados
                            </strong>

                            <span>
                                Receba um arquivo com todas as pesagens
                                vinculadas ao seu usuário.
                            </span>

                        </div>

                    </div>


                    <div class="right-card">

                        <div class="right-icon">
                            ↪
                        </div>

                        <div class="right-text">

                            <strong>
                                Corrigir informações
                            </strong>

                            <span>
                                Solicite ajuste de dados cadastrais
                                ou de registros de carga incorretos.
                            </span>

                        </div>

                    </div>


                    <div class="right-card">

                        <div class="right-icon">
                            ♢
                        </div>

                        <div class="right-text">

                            <strong>
                                Revisar consentimentos
                            </strong>

                            <span>
                                Gerencie autorizações de uso analítico
                                e comunicações.
                            </span>

                        </div>

                    </div>


                    <div class="right-card">

                        <div class="right-icon">
                            □
                        </div>

                        <div class="right-text">

                            <strong>
                                Excluir conta
                            </strong>

                            <span>
                                Peça a eliminação da conta e anonimização
                                dos registros operacionais.
                            </span>

                        </div>

                    </div>


                </div>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">2.</span>
                    Governança e segurança
                </h2>

                <p>
                    Adotamos princípios de minimização de dados, segregação
                    de perfis de acesso (administrador, operador e visualizador),
                    registro de auditoria e revisão periódica de permissões.
                    Incidentes de segurança relevantes são comunicados aos
                    titulares e à ANPD nos prazos legais.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">3.</span>
                    Retenção
                </h2>

                <p>
                    Dados de pesagem: 5 anos.
                    Logs de acesso: 6 meses.
                    Dados cadastrais: enquanto durar o vínculo com a
                    transportadora, salvo obrigação legal diversa.
                </p>

            </section>


            <section class="legal-section">

                <h2>
                    <span class="legal-number">4.</span>
                    Canal do titular
                </h2>

                <p>
                    Solicitações e dúvidas:
                    <strong>dpo@loadsense.com</strong>
                    — resposta em até 15 dias corridos.
                </p>

            </section>

        `

    }

};


/* =====================================================
   NAVEGAÇÃO ENTRE DOCUMENTOS
===================================================== */

function openLegalPage(
    page,
    updateHash = true
) {

    const data =
        legalPages[page];


    if (!data) {

        return;

    }


    if (settingsScreen) {

        settingsScreen.style.display =
            "none";

    }


    if (legalScreen) {

        legalScreen.classList.add(
            "show"
        );

    }


    document
        .querySelectorAll(
            ".legal-nav-button"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.legalPage ===
                    page
                );

            }
        );


    legalContent.innerHTML = `

        <h1>
            ${data.title}
        </h1>


        <div class="legal-update">

            ${data.update}

        </div>


        <p class="legal-intro">

            ${data.intro}

        </p>


        <div class="legal-panel">

            ${data.content}

        </div>

    `;


    if (updateHash) {

        window.location.hash =
            page;

    }


    window.scrollTo(
        {
            top: 0,
            behavior: "instant"
        }
    );

}


function closeLegalPage(
    updateHash = true
) {

    if (legalScreen) {

        legalScreen.classList.remove(
            "show"
        );

    }


    if (settingsScreen) {

        settingsScreen.style.display =
            "block";

    }


    if (updateHash) {

        history.replaceState(
            null,
            "",
            window.location.pathname
        );

    }


    window.scrollTo(
        {
            top: 0,
            behavior: "instant"
        }
    );

}


/* =====================================================
   BOTÕES DAS CARDS DA CONFIGURAÇÃO
===================================================== */

document
    .querySelectorAll(
        "[data-legal-page]"
    )
    .forEach(
        button => {


            button.addEventListener(
                "click",
                () => {

                    openLegalPage(
                        button.dataset.legalPage
                    );

                }
            );

        }
    );


/* =====================================================
   BOTÕES DE NAVEGAÇÃO DO DOCUMENTO
===================================================== */

document
    .querySelectorAll(
        ".legal-nav-button"
    )
    .forEach(
        button => {


            button.addEventListener(
                "click",
                () => {

                    openLegalPage(
                        button.dataset.legalPage
                    );

                }
            );

        }
    );


/* =====================================================
   HASH / BOTÃO VOLTAR DO NAVEGADOR
===================================================== */

function loadPageFromHash() {

    const page =
        window.location.hash
            .replace(
                "#",
                ""
            )
            .toLowerCase();


    if (
        legalPages[page]
    ) {

        openLegalPage(
            page,
            false
        );

    }

}


window.addEventListener(
    "hashchange",
    loadPageFromHash
);


window.addEventListener(
    "popstate",
    loadPageFromHash
);


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

loadPageFromHash();


/* =====================================================
   SAVE
===================================================== */

window.addEventListener(
    "beforeunload",
    saveSettings
);


console.log(
    "LoadSense Configurações carregado."
);