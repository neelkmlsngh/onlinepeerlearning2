const express = require('express');
const bodyParser = require('body-parser');
const { fork } = require('child_process');
const fs = require('fs');
const cors = require('cors')

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors())

app.post('/execute', function(req, res) {
    const fileName = Date.now().toString() + '.log';
    const out = fs.openSync(fileName, 'a');
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
app.listen(3030, function() {
    console.log('Server listening on port 3030')
})