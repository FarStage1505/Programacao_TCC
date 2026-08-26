/* ============================= */
/* DADOS DOS ALERTAS */
/* ============================= */

const alerts = [

    {
        operation: "OP-2477",
        title: "Possível falta de carga",
        level: "critical",
        levelText: "Crítico",
        date: "15/06, 11:39",

        plate: "RTY2U10",
        driver: "Júlia Castro",
        rfid: "RF-1883B",
        cargo: "Aço",

        route: "Cascavel → Pato Branco",
        responsible: "Op. Camila",

        emptyWeight: "14.977 kg",
        cargoWeight: "21.319 kg",
        expected: "36.296 kg",
        real: "34.304 kg",
        difference: "-1.992 kg (-5.49%)",

        description:
            "Possível falta de carga na operação OP-2477 — caminhão RTY2U10, motorista Júlia Castro. Diferença de -1.992 kg (-5.49%).",

        alertDescription: "Verificar carga e lacre."
    },


    {
        operation: "OP-2475",
        title: "Possível falta de carga",
        level: "warning",
        levelText: "Atenção",
        date: "15/06, 13:05",

        plate: "ZXC8V67",
        driver: "Felipe Rocha",
        rfid: "RF-1894D",
        cargo: "Fertilizante",

        route: "Foz do Iguaçu → Londrina",
        responsible: "Op. Diego",

        emptyWeight: "14.492 kg",
        cargoWeight: "12.381 kg",
        expected: "26.873 kg",
        real: "26.103 kg",
        difference: "-770 kg (-2.87%)",

        description:
            "Possível falta de carga na operação OP-2475 — caminhão ZXC8V67, motorista Felipe Rocha. Diferença de -770 kg (-2.87%).",

        alertDescription: "Verificar carga e lacre."
    },


    {
        operation: "OP-2474",
        title: "Excesso de peso crítico",
        level: "critical",
        levelText: "Crítico",
        date: "14/06, 14:18",

        plate: "BNM5K32",
        driver: "Patrícia Alves",
        rfid: "RF-1877A",
        cargo: "Grãos",

        route: "Curitiba → Ponta Grossa",
        responsible: "Op. Rafael",

        emptyWeight: "15.210 kg",
        cargoWeight: "28.426 kg",
        expected: "43.636 kg",
        real: "45.272 kg",
        difference: "1.636 kg (5.76%)",

        description:
            "Excesso de peso crítico na operação OP-2474 — caminhão BNM5K32, motorista Patrícia Alves. Diferença de 1.636 kg (5.76%).",

        alertDescription: "Verificar carga e lacre."
    },


    {
        operation: "OP-2468",
        title: "Possível falta de carga",
        level: "critical",
        levelText: "Crítico",
        date: "12/06, 10:36",

        plate: "PLM3N45",
        driver: "Marcos Dias",
        rfid: "RF-1863C",
        cargo: "Madeira",

        route: "Londrina → Maringá",
        responsible: "Op. Camila",

        emptyWeight: "15.384 kg",
        cargoWeight: "20.404 kg",
        expected: "35.788 kg",
        real: "34.212 kg",
        difference: "-1.576 kg (-4.15%)",

        description:
            "Possível falta de carga na operação OP-2468 — caminhão PLM3N45, motorista Marcos Dias. Diferença de -1.576 kg (-4.15%).",

        alertDescription: "Verificar carga e lacre."
    },


    {
        operation: "OP-2466",
        title: "Possível falta de carga",
        level: "critical",
        levelText: "Crítico",
        date: "12/06, 12:02",

        plate: "BNM5K32",
        driver: "Patrícia Alves",
        rfid: "RF-1857B",
        cargo: "Grãos",

        route: "Curitiba → Ponta Grossa",
        responsible: "Op. Rafael",

        emptyWeight: "15.210 kg",
        cargoWeight: "18.350 kg",
        expected: "33.560 kg",
        real: "32.463 kg",
        difference: "-1.097 kg (-3.27%)",

        description:
            "Possível falta de carga na operação OP-2466 — caminhão BNM5K32, motorista Patrícia Alves. Diferença de -1.097 kg (-3.27%).",

        alertDescription: "Verificar carga e lacre."
    },


    {
        operation: "OP-2465",
        title: "Possível falta de carga",
        level: "warning",
        levelText: "Atenção",
        date: "11/06, 13:15",

        plate: "FGH9J21",
        driver: "Bruno Teixeira",
        rfid: "RF-1844F",
        cargo: "Alimentos",

        route: "Maringá → Cascavel",
        responsible: "Op. Diego",

        emptyWeight: "14.775 kg",
        cargoWeight: "22.175 kg",
        expected: "36.950 kg",
        real: "36.575 kg",
        difference: "-375 kg (-1.68%)",

        description:
            "Possível falta de carga na operação OP-2465 — caminhão FGH9J21, motorista Bruno Teixeira. Diferença de -375 kg (-1.68%).",

        alertDescription: "Verificar carga e lacre."
    },


    {
        operation: "OP-2464",
        title: "Excesso de peso crítico",
        level: "critical",
        levelText: "Crítico",
        date: "11/06, 14:28",

        plate: "ABC1D23",
        driver: "Carlos Mendes",
        rfid: "RF-18F30",
        cargo: "Bebidas",

        route: "Maringá → Foz do Iguaçu",
        responsible: "Op. Sandra",

        emptyWeight: "14.868 kg",
        cargoWeight: "18.007 kg",
        expected: "32.875 kg",
        real: "33.963 kg",
        difference: "1.088 kg (3.31%)",

        description:
            "Excesso de peso crítico na operação OP-2464 — caminhão ABC1D23, motorista Carlos Mendes. Diferença de 1.088 kg (3.31%).",

        alertDescription: "Verificar carga e lacre."
    },


    {
        operation: "OP-2462",
        title: "Possível falta de carga",
        level: "critical",
        levelText: "Crítico",
        date: "10/06, 09:42",

        plate: "QWE7R89",
        driver: "Roberto Lima",
        rfid: "RF-1829E",
        cargo: "Aço",

        route: "Curitiba → Cascavel",
        responsible: "Op. Camila",

        emptyWeight: "15.063 kg",
        cargoWeight: "19.847 kg",
        expected: "34.910 kg",
        real: "33.802 kg",
        difference: "-1.108 kg (-3.17%)",

        description:
            "Possível falta de carga na operação OP-2462 — caminhão QWE7R89, motorista Roberto Lima. Diferença de -1.108 kg (-3.17%).",

        alertDescription: "Verificar carga e lacre."
    },


    {
        operation: "OP-2459",
        title: "Excesso de peso crítico",
        level: "critical",
        levelText: "Crítico",
        date: "09/06, 16:10",

        plate: "HJK4L78",
        driver: "André Santos",
        rfid: "RF-1815A",
        cargo: "Cimento",

        route: "Ponta Grossa → Curitiba",
        responsible: "Op. Sandra",

        emptyWeight: "15.443 kg",
        cargoWeight: "24.550 kg",
        expected: "39.993 kg",
        real: "41.220 kg",
        difference: "1.227 kg (3.07%)",

        description:
            "Excesso de peso crítico na operação OP-2459 — caminhão HJK4L78, motorista André Santos. Diferença de 1.227 kg (3.07%).",

        alertDescription: "Verificar carga e lacre."
    }

];


