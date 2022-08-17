import express from "express"
import { createServer } from 'http'
import { Server } from 'socket.io'
// import onConnection from 'socket_io/onConnection.js'
import path from "path"
import cors from 'cors'
import { requestTime,logger } from "./middleware.js";
import serverRoutes from "./routes/servers.js"
const PORT =process.env.PORT?? 3000;
const __dirname = path.resolve();
const app = express();
const ALLOWED_ORIGIN = 'http://localhost:3000'
app.use(
    cors({
        origin:'*', 
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200,
    })
  )
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(requestTime);
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(serverRoutes);

const server = createServer(app)
const io = new Server(server, {
    cors: ALLOWED_ORIGIN,
    serveClient: false
  })
// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname, 'static','index.html'))
// })


// let io = require("socket.io")(app);

const users = {

}

io.on('connection',socket=>{
    socket.on('new-user',name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-connected',name)
    })
    socket.on('send-chat-message',message=>{
        socket.broadcast.emit('chat-message',{message:message,name:users[socket.id]})
    })
})

server.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`)
})