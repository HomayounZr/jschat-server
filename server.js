const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const app = require('./appStart/expressStart');

const server = http.createServer(app);

// implement web-socket here
const { startSocket } = require('./helpers/sockets/mainSocket');
startSocket(server);

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server up and running on port: ${PORT}`);
});