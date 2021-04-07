const server = require('./api/server.js');

server.listen(4000, () => {
    console.log('\n* Server Runningon http://localhost:4000 *\n')
})