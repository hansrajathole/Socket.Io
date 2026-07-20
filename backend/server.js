

import app  from './src/app.js'
import http from 'http'
import {  Server} from 'socket.io'
import connect from './src/db/db.js'

const server = http.createServer(app)


const io = new Server(server, {
    cors : {
        origin : "*"
    }
})


io.on('connection', socket => {
    const roomId = socket.handshake.query.roomId;

    socket.join(roomId);

    console.log('New client connected');

    socket.on("chacha", msg => {
        console.log(msg);
        
        socket.to(roomId).emit('message', msg);
    });
});


server.listen(3000, ()=>{
    console.log("server started");
    connect()
})
