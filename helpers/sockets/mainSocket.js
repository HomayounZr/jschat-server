const socketIO = require('socket.io');

let io = null;
const startSocket = (server) => {
    io = socketIO(server);
    console.log('Socket Started');

    io.on('connection', socket => {

        socket.on('joined', userId => {
            // add socketID and userId to redis
            socket.emit('welcome');
        });
    });

}

module.exports = {
    startSocket,
};