// ======================================
// ELEMENTOS
// ======================================

const openChat = document.getElementById("openChat");
const floatChat = document.getElementById("floatChat");
const closeChat = document.getElementById("closeChat");

const chatBox = document.getElementById("chatBox");

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");

const fileInput = document.getElementById("fileInput");

// ======================================
// ABRIR CHAT
// ======================================

openChat.addEventListener("click", () => {

    chatBox.style.display = "flex";

});

floatChat.addEventListener("click", () => {

    chatBox.style.display = "flex";

});

// ======================================
// CERRAR CHAT
// ======================================

closeChat.addEventListener("click", () => {

    chatBox.style.display = "none";

});

// ======================================
// ENVIAR MENSAJE
// ======================================

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        sendMessage();
    }

});

// ======================================
// FUNCION MENSAJE
// ======================================

function sendMessage(){

    const text = userInput.value.trim();

    if(text === ""){
        return;
    }

    addUserMessage(text);

    userInput.value = "";

    setTimeout(() => {

        const response = getBotResponse(text);

        addBotMessage(response);

    }, 700);

}

// ======================================
// MENSAJE USUARIO
// ======================================

function addUserMessage(text){

    const div = document.createElement("div");

    div.classList.add("user-message");

    div.innerHTML = `

        <div class="message-text">
            ${text}
        </div>

        <div class="message-hour">
            ${getCurrentTime()}
        </div>

    `;

    chatBody.appendChild(div);

    scrollBottom();

}

// ======================================
// MENSAJE BOT
// ======================================

function addBotMessage(text){

    const div = document.createElement("div");

    div.classList.add("bot-message");

    div.innerHTML = `

        <div class="message-text">
            ${text}
        </div>

        <div class="message-hour">
            Sedapal · ${getCurrentTime()}
        </div>

    `;

    chatBody.appendChild(div);

    scrollBottom();

}

// ======================================
// RESPUESTAS BOT
// ======================================

function getBotResponse(message){

    const msg = message.toLowerCase();

    // SALUDO
    if(
        msg.includes("hola") ||
        msg.includes("buenas")
    ){
        return "👋 Hola, bienvenido al asistente virtual de Sedapal.";
    }

    // RECIBO
    if(
        msg.includes("recibo") ||
        msg.includes("pago")
    ){
        return "💳 Puedes consultar y pagar tu recibo desde la oficina virtual.";
    }

    // CORTES
    if(
        msg.includes("corte") ||
        msg.includes("agua")
    ){
        return "🚰 Puedes revisar cortes de agua programados ingresando tu distrito.";
    }

    // FUGAS
    if(
        msg.includes("fuga")
    ){
        return "🔧 Para reportar una fuga necesitamos tu dirección exacta.";
    }

    // HORARIO
    if(
        msg.includes("horario") ||
        msg.includes("atención")
    ){
        return "🕒 Nuestro soporte virtual atiende las 24 horas.";
    }

    // ASESOR
    if(
        msg.includes("asesor") ||
        msg.includes("humano") ||
        msg.includes("operador")
    ){
        return "👨‍💼 Te estamos comunicando con un asistente virtual. Espere unos momentos...";
    }

    // DEFAULT
    return "❌ No pude resolver tu duda. ¿Deseas comunicarte con un asistente virtual?";
}

// ======================================
// HORA
// ======================================

function getCurrentTime(){

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    if(minutes < 10){
        minutes = "0" + minutes;
    }

    return `${hours}:${minutes}`;

}

// ======================================
// SCROLL
// ======================================

function scrollBottom(){

    chatBody.scrollTop = chatBody.scrollHeight;

}

// ======================================
// ARCHIVOS
// ======================================

fileInput.addEventListener("change", function(){

    const file = this.files[0];

    if(!file){
        return;
    }

    const div = document.createElement("div");

    div.classList.add("user-message");

    div.innerHTML = `

        <div class="message-text">
            📎 Archivo enviado: ${file.name}
        </div>

        <div class="message-hour">
            ${getCurrentTime()}
        </div>

    `;

    chatBody.appendChild(div);

    scrollBottom();

    setTimeout(() => {

        addBotMessage(
            "📂 Archivo recibido correctamente."
        );

    }, 700);

});