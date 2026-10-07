/* =========================================================
   LOADSENSE - RELATÓRIOS.JS
   ========================================================= */


/* =========================================================
   CONFIGURAÇÃO

   false = usa os dados simulados abaixo.
   true  = futuramente buscará os dados da API/banco.
   ========================================================= */

const USAR_API = false;


/* =========================================================
   DADOS SIMULADOS

   Futuramente estes dados serão substituídos pelos dados
   retornados pelo banco de dados.
   ========================================================= */

const relatoriosMock = {

    semanal: {

        titulo: "Relatório Semanal",

        grafico: [
            { label: "Seg", operacoes: 42 },
            { label: "Ter", operacoes: 55 },
            { label: "Qua", operacoes: 48 },
            { label: "Qui", operacoes: 60 },
            { label: "Sex", operacoes: 38 },
            { label: "Sáb", operacoes: 25 },
            { label: "Dom", operacoes: 13 }
        ],

        status: {
            normal: 15,
            atencao: 7,
            critico: 4,
            analise: 2
        },

        recomendacoes: [

            "Picos de operações na quinta-feira: recomenda-se alocar equipe extra neste dia.",

            "Domingo apresentou menor volume operacional; período adequado para manutenção preventiva da balança.",

            "Parte das operações de sexta-feira apresentou divergência acima da tolerância no turno da tarde."

        ]
    },


    mensal: {

        titulo: "Relatório Mensal",

        grafico: [
            { label: "Sem 1", operacoes: 108 },
            { label: "Sem 2", operacoes: 136 },
            { label: "Sem 3", operacoes: 121 },
            { label: "Sem 4", operacoes: 149 }
        ],

        status: {
            normal: 86,
            atencao: 23,
            critico: 13,
            analise: 6
        },

        recomendacoes: [

            "A quarta semana apresentou o maior volume de pesagens do mês.",

            "A quantidade de operações críticas diminuiu em relação às primeiras semanas.",

            "Recomenda-se revisar preventivamente os equipamentos antes das semanas de maior demanda."

        ]
    },


    bimestral: {

        titulo: "Relatório Bimestral",

        grafico: [
            { label: "Mês 1", operacoes: 514 },
            { label: "Mês 2", operacoes: 583 }
        ],

        status: {
            normal: 719,
            atencao: 214,
            critico: 109,
            analise: 55
        },

        recomendacoes: [

            "O segundo mês apresentou crescimento no número total de operações.",

            "Houve redução proporcional dos casos críticos no período.",

            "A IA recomenda analisar rotas e cargas que concentram maior quantidade de divergências."

        ]
    },


    trimestral: {

        titulo: "Relatório Trimestral",

        grafico: [
            { label: "Mês 1", operacoes: 514 },
            { label: "Mês 2", operacoes: 583 },
            { label: "Mês 3", operacoes: 642 }
        ],

        status: {
            normal: 1187,
            atencao: 318,
            critico: 156,
            analise: 78
        },

        recomendacoes: [

            "O terceiro mês apresentou o maior volume operacional do trimestre.",

            "As divergências vêm apresentando redução proporcional mesmo com o aumento das operações.",

            "Caso o crescimento continue, recomenda-se avaliar aumento da capacidade operacional."

        ]
    }

};



/* =========================================================
   ELEMENTOS DA TELA
   ========================================================= */

const cardsRelatorio =
    document.querySelectorAll(".report-card");


const tituloRelatorio =
    document.getElementById("reportTitle");


const grafico =
    document.getElementById("chart");


const listaRecomendacoes =
    document.getElementById("recommendationList");


const tooltip =
    document.getElementById("chartTooltip");


const tooltipLabel =
    document.getElementById("tooltipLabel");


const tooltipValue =
    document.getElementById("tooltipValue");


const botaoPDF =
    document.getElementById("exportPdf");


const botaoExcel =
    document.getElementById("exportExcel");


const toast =
    document.getElementById("toast");


const toastText =
    document.getElementById("toastText");



/* =========================================================
   RELATÓRIO ATUAL
   ========================================================= */

let periodoAtual = "semanal";

let dadosAtuais = null;



/* =========================================================
   OBTER DADOS DO RELATÓRIO

   Hoje:
   pega os dados simulados.

   Futuramente:
   poderá consultar uma API ligada ao MySQL.
   ========================================================= */

