const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 8000;
require('dotenv').config()

// Database
require('./config/mongoose.config');

//  Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middlewares cookies
app.use(cookieParser())

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Rutas
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/publicacion.routes'));

app.listen(port , () => {
    console.log(`Server running on port ${port}`)
})
