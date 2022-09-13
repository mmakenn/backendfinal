const socket = io();

//--------------------------------------------
// Manejadores del formulario de ingreso del mensaje al chat.
const newMessageForm = document.getElementById('newMessageForm')
newMessageForm.addEventListener('submit', e => {
    e.preventDefault()

    const messageRecived = {
        email: document.getElementById('email').value,
        text: document.getElementById('text').value
    }

    socket.emit('updateChat', messageRecived);
})

//--------------------------------------------
// Manejadores del renderizado de mensajes del chat.
socket.on('showChat', showChat);

async function showChat(messages) {
    const template = await fetch('templates/chat.hbs');
    const textTemplate = await template.text();
    const functionTemplate = Handlebars.compile(textTemplate);
    const html = functionTemplate({ messages: messages });
    document.getElementById('chatContainer').innerHTML = html;
}

//--------------------------------------------
// Error con el formato de los datos del formulario
socket.on('invalidDataAtForm', invalidDataAtForm);

async function invalidDataAtForm(errorMessage) {
    const template = await fetch('templates/formError.hbs');
    const textTemplate = await template.text();
    const functionTemplate = Handlebars.compile(textTemplate);
    const html = functionTemplate({ errorStatus: true, errorMessage: errorMessage });
    document.getElementById('chatContainer').innerHTML = html;
    setTimeout(() => {
        const html = functionTemplate({ errorStatus: false, errorMessage: "" });
        document.getElementById('chatContainer').innerHTML = html;
    }, 500)
}