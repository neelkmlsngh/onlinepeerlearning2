let app = require('express')();
var fs = require('fs');
var path = require('path');
let https = require('https');
var ExpressPeerServer = require('peer').ExpressPeerServer;
let cors = require('cors');
app.use(cors());

var options = {
    key: fs.readFileSync(path.resolve(__dirname, '../resources/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../resources/cert.pem'))
};
var options1 = {
    debug: true
}

// var server=http.listen(8081);
var server = https.createServer(options, app);
app.use('/peerjs', ExpressPeerServer(server, options1));
server.listen(8081);