/* ============================= */
/* ELEMENTOS */
/* ============================= */

const alertsContainer =
    document.getElementById("alertsContainer");

const searchInput =
    document.getElementById("searchInput");

const modalOverlay =
    document.getElementById("modalOverlay");

const closeModalButton =
    document.getElementById("closeModal");


/* ============================= */
/* CRIAR OS ALERTAS */
/* ============================= */

function renderAlerts(data) {

    alertsContainer.innerHTML = "";


    if (data.length === 0) {

        alertsContainer.innerHTML = `
            <div class="no-results">
                Nenhum alerta encontrado.
            </div>
        `;

        return;
    }


    data.forEach(alert => {

        const card =
            document.createElement("div");

        card.className =
            "alert-card";


        card.innerHTML = `

            <div class="alert-left-icon">
                <i data-lucide="triangle-alert"></i>
            </div>


            <div class="alert-information">


                <div class="alert-main-line">

                    <h3>
                        ${alert.title}
                    </h3>


                    <span class="status ${alert.level}">

                        <span></span>

                        ${alert.levelText}

                    </span>


                    <span class="alert-date">
                        ${alert.date}
                    </span>


                    <span class="alert-operation">
                        ${alert.operation}
                    </span>

                </div>


                <p class="alert-description">
                    ${alert.description}
                </p>

            </div>


            <button
                class="view-operation"
                data-operation="${alert.operation}"
            >

                Ver operação

                <i data-lucide="arrow-right"></i>

            </button>

        `;


        alertsContainer.appendChild(card);

    });


    lucide.createIcons();


    document
        .querySelectorAll(".view-operation")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const operation =
                        button.dataset.operation;

                    openOperation(operation);

                }
            );

        });

}


