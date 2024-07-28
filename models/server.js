const express = require('express');
const cors = require("cors");
const { dbConnection } = require('../database/config');

class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares : Son funciones que van a añadirle otra funcionalidad a nuestro webServer
        this.middlewares();
        
        // Rutas de mi app
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        // Cors
        this.app.use( cors() )

        // Lectura y parseo del body
        this.app.use( express.json() );
        
        // Directorio publico
        this.app.use( express.static("public") );
    }

    routes(){
        this.app.use( this.usuariosPath , require('../routes/usuarios'));
    }

    listen(){
        this.app.listen( this.port, (err) => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}


module.exports = Server;