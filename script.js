// Variables globales
let intentos = 6;
let palabra = "";

// Diccionario de palabras
const diccionario = ['MARES', 'AMIGO', 'BARCO', 'CIELO', 'FLORA', 'GATOS', 'JUEGO', 'LIMON', 'PERRO', 'LARGO', 'LUEGO', 'LIBRO', 'LLENO', 'LINDA', 'LOGRO', 'LLAVE'];

// Función para inicializar el juego
function init() {
    // Seleccionar una palabra al azar del diccionario
    palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

    // Agregar un event listener al botón "Intentar"
    const button = document.getElementById("guess-button");
    button.addEventListener("click", intentar);

    // Limpiar la cuadrícula
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    // Restablecer el número de intentos restantes
    intentos = 6;

    // Habilitar el campo de entrada y el botón
    const input = document.getElementById("guess-input");
    input.value = "";
    input.disabled = false;
    button.disabled = false;

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") { intentar(); }
    });

    // Borrar mensajes previos
    const guesses = document.getElementById('guesses');
    guesses.innerHTML = "";
}

// Función para manejar un intento
function intentar() {
    const input = document.getElementById("guess-input");
    const INTENTO = leerIntento();

    // Comprobar si el intento es correcto
    if (INTENTO === palabra) {
        terminar("<h1>¡GANASTE! 💌</h1>");
        return;
    }

    // Crear una nueva fila para mostrar las letras
    const grid = document.getElementById("grid");
    const row = document.createElement('div');
    row.className = 'row';

    // Comprobar cada letra del intento, hasta la longitud de INTENTO
    for (let i = 0; i < INTENTO.length; i++) {
        const span = document.createElement('span');
        span.className = 'letter';
        span.style.borderRadius = '5px';
        span.style.border = 'none';
        span.style.padding = '10px';

        if (INTENTO[i] === palabra[i]) { // Letra correcta en la posición correcta
            span.innerHTML = INTENTO[i];
            span.style.backgroundColor = '#79b851'; // Verde
            span.style.color = '#344e41';
        } else if (palabra.includes(INTENTO[i])) { // Letra correcta en la posición incorrecta
            span.innerHTML = INTENTO[i];
            span.style.backgroundColor = '#f3c237'; // Amarillo
            span.style.color = '#fb8500';
        } else { // Letra incorrecta
            span.innerHTML = INTENTO[i];
            span.style.backgroundColor = '#edede9'; // Gris
            span.style.color = '#d6ccc2';
        }

        row.appendChild(span);
    }

    // Agregar la fila a la cuadrícula
    grid.appendChild(row);

    // Disminuir los intentos restantes
    intentos--;

    // Comprobar si el juego ha terminado
    if (intentos === 0) {
        terminar("<h1>PERDISTE...💀</h1>");
    }

    // Borrar el campo de entrada
    input.value = "";
}

// Función para leer el intento del usuario
function leerIntento() {
    const input = document.getElementById("guess-input");
    let intento = input.value;
    intento = intento.toUpperCase();
    return intento;
}

// Función para finalizar el juego y mostrar un mensaje
function terminar(mensaje) {
    const popup = document.getElementById("game-over-popup");
    const popupMessage = document.getElementById("popup-message");
    const reloadButton = document.getElementById("reload-button");
    const answer = document.getElementById("correct-answer");

    answer.innerHTML = `LA PALABRA CORRECTA ERA: ${palabra}`;
    popupMessage.innerHTML = mensaje;
    popupMessage.style.fontSize = '20px';
    popup.style.display = "flex";

    reloadButton.addEventListener("click", function () {
        location.reload();
    });
}

// Agregar un event listener "load" para inicializar el juego
window.addEventListener('load', init);
