const path = require('path');
const express = require('express');

const service = require('./app.service');

function welcome(appName) {
    process.stdout.write('\n=======================================================\n');
    process.stdout.write('\n=            ' + appName + '                =\n');
    process.stdout.write('\n=======================================================\n');
}

module.exports = function(appName) {

    welcome(appName);

    let app = service.createApp();

    app.use(express.static(path.resolve(__dirname, '../../', 'client/dist')));

    app = service.setupMiddlewares(app);
    app = service.setupRestRoutes(app);
    service.setupMongooseConnections();
    service.loginviagit();


    return app;
};

const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const socketEvents = require('./utils/socket');
const routes = require('./utils/routes');
const config = require('./utils/config');


class Server {

    constructor() {
        this.port = process.env.PORT || 4000;
        this.host = `localhost`;

        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
    }

    appConfig() {
        this.app.use(
            bodyParser.json()
        );
        this.app.use(
            cors()
        );
        new config(this.app);
    }

    /* Including app Routes starts*/
    includeRoutes() {
        new routes(this.app).routesConfig();
        new socketEvents(this.socket).socketConfig();
    }
    /* Including app Routes ends*/

    appExecute() {

        this.appConfig();
        this.includeRoutes();

        this.http.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}`);
        });
    }

}

const app = new Server();
app.appExecute();