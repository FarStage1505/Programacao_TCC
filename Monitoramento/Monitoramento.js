const OPERATIONS = [

    {
        id: "op1",
        plate: "ABC1D23",
        status: "Em andamento",
        driver: "Carlos Mendes",
        from: "Curitiba",
        to: "Cascavel",
        eta: "21:47",
        remaining: "827 km restantes",
        progress: 12,

        start: [
            -25.4284,
            -49.2733
        ],

        end: [
            -24.9555,
            -53.4552
        ],

        current: [
            -25.20,
            -50.25
        ]
    },


    {
        id: "op2",
        plate: "QWE4R56",
        status: "Parado",
        driver: "Ana Souza",
        from: "Londrina",
        to: "Ponta Grossa",
        eta: "20:20",
        remaining: "667 km restantes",
        progress: 29,

        start: [
            -23.3045,
            -51.1696
        ],

        end: [
            -25.0997,
            -50.1583
        ],

        current: [
            -24.20,
            -50.60
        ]
    },


    {
        id: "op3",
        plate: "JKL7M89",
        status: "Em trânsito",
        driver: "Roberto Lima",
        from: "Maringá",
        to: "Foz do Iguaçu",
        eta: "18:54",
        remaining: "508 km restantes",
        progress: 46,

        start: [
            -23.4200,
            -51.9330
        ],

        end: [
            -25.5163,
            -54.5854
        ],

        current: [
            -24.45,
            -53.30
        ]
    },


    {
        id: "op4",
        plate: "RTY2U10",
        status: "Em trânsito",
        driver: "Júlia Castro",
        from: "Cascavel",
        to: "Pato Branco",
        eta: "20:49",
        remaining: "686 km restantes",
        progress: 63,

        start: [
            -24.9555,
            -53.4552
        ],

        end: [
            -26.2285,
            -52.6716
        ],

        current: [
            -25.76,
            -52.98
        ]
    },


    {
        id: "op5",
        plate: "PLM3N45",
        status: "Em trânsito",
        driver: "Marcos Dias",
        from: "Ponta Grossa",
        to: "Curitiba",
        eta: "16:00",
        remaining: "188 km restantes",
        progress: 80,

        start: [
            -25.0997,
            -50.1583
        ],

        end: [
            -25.4284,
            -49.2733
        ],

        current: [
            -25.36,
            -49.55
        ]
    },


    {
        id: "op6",
        plate: "ZXC8V67",
        status: "Em trânsito",
        driver: "Felipe Rocha",
        from: "Foz do Iguaçu",
        to: "Londrina",
        eta: "13:33",
        remaining: "28 km restantes",
        progress: 97,

        start: [
            -25.5163,
            -54.5854
        ],

        end: [
            -23.3045,
            -51.1696
        ],

        current: [
            -23.38,
            -51.30
        ]
    },


    {
        id: "op7",
        plate: "BNM5K32",
        status: "Em trânsito",
        driver: "Patrícia Alves",
        from: "Pato Branco",
        to: "Maringá",
        eta: "01:35",
        remaining: "677 km restantes",
        progress: 28,

        start: [
            -26.2285,
            -52.6716
        ],

        end: [
            -23.4200,
            -51.9330
        ],

        current: [
            -25.55,
            -52.35
        ]
    },


    {
        id: "op8",
        plate: "FGH9J21",
        status: "Parado",
        driver: "Bruno Teixeira",
        from: "Curitiba",
        to: "Cascavel",
        eta: "00:08",
        remaining: "517 km restantes",
        progress: 45,

        start: [
            -25.4284,
            -49.2733
        ],

        end: [
            -24.9555,
            -53.4552
        ],

        current: [
            -25.18,
            -50.72
        ]
    },


    {
        id: "op9",
        plate: "ABC1D23",
        status: "Em trânsito",
        driver: "Carlos Mendes",
        from: "Londrina",
        to: "Ponta Grossa",
        eta: "22:41",
        remaining: "357 km restantes",
        progress: 62,

        start: [
            -23.3045,
            -51.1696
        ],

        end: [
            -25.0997,
            -50.1583
        ],

        current: [
            -24.40,
            -50.75
        ]
    },


    {
        id: "op10",
        plate: "QWE4R56",
        status: "Em andamento",
        driver: "Ana Souza",
        from: "Maringá",
        to: "Foz do Iguaçu",
        eta: "21:14",
        remaining: "197 km restantes",
        progress: 79,

        start: [
            -23.4200,
            -51.9330
        ],

        end: [
            -25.5163,
            -54.5854
        ],

        current: [
            -25.12,
            -53.90
        ]
    }

];


