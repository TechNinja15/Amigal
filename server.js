const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const rooms = {};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client.html'));
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', (data) => {
    let roomID, name;
    if (typeof data === 'object') {
      roomID = data.room;
      name = data.name;
    } else {
      roomID = data;
      name = 'Anonymous';
    }

    socket.userName = name;

    if (!rooms[roomID]) rooms[roomID] = [];
    rooms[roomID].push(socket.id);
    socket.join(roomID);

    if (rooms[roomID].length === 2) {
      const socket1 = io.sockets.sockets.get(rooms[roomID][0]);
      const socket2 = io.sockets.sockets.get(rooms[roomID][1]);

      if (socket1) socket1.emit('paired', { room: roomID, initiator: socket.id, remoteName: socket2 ? socket2.userName : 'Partner' });
      if (socket2) socket2.emit('paired', { room: roomID, initiator: socket.id, remoteName: socket1 ? socket1.userName : 'Partner' });

      console.log(`Room ${roomID} is ready. ${socket1?.userName} <-> ${socket2?.userName}`);
    } else {
      socket.emit('waiting');
      console.log(`Waiting for friend in room ${roomID}`);
    }
  });

  socket.on('message', ({ room, text }) => {
    socket.to(room).emit('message', { from: socket.id, text });
  });

  socket.on('signal', ({ room, data }) => {
    socket.to(room).emit('signal', data);
  });

  socket.on('activity', ({ room, data }) => {
    socket.to(room).emit('activity', data);
  });

  socket.on('disconnect', () => {
    for (const roomID in rooms) {
      rooms[roomID] = rooms[roomID].filter(id => id !== socket.id);
      if (rooms[roomID].length === 0) delete rooms[roomID];
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));