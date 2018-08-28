const config = require('./config/config.json');
const express = require("express");
const data = require('./data.json');

const app = express();

app.get('/apartments/:count', (req, res) => {
    res.setHeader("Cache-control", "no-cache");
    res.setHeader("Access-Control-Allow-Origin", "*");
    
    const obj = {items: []};
    for (let i = 0; i < req.params.count; i++) {
        const irand = Math.floor(Math.random() * data.items.length);
        obj.items.push(data.items[irand]);
    }
    res.json(obj);
});

app.set('port', process.env.PORT || config.port);

app.listen(app.get('port'), () => {
    console.log('Server is listening...\nhttp://localhost:%s', app.get('port'));
});