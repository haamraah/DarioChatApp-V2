const socketIO = require("socket.io");

let io; // Variable to hold the socket.io server instance
const onlineUsers = []

function init(server) {
    const onlineUsers = []

    io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        console.log("user connected", socket.id);
        socket.on("join_room", (userConnection) => {
            console.log(`${userConnection.user.username} joined room ${userConnection.room} socket id ->${socket.id}`);
            socket.join(userConnection.room);
            onlineUsers.push(userConnection.user.username)
            socket.to(userConnection.room).emit('new_user_loggin',onlineUsers)
console.log('online users =========== ',onlineUsers)
        });
        socket.on('send_message', (data) => {
            console.log(data.room , data.message,'--------------')
            socket.to(data.room).emit('recive_message',data)
        })
        socket.on("disconnect", () => {
            socket.to(socket.room).emit('user_logout',socket.id)

            console.log("user disconnected", socket.id);
        });
    });
}

function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

module.exports = {
    init,
    getIO,
};
