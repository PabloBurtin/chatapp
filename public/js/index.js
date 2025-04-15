//websocket lado cliente


//iniciamos la conexion desde nuestro cliente
const socket = io();

const main = () => {
    
   
    //escuchar un evento
    socket.on ('welcome', (data)=>{
        console.log(data)
    });

    //formulario
    const formChat = document.getElementById('formChat');
    const inputChat = document.getElementById('inputChat');
    const inputUsername = document.getElementById ('inputUsername')

    formChat.addEventListener('submit', (event)=>{
        event.preventDefault();

        const username = inputUsername.value;
        const message = inputChat.value;
        inputChat.value=''

        //emitimos un evento desde el cliente al servidor
        socket.emit('newMessage', { message, username });
    });

    //capturamos los mensajes nuevos
    socket.on ('broadcast new message', (dataMessage)=>{
        //insertar en el html
        const chatBox = document.getElementById ('chatBox');
        chatBox.innerHTML += `<p>${dataMessage.username} - ${dataMessage.message}</p>`;
    })

    //capturamos el historial de mensajes
    socket.on ('message history', (messages) => {
        const chatBox = document.getElementById ('chatBox');
        messages.forEach((dataMessage)=>{
            chatBox.innerHTML += `<p>${dataMessage.username} - ${dataMessage.message}</p>`;
        })
    })

}

main ();