async function obterDadosRelatorio(periodo) {

    if (USAR_API) {

        try {

            const resposta =
                await fetch(
                    `/api/relatorios?periodo=${periodo}`
                );


            if (!resposta.ok) {

                throw new Error(
                    "Erro ao carregar relatório"
                );

            }


            return await resposta.json();

        }

        catch (erro) {

            console.error(
                "Erro ao consultar API:",
                erro
            );


            mostrarToast(
                "Não foi possível carregar os dados."
            );


            return null;

        }

    }


    /* Dados simulados */

    return relatoriosMock[periodo];

}



/* =========================================================
   CARREGAR RELATÓRIO
   ========================================================= */

async function carregarRelatorio(periodo) {

    const dados =
        await obterDadosRelatorio(periodo);


    if (!dados) {
        return;
    }


    periodoAtual =
        periodo;


    dadosAtuais =
        dados;


    atualizarTitulo(dados);

    atualizarGrafico(dados);

    atualizarTabela(dados);

    atualizarRecomendacoes(dados);

}



/* =========================================================
   ATUALIZAR TÍTULO
   ========================================================= */

function atualizarTitulo(dados) {

    tituloRelatorio.textContent =
        `Prévia — ${dados.titulo}`;

}



/* =========================================================
   ATUALIZAR GRÁFICO
   ========================================================= */

function atualizarGrafico(dados) {

    grafico.innerHTML = "";


    if (
        !dados.grafico ||
        dados.grafico.length === 0
    ) {

        grafico.innerHTML = `
            <p style="
                color:#888;
                width:100%;
                text-align:center;
                margin:auto;
            ">
                Nenhum dado encontrado para este período.
            </p>
        `;

        return;

    }


    const valores =
        dados.grafico.map(
            item => item.operacoes
        );


    const maiorValor =
        Math.max(...valores);


    dados.grafico.forEach(item => {

        const coluna =
            document.createElement("div");


        coluna.className =
            "chart-column";


        const barra =
            document.createElement("div");


        barra.className =
            "chart-bar";


        /* Calcula a altura da barra */

        const altura =
            maiorValor > 0
                ? (item.operacoes / maiorValor) * 100
                : 0;


        barra.style.height =
            `${altura}%`;


        barra.dataset.valor =
            item.operacoes;


        barra.dataset.label =
            item.label;



        /* Nome embaixo da barra */

        const label =
            document.createElement("span");


        label.className =
            "chart-label";


        label.textContent =
            item.label;



        /* Tooltip */

        barra.addEventListener(
            "mouseenter",
            event => {

                mostrarTooltip(
                    event,
                    item.label,
                    item.operacoes
                );

            }
        );


        barra.addEventListener(
            "mousemove",
            moverTooltip
        );


        barra.addEventListener(
            "mouseleave",
            esconderTooltip
        );



        coluna.appendChild(barra);

        coluna.appendChild(label);

        grafico.appendChild(coluna);

    });

}



/* =========================================================
   ATUALIZAR TABELA
   ========================================================= */

function atualizarTabela(dados) {

    const status =
        dados.status;


    if (!status) {
        return;
    }


    const total =
        status.normal +
        status.atencao +
        status.critico +
        status.analise;


    const linhas =
        document.querySelectorAll(
            ".status-table .table-row"
        );


    const valores = [

        {
            quantidade: status.normal
        },

        {
            quantidade: status.atencao
        },

        {
            quantidade: status.critico
        },

        {
            quantidade: status.analise
        }

    ];


    linhas.forEach(
        (linha, index) => {

            const colunas =
                linha.querySelectorAll("span");


            const quantidade =
                valores[index].quantidade;


            const percentual =
                total > 0
                    ? (
                        quantidade /
                        total *
                        100
                    )
                    : 0;


            /*
                coluna 0 = nome do status
                coluna 1 = quantidade
                coluna 2 = porcentagem
            */

            colunas[1].textContent =
                quantidade;


            colunas[2].textContent =
                percentual.toFixed(1) + "%";

        }
    );

}



/* =========================================================
   ATUALIZAR RECOMENDAÇÕES DA IA
   ========================================================= */

function atualizarRecomendacoes(dados) {

    listaRecomendacoes.innerHTML = "";


    if (
        !dados.recomendacoes ||
        dados.recomendacoes.length === 0
    ) {

        listaRecomendacoes.innerHTML =
            "<li>Nenhuma recomendação disponível.</li>";


        return;

    }


    dados.recomendacoes.forEach(
        recomendacao => {

            const item =
                document.createElement("li");


            item.textContent =
                recomendacao;


            listaRecomendacoes.appendChild(
                item
            );

        }
    );

}



