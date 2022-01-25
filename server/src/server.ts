'use strict';

import express from 'express';
import { createServer, Server as HttpServer } from 'http';
import { sequelize } from './db/db.config';
import productsRoutes from "./products/products.routes"

const bodyParser = require('body-parser');
const cors = require('cors');

export class Server {
    protected express = express;
    protected app: express.Application;
    private server: HttpServer;
    private port = 3001;

    constructor() {
        setTimeout(this.syncDatabase, 2000);
        this.app = this.express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.expressRouters()
        this.server = createServer(this.app);
        this.start();
    }

    private syncDatabase() {
        sequelize.sync().then(() => {
            console.log("Tables are created")
        }).catch((error) => {
            console.log(error);
        });
    }

    private start(): void {
        this.server.listen(this.port, () =>
            console.log(`App is listening on port ${this.port}.`)
        );
    }

    private expressRouters() {
        this.app.use('/api/todo', productsRoutes);
    }
}