let map = null;

let markerLayer = null;

let selectedRouteLayer = null;

let selectedId = "op4";

let searchTerm = "";

let routeRequestController = null;


/* =====================================================
   UTILITÁRIOS
===================================================== */

const $ = id =>
    document.getElementById(id);


function escapeHtml(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


function showToast(message) {

    const toast =
        $("toast");

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
            3200
        );

}


function statusClass(status) {

    return status === "Parado"
        ? "stopped"
        : "";

}


/* =====================================================
   OPERAÇÕES ATIVAS
===================================================== */

function getAllActiveOperations() {

    return OPERATIONS.filter(
        operation => {

            return (

                operation.status ===
                    "Em andamento"

                ||

                operation.status ===
                    "Em trânsito"

                ||

                operation.status ===
                    "Parado"

            );

        }
    );

}


/* =====================================================
   BUSCA
===================================================== */

function matchesSearch(
    operation,
    term
) {

    if (!term) {

        return true;

    }


    const search =
        term.toLowerCase();


    const searchableText = [

        operation.plate,

        operation.driver,

        operation.from,

        operation.to,

        operation.status

    ]

        .join(" ")

        .toLowerCase();


    return searchableText.includes(
        search
    );

}


function getFilteredOperations() {

    return getAllActiveOperations()
        .filter(
            operation =>
                matchesSearch(
                    operation,
                    searchTerm
                )
        );

}


/* =====================================================
   MAPA
===================================================== */

function initMap() {

    const mapElement =
        $("map");


    if (!mapElement) {

        console.error(
            "Elemento #map não encontrado."
        );

        return;

    }


    if (
        typeof L === "undefined"
    ) {

        showMapError(
            "A biblioteca Leaflet não foi carregada."
        );

        return;

    }


    try {

        map =
            L.map(
                mapElement,
                {
                    zoomControl:
                        false,

                    minZoom:
                        5,

                    maxZoom:
                        18
                }
            );


        map.setView(
            [
                -25.0,
                -51.8
            ],
            6.5
        );


        L.control.zoom(
            {
                position:
                    "topright"
            }
        ).addTo(
            map
        );


        /*
        =================================================
        MAPA BASE

        Não utilizamos o servidor que estava retornando
        403 no seu projeto.

        =================================================
        */

        const tiles =
            L.tileLayer(

                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",

                {
                    maxZoom:
                        19,

                    attribution:
                        "&copy; Esri, TomTom, Garmin, FAO, NOAA, USGS, " +
                        "&copy; OpenStreetMap contributors"
                }

            );


        tiles.addTo(
            map
        );


        tiles.on(
            "tileerror",
            () => {

                showMapError(
                    "Não foi possível carregar os mapas. Verifique sua conexão com a internet."
                );

            }
        );


        map.whenReady(
            () => {

                const loading =
                    $("mapLoading");


                if (loading) {

                    loading.style.display =
                        "none";

                }


                renderMarkers();

                renderSelected();

                renderOperationList();

                renderCards();

                updateCount();


                const selected =
                    OPERATIONS.find(
                        operation =>
                            operation.id ===
                            selectedId
                    );


                if (selected) {

                    drawRoute(
                        selected
                    );

                }


                setTimeout(
                    () => {

                        map.invalidateSize(
                            true
                        );

                    },
                    300
                );

            }
        );


    }
    catch (error) {

        console.error(
            "Erro ao inicializar mapa:",
            error
        );


        showMapError(
            "Erro ao inicializar o mapa."
        );

    }

}


function showMapError(message) {

    const loading =
        $("mapLoading");


    const errorBox =
        $("mapError");


    if (loading) {

        loading.style.display =
            "none";

    }


    if (errorBox) {

        errorBox.hidden =
            false;

        errorBox.textContent =
            message;

    }

}


/* =====================================================
   MARCADORES
===================================================== */

function markerHtml(
    operation,
    selected
) {

    return `

        <div
            class="
                truck-marker
                ${selected ? "selected" : ""}
                ${statusClass(
                    operation.status
                )}
            "
        >

            <div class="truck-pill">

                <span class="truck-dot">
                    ▰
                </span>

                ${escapeHtml(
                    operation.plate
                )}

            </div>


            <div class="truck-status">

                ${escapeHtml(
                    operation.status ===
                    "Parado"

                        ? "Parado"

                        : "Em rota"
                )}

            </div>

        </div>

    `;

}


