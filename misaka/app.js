require('dotenv').config();
const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const shareSession = require('express-socket.io-session');

const app = express();
const server = http.createServer(app);
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
const sessionMiddleware = session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'lax', // or 'none' if using HTTPS
    secure: false     // set to true in production with HTTPS
  }
});
app.use(express.json());
app.use(sessionMiddleware);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.use(shareSession(sessionMiddleware, {
  autoSave: true
}));


const rooms = {};
const games = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.session.userId;
  //if (!userId) {
  //  return socket.disconnect();
  //}
  //console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    if (!rooms[roomId].includes(socket.id)) {
      rooms[roomId].push(socket.id);
    }
    if (!games[roomId]) {
      games[roomId] = {
        board: Array.from({ length: 6 }, () => Array(7).fill(null)),
        currentPlayer: 'red',
        winner: null
      };
    }
    const playerRole = rooms[roomId].length === 1 ? 'red' : 'yellow';
    socket.emit("playerRole", playerRole);
    socket.emit("gameState", games[roomId]);
    io.to(roomId).emit('roomUpdate', rooms[roomId]);
    console.log(`User ${userId} joined room ${roomId} as ${playerRole}`);
  });

  socket.on("move", ({ roomId, col, player }) => {
    const game = games[roomId];
    if (!game || game.winner || game.currentPlayer !== player) return;
    let row = -1;
    for (let r = game.board.length - 1; r >= 0; r--) {
      if (!game.board[r][col]) {
        row = r;
        break;
      }
    }
    if (row === -1) return;
    game.board[row][col] = player;
    game.winner = checkWinner(game.board);
    game.currentPlayer = game.currentPlayer === 'red' ? 'yellow' : 'red';
    io.to(roomId).emit("gameState", game);
  });

  socket.on("restart", (roomId) => {
    if (games[roomId]) {
      games[roomId] = {
        board: Array.from({ length: 6 }, () => Array(7).fill(null)),
        currentPlayer: 'red',
        winner: null
      };
      io.to(roomId).emit("gameState", games[roomId]);
    }
  })

  socket.on("disconnect", () => {
    console.log(`User ${userId} disconnected`);
    for (const [roomId, sockets] of Object.entries(rooms)) {
      const index = sockets.indexOf(socket.id);
      if (index !== -1) {
        sockets.splice(index, 1);
        io.to(roomId).emit('roomUpdate', sockets);
        if (sockets.length === 0) {
          delete games[roomId]; // Clean up game state
        }
        console.log(`User ${userId} left room ${roomId}`);
      }
    }
  });
});

function checkWinner(board) {
  const directions = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: -1 }
  ];
  const rows = board.length;
  const cols = board[0].length;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const player = board[r][c];
      if (!player) continue;
      for (const { x, y } of directions) {
        let count = 1;
        for (let step = 1; step < 4; step++) {
          const nr = r + step * y;
          const nc = c + step * x;
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || board[nr][nc] !== player) {
            break;
          }
          count++;
        }
        if (count === 4) return player;
      }
    }
  }
  return null;
}


app.use('/auth', authRoutes);

app.get('/', (req, res) => res.send('Misaka is running 😊'));

server.listen(3000, () => console.log('http://localhost:3000'));
