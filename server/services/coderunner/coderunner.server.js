const express = require('express');
const https = require('https');
var path = require('path');
const bodyParser = require('body-parser');
const { fork } = require('child_process');
const fs = require('fs');
const cors = require('cors')

let app = express();

var options = {
    key: fs.readFileSync(path.resolve(__dirname, '../../resources/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../../resources/cert.pem'))
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors())

app.post('/execute', function(req, res) {
    const fileName = Date.now().toString() + '.log';
    const out = fs.openSync('./logs/fileName', 'a');
    const compute = fork('coderunner.vm.js', [], {
        stdio: ['ignore', out, out, 'ipc']
    });

    compute.send(req.body.testscript);
    compute.on('message', success => {
        const output = fs.readFileSync(fileName, "utf8");
        fs.unlink(fileName);
        res.send(output);
    });
})
// Create HTTPS server.
var server = https.createServer(options, app);
server.listen(3030, function() {
})