function renderMarkers() {

    if (!map) {
        return;
    }


    if (markerLayer) {

        markerLayer.clearLayers();

    }


    markerLayer =
        L.layerGroup()
            .addTo(map);


    const visible =
        getFilteredOperations();


    visible.forEach(
        operation => {

            const icon =
                L.divIcon(
                    {

                        className:
                            "custom-truck-icon",

                        html:
                            markerHtml(
                                operation,
                                operation.id ===
                                    selectedId
                            ),

                        iconSize:
                            [
                                1,
                                1
                            ],

                        iconAnchor:
                            [
                                0,
                                0
                            ]

                    }
                );


            const marker =
                L.marker(
                    operation.current,
                    {
                        icon:
                            icon,

                        title:
                            operation.plate,

                        keyboard:
                            true
                    }
                );


            marker.bindTooltip(
                `
                    <strong>
                        ${escapeHtml(
                            operation.plate
                        )}
                    </strong>

                    <br>

                    ${escapeHtml(
                        operation.driver
                    )}

                    <br>

                    ${escapeHtml(
                        operation.status
                    )}
                `,
                {
                    direction:
                        "top",

                    offset:
                        [
                            0,
                            -8
                        ]
                }
            );


            marker.on(
                "click",
                () => {

                    selectOperation(
                        operation.id,
                        true
                    );

                }
            );


            marker.addTo(
                markerLayer
            );

        }
    );

}


/* =====================================================
   OPERAÇÃO SELECIONADA
===================================================== */

function renderSelected() {

    const box =
        $("selectedOperation");


    if (!box) {
        return;
    }


    const operation =
        OPERATIONS.find(
            item =>
                item.id ===
                selectedId
        );


    if (!operation) {

        box.innerHTML = `

            <div class="empty-state">

                Selecione uma operação
                no mapa ou na lista.

            </div>

        `;

        return;

    }


    box.innerHTML = `

        <div class="selected-head">

            <div class="truck-symbol">
                ▰
            </div>


            <div class="selected-info">

                <strong>

                    ${escapeHtml(
                        operation.plate
                    )}

                </strong>


                <span
                    class="
                        selected-status
                        ${statusClass(
                            operation.status
                        )}
                    "
                >

                    ${escapeHtml(
                        operation.status
                    )}

                </span>

            </div>


            <div class="selected-side">

                <span>

                    ETA
                    ${escapeHtml(
                        operation.eta
                    )}

                </span>


                <strong>

                    ${escapeHtml(
                        operation.remaining
                    )}

                </strong>

            </div>

        </div>


        <div class="route-line">

            ${escapeHtml(
                operation.from
            )}

            →

            <strong>

                ${escapeHtml(
                    operation.to
                )}

            </strong>

        </div>


        <div class="driver-line">

            Motorista:

            <strong>

                ${escapeHtml(
                    operation.driver
                )}

            </strong>

        </div>


        <div class="progress-meta">

            <span>
                Progresso da rota
            </span>

            <strong>
                ${operation.progress}%
            </strong>

        </div>


        <div class="progress">

            <span
                style="
                    width:${operation.progress}%
                "
            ></span>

        </div>

    `;

}


/* =====================================================
   LISTA LATERAL
===================================================== */

function renderOperationList() {

    const list =
        $("operationList");


    if (!list) {
        return;
    }


    const operations =
        getFilteredOperations();


    if (!operations.length) {

        list.innerHTML = `

            <div class="empty-state">

                Nenhuma operação encontrada.

            </div>

        `;

        return;

    }


    list.innerHTML =
        operations
            .map(
                operation => `

                    <button
                        type="button"

                        class="
                            operation-item
                            ${
                                operation.id ===
                                selectedId
                                    ? "active"
                                    : ""
                            }
                        "

                        data-id="${
                            operation.id
                        }"
                    >

                        <span class="plate">

                            ${escapeHtml(
                                operation.plate
                            )}

                        </span>


                        <span
                            class="
                                status
                                ${statusClass(
                                    operation.status
                                )}
                            "
                        >

                            ${escapeHtml(
                                operation.status
                            )}

                        </span>


                        <span class="pct">

                            ${operation.progress}%

                        </span>

                    </button>

                `
            )
            .join("");


    list
        .querySelectorAll(
            ".operation-item"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        selectOperation(
                            button.dataset.id,
                            true
                        );

                    }
                );

            }
        );

}


/* =====================================================
   LISTA COMPLETA
===================================================== */

