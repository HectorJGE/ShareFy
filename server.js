const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const cookieParser = require('cookie-parser')

//Requerir archivo de configuracion
require('./server/config/mongoose.config');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middlewares cookies
app.use(cookieParser())

//CORS
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));

//Rutas
require('./server/routes/user.routes')(app)
require('./server/routes/publicacion.routes')(app)

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