/* ============================= */
/* ABRIR OPERAÇÃO */
/* ============================= */

function openOperation(operation) {

    const alert =
        alerts.find(
            item =>
                item.operation === operation
        );


    if (!alert)
        return;


    document.getElementById("modalOperation")
        .textContent =
        alert.operation;


    document.getElementById("modalDate")
        .textContent =
        alert.date;


    document.getElementById("modalPlate")
        .textContent =
        alert.plate;


    document.getElementById("modalDriver")
        .textContent =
        alert.driver;


    document.getElementById("modalRFID")
        .textContent =
        alert.rfid;


    document.getElementById("modalCargo")
        .textContent =
        alert.cargo;


    document.getElementById("modalRoute")
        .textContent =
        alert.route;


    document.getElementById("modalResponsible")
        .textContent =
        alert.responsible;


    document.getElementById("modalEmptyWeight")
        .textContent =
        alert.emptyWeight;


    document.getElementById("modalCargoWeight")
        .textContent =
        alert.cargoWeight;


    document.getElementById("modalExpected")
        .textContent =
        alert.expected;


    document.getElementById("modalReal")
        .textContent =
        alert.real;


    document.getElementById("modalDifference")
        .textContent =
        alert.difference;


    document.getElementById("modalAlertTitle")
        .textContent =
        `Alerta: ${alert.title}`;


    document.getElementById("modalAlertDescription")
        .textContent =
        alert.alertDescription;


    /* STATUS */

    const status =
        document.getElementById("modalLevel");


    status.className =
        `status ${alert.level}`;


    status.innerHTML = `
        <span></span>
        ${alert.levelText}
    `;


    modalOverlay.classList.add("open");

    document.body.style.overflow =
        "hidden";


    lucide.createIcons();

}


/* ============================= */
/* FECHAR MODAL */
/* ============================= */

function closeModal() {

    modalOverlay.classList.remove("open");

    document.body.style.overflow =
        "";

}


closeModalButton.addEventListener(
    "click",
    closeModal
);


/* CLICAR FORA */

modalOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            modalOverlay
        ) {

            closeModal();

        }

    }
);


/* ESC */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modalOverlay.classList.contains("open")
        ) {

            closeModal();

        }

    }
);


/* ============================= */
/* PESQUISA */
/* ============================= */

searchInput.addEventListener(
    "input",
    event => {

        const search =
            event.target
                .value
                .toLowerCase()
                .trim();


        const result =
            alerts.filter(alert => {

                return (

                    alert.operation
                        .toLowerCase()
                        .includes(search)

                    ||

                    alert.plate
                        .toLowerCase()
                        .includes(search)

                    ||

                    alert.driver
                        .toLowerCase()
                        .includes(search)

                    ||

                    alert.title
                        .toLowerCase()
                        .includes(search)

                    ||

                    alert.cargo
                        .toLowerCase()
                        .includes(search)

                );

            });


        renderAlerts(result);

    }
);


/* ============================= */
/* INICIALIZAÇÃO */
/* ============================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderAlerts(alerts);

        lucide.createIcons();

    }
);