const fs = require('fs'),
      _ = require('path');

function addMapping(router, mapping) {
    let path;
    for (const req in mapping) {
        switch (true) {
            case req.startsWith('GET'):
                path = req.substring(4);
                router.get(path, mapping[req]);
                console.log(`Register req mapping: ${req}`);
                break;
            case req.startsWith('POST'):
                path = req.substring(5);
                router.post(path, mapping[req]);
                console.log(`Register req mapping: ${req}`);
                break;
            default:
                console.log(`Invalid request: ${req}`);
        }
    }
}

function addRoutes(router, dir) {
    const fpath = _.resolve(__dirname, dir);
    const files = fs.readdirSync(fpath);
    const jsFiles = files.filter(f => {
        return f.endsWith('.js');
    });

    for (const f of jsFiles) {
        console.log(`Process controller: ${f}`);
        const mapping = require(`${fpath}/${f}`);
        addMapping(router, mapping);
    }
}

module.exports = (dir = '../routes') => {
    const router = require('koa-router')();

    addRoutes(router, dir);
    return router.routes();
}