function renderCards() {

    const list =
        $("cardsList");


    if (!list) {
        return;
    }


    const operations =
        getFilteredOperations();


    if (!operations.length) {

        list.innerHTML = `

            <div class="empty-state wide">

                Nenhuma operação encontrada.

            </div>

        `;

        return;

    }


    list.innerHTML =
        operations
            .map(
                operation => `

                    <article

                        class="
                            operation-card
                            ${
                                operation.id ===
                                selectedId
                                    ? "active"
                                    : ""
                            }
                        "

                        data-id="${
                            operation.id
                        }"
                    >


                        <div class="card-top">


                            <div class="card-left">


                                <div class="card-icon">

                                    ▰

                                </div>


                                <div class="card-main">

                                    <strong>

                                        ${escapeHtml(
                                            operation.plate
                                        )}

                                    </strong>


                                    <span
                                        class="
                                            status
                                            ${statusClass(
                                                operation.status
                                            )}
                                        "
                                    >

                                        ${escapeHtml(
                                            operation.status
                                        )}

                                    </span>


                                    <div class="route">

                                        ${escapeHtml(
                                            operation.from
                                        )}

                                        →

                                        ${escapeHtml(
                                            operation.to
                                        )}

                                    </div>

                                </div>

                            </div>


                            <div class="card-side">

                                ETA
                                ${escapeHtml(
                                    operation.eta
                                )}

                                <strong>

                                    ${escapeHtml(
                                        operation.remaining
                                    )}

                                </strong>

                            </div>

                        </div>


                        <div class="card-driver">

                            Motorista:

                            <strong>

                                ${escapeHtml(
                                    operation.driver
                                )}

                            </strong>


                            <span
                                style="
                                    float:right;
                                    color:inherit;
                                    font-size:10px;
                                    font-weight:700;
                                "
                            >

                                ${operation.progress}%

                            </span>

                        </div>


                        <div class="card-progress">

                            <span
                                style="
                                    width:${operation.progress}%
                                "
                            ></span>

                        </div>


                    </article>

                `
            )
            .join("");


    list
        .querySelectorAll(
            ".operation-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        selectOperation(
                            card.dataset.id,
                            true
                        );

                        setView(
                            "map"
                        );

                    }
                );

            }
        );

}


/* =====================================================
   CONTADOR
===================================================== */

function updateCount() {

    const element =
        $("activeCount");


    if (!element) {
        return;
    }


    const count =
        getAllActiveOperations()
            .length;


    element.textContent =

        `${count} ${
            count === 1
                ? "operação ativa"
                : "operações ativas"
        }`;

}


/* =====================================================
   API OSRM
===================================================== */

