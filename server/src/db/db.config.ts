import { Sequelize } from 'sequelize-typescript';
import { List } from './models/list';

const mysql = require('mysql2');
const config = require('../config/config');

const connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password
});

connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);

const sequelize = new Sequelize({
    database: config.database,
    dialect: config.dialect,
    username: config.username,
    password: config.password,
    port: config.port,
    host: config.host
});

sequelize.addModels([List]);

export { sequelize };