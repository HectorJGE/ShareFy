const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 8000;
const origenes = process.env.CORS_ORIGIN.split(", ");
console.log("Origenes: ", origenes);

// Database
require('./config/mongoose.config');

//  Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// CORS
app.use(cors({
    origin: origenes,
    credentials: true,
}));

// Rutas
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/publicacion.routes'));
app.use('/api', require('./routes/message.routes'));

// Creamos un servidor http 
const server = http.createServer(app);

// Inicializamos socket.io
const io = socketio(server, {
    cors: {
        origin: origenes,
        credentials: true
    }
});

require('./sockets/socket')(io);


server.listen(port , () => {
    console.log(`Server running on port ${port}`)
})