/* =========================================================
   CLIQUE NOS PERÍODOS
   ========================================================= */

cardsRelatorio.forEach(card => {

    card.addEventListener(
        "click",
        async function () {

            /*
                Descobre qual período
                pertence ao botão.
            */

            const periodo =
                this.dataset.report;


            if (!periodo) {
                return;
            }


            /*
                Remove o destaque de
                todos os botões.
            */

            cardsRelatorio.forEach(
                item => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            /*
                Marca o botão clicado.
            */

            this.classList.add(
                "active"
            );


            /*
                Atualiza todo o dashboard.
            */

            await carregarRelatorio(
                periodo
            );

        }
    );

});



/* =========================================================
   TOOLTIP DO GRÁFICO
   ========================================================= */

function mostrarTooltip(
    event,
    label,
    valor
) {

    tooltipLabel.textContent =
        label;


    tooltipValue.textContent =
        `Operações: ${valor}`;


    tooltip.classList.add(
        "show"
    );


    moverTooltip(event);

}



function moverTooltip(event) {

    tooltip.style.left =
        `${event.clientX + 15}px`;


    tooltip.style.top =
        `${event.clientY - 65}px`;

}



function esconderTooltip() {

    tooltip.classList.remove(
        "show"
    );

}



/* =========================================================
   TOAST
   ========================================================= */

let timerToast;


function mostrarToast(mensagem) {

    if (
        !toast ||
        !toastText
    ) {
        return;
    }


    clearTimeout(timerToast);


    toastText.textContent =
        mensagem;


    toast.classList.add(
        "show"
    );


    timerToast =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },

            2300
        );

}



/* =========================================================
   EXPORTAR PDF
   ========================================================= */

if (botaoPDF) {

    botaoPDF.addEventListener(
        "click",
        () => {

            mostrarToast(
                "Preparando relatório em PDF..."
            );


            /*
                FUTURAMENTE:

                Aqui poderá ser utilizado:

                - jsPDF
                - Backend
                - API de geração de relatório

                utilizando os dados armazenados
                em dadosAtuais.
            */


            console.log(
                "Exportação PDF:",
                dadosAtuais
            );

        }
    );

}



/* =========================================================
   EXPORTAR EXCEL
   ========================================================= */

if (botaoExcel) {

    botaoExcel.addEventListener(
        "click",
        () => {

            if (!dadosAtuais) {

                mostrarToast(
                    "Nenhum relatório carregado."
                );

                return;

            }


            mostrarToast(
                "Exportando relatório para Excel..."
            );


            gerarCSV();

        }
    );

}



/* =========================================================
   GERAR CSV
   ========================================================= */

function gerarCSV() {

    if (!dadosAtuais) {
        return;
    }


    let csv =
        "Periodo;Operacoes\n";


    dadosAtuais.grafico.forEach(
        item => {

            csv +=
                `${item.label};${item.operacoes}\n`;

        }
    );


    csv += "\n";


    csv +=
        "Status;Operacoes\n";


    csv +=
        `Normal;${dadosAtuais.status.normal}\n`;


    csv +=
        `Atencao;${dadosAtuais.status.atencao}\n`;


    csv +=
        `Critico;${dadosAtuais.status.critico}\n`;


    csv +=
        `Analise;${dadosAtuais.status.analise}\n`;



    const blob =
        new Blob(
            [
                "\uFEFF" + csv
            ],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href =
        url;


    link.download =
        `LoadSense_Relatorio_${periodoAtual}.csv`;


    document.body.appendChild(link);


    link.click();


    document.body.removeChild(link);


    URL.revokeObjectURL(url);

}



/* =========================================================
   BUSCA SUPERIOR
   ========================================================= */

const campoBusca =
    document.querySelector(
        ".search-box input"
    );


if (campoBusca) {

    campoBusca.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                const pesquisa =
                    campoBusca
                        .value
                        .trim();


                if (!pesquisa) {
                    return;
                }


                console.log(
                    "Buscar:",
                    pesquisa
                );


                /*
                    Futuramente poderá fazer:

                    fetch(
                        `/api/operacoes?busca=${pesquisa}`
                    )

                    para consultar operação,
                    placa ou motorista.
                */

            }

        }
    );

}



/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        /*
            O sistema começa mostrando
            o relatório semanal.
        */

        await carregarRelatorio(
            "semanal"
        );


        /*
            Renderiza ícones Lucide.
        */

        if (
            typeof lucide !==
            "undefined"
        ) {

            lucide.createIcons();

        }

    }
);