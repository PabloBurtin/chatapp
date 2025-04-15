import express from "express";
import http from "http";
import {engine} from 'express-handlebars';
import viewRouter from "./routes/views.router.js";
import { Server } from "socket.io";

const app = express ();
const server = http.createServer(app);

const io = new Server (server)

//handlebars config
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set ('views', './src/views');



const PORT = 8080;

app.use(express.static('public'));

//endpoint
app.use('/', viewRouter)

//persistencia en memoria
const messages = [];

//websocket lado del servidor
io.on('connection', (socket)=>{
    //socket es un objeto que representa la conexión del cliente con el servidor
    console.log("Un nuevo usuario se conecto")

    //emitir un evento
    socket.emit('welcome', {greeting: 'Bienvenido a nuestro chat'})

    //emitimos historial de mensaje
    socket.emit('message history', messages);
    
    //escuchar un evento
    socket.on('newMessage', (dataMessage)=>{
        messages.push(dataMessage)

        //transmición del mensaje a todos los clientes
        io.emit('broadcast new message', dataMessage);
    });

});


server.listen(PORT, ()=>{
    console.log("Servidor iniciado en el puerto: ", PORT)
});