async function drawRoute(
    operation
) {

    if (!map || !operation) {
        return;
    }


    if (
        selectedRouteLayer
    ) {

        map.removeLayer(
            selectedRouteLayer
        );

        selectedRouteLayer =
            null;

    }


    if (
        routeRequestController
    ) {

        routeRequestController.abort();

    }


    routeRequestController =
        new AbortController();


    const start =
        operation.current;


    const end =
        operation.end;


    const url =

        "https://router.project-osrm.org/" +
        "route/v1/driving/" +

        `${start[1]},${start[0]};` +

        `${end[1]},${end[0]}` +

        "?overview=full&geometries=geojson";


    try {

        const response =
            await fetch(
                url,
                {
                    method:
                        "GET",

                    signal:
                        routeRequestController
                            .signal
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        if (
            data.code !==
                "Ok" ||

            !data.routes ||

            !data.routes.length
        ) {

            throw new Error(
                "Nenhuma rota encontrada."
            );

        }


        const coordinates =
            data.routes[0]
                .geometry
                .coordinates
                .map(
                    coordinate => [

                        coordinate[1],

                        coordinate[0]

                    ]
                );


        selectedRouteLayer =
            L.polyline(
                coordinates,
                {
                    color:
                        "#ff5b1f",

                    weight:
                        5,

                    opacity:
                        .95,

                    lineCap:
                        "round",

                    lineJoin:
                        "round"
                }
            )
                .addTo(map);


        const bounds =
            selectedRouteLayer
                .getBounds();


        if (
            bounds.isValid()
        ) {

            map.fitBounds(
                bounds,
                {
                    padding:
                        [
                            40,
                            40
                        ],

                    maxZoom:
                        9
                }
            );

        }

    }

    catch (error) {

        if (
            error.name ===
            "AbortError"
        ) {

            return;

        }


        console.error(
            "Erro na API de rotas:",
            error
        );


        showToast(
            "Não foi possível carregar a rota."
        );

    }

}


/* =====================================================
   SELECIONAR OPERAÇÃO
===================================================== */

function selectOperation(
    id,
    centerMap = true
) {

    const operation =
        OPERATIONS.find(
            item =>
                item.id === id
        );


    if (!operation) {
        return;
    }


    selectedId =
        id;


    renderMarkers();

    renderSelected();

    renderOperationList();

    renderCards();


    if (
        map &&
        centerMap
    ) {

        map.flyTo(
            operation.current,

            Math.max(
                map.getZoom(),
                7
            ),

            {
                duration:
                    .45
            }
        );

    }


    drawRoute(
        operation
    );

}


/* =====================================================
   PESQUISA
===================================================== */

function applySearch(
    value
) {

    searchTerm =
        value.trim();


    const globalSearch =
        $("globalSearch");


    const operationSearch =
        $("operationSearch");


    if (
        globalSearch &&
        globalSearch.value !== value
    ) {

        globalSearch.value =
            value;

    }


    if (
        operationSearch &&
        operationSearch.value !== value
    ) {

        operationSearch.value =
            value;

    }


    const visible =
        getFilteredOperations();


    if (
        visible.length &&
        (
            !selectedId ||

            !visible.some(
                operation =>
                    operation.id ===
                    selectedId
            )
        )
    ) {

        selectedId =
            visible[0].id;

    }


    renderMarkers();

    renderSelected();

    renderOperationList();

    renderCards();

    updateCount();


    if (
        selectedId &&
        visible.some(
            operation =>
                operation.id ===
                selectedId
        )
    ) {

        const selected =
            OPERATIONS.find(
                operation =>
                    operation.id ===
                    selectedId
            );


        if (selected) {

            drawRoute(
                selected
            );

        }

    }

}


/* =====================================================
   MAPA / LISTA
===================================================== */

function setView(
    view
) {

    const mapLayout =
        $("mapLayout");


    const listLayout =
        $("listLayout");


    const mapButton =
        $("mapViewButton");


    const listButton =
        $("listViewButton");


    if (
        view === "map"
    ) {

        mapLayout.hidden =
            false;


        listLayout.hidden =
            true;


        mapButton.classList.add(
            "active"
        );


        listButton.classList.remove(
            "active"
        );


        if (map) {

            setTimeout(
                () => {

                    map.invalidateSize(
                        true
                    );

                },
                100
            );

        }

    }


    if (
        view === "list"
    ) {

        mapLayout.hidden =
            true;


        listLayout.hidden =
            false;


        mapButton.classList.remove(
            "active"
        );


        listButton.classList.add(
            "active"
        );


        /*
            Ao clicar em LISTA:

            todas as operações ativas
            são renderizadas novamente.
        */

        renderCards();

    }

}


/* =====================================================
   LIMPAR SELEÇÃO
===================================================== */

function clearSelection() {

    selectedId =
        null;


    renderMarkers();

    renderSelected();

    renderOperationList();

    renderCards();


    if (
        selectedRouteLayer &&
        map
    ) {

        map.removeLayer(
            selectedRouteLayer
        );

        selectedRouteLayer =
            null;

    }

}


/* =====================================================
   EVENTOS
===================================================== */

const operationSearch =
    $("operationSearch");


if (
    operationSearch
) {

    operationSearch.addEventListener(
        "input",
        event => {

            applySearch(
                event.target.value
            );

        }
    );

}


const globalSearch =
    $("globalSearch");


if (
    globalSearch
) {

    globalSearch.addEventListener(
        "input",
        event => {

            applySearch(
                event.target.value
            );

        }
    );

}


const mapViewButton =
    $("mapViewButton");


if (
    mapViewButton
) {

    mapViewButton.addEventListener(
        "click",
        () => {

            setView(
                "map"
            );

        }
    );

}


const listViewButton =
    $("listViewButton");


if (
    listViewButton
) {

    listViewButton.addEventListener(
        "click",
        () => {

            setView(
                "list"
            );

        }
    );

}


const clearSelectionButton =
    $("clearSelection");


if (
    clearSelectionButton
) {

    clearSelectionButton.addEventListener(
        "click",
        clearSelection
    );

}


const notificationButton =
    $("notificationButton");


if (
    notificationButton
) {

    notificationButton.addEventListener(
        "click",
        () => {

            showToast(
                "Você tem 10 alertas pendentes."
            );

        }
    );

}


const themeButton =
    $("themeButton");


if (
    themeButton
) {

    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-mode"
            );


            showToast(

                document.body.classList.contains(
                    "light-mode"
                )

                    ? "Modo claro ativado."

                    : "Modo escuro ativado."

            );

        }
    );

}


const settingsLink =
    $("settingsLink");


if (
    settingsLink
) {

    settingsLink.addEventListener(
        "click",
        event => {

            event.preventDefault();


            showToast(
                "Tela de configurações ainda não foi conectada."
            );

        }
    );

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

renderSelected();

renderOperationList();

renderCards();

updateCount();

initMap();