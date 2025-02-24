import { Server } from 'socket.io';
import { createServer } from 'http';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://your-production-domain.com' 
      : "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

io.on('connection', (socket) => {
  const { rideId, userId } = socket.handshake.query;
  
  if (!rideId) {
    socket.disconnect();
    return;
  }

  console.log(`Client connected: ${userId} to ride: ${rideId}`);
  
  socket.join(rideId as string);

  socket.on('message', (message) => {
    try {
      io.to(rideId as string).emit('message', message);
    } catch (error) {
      console.error('Error broadcasting message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${userId} from ride: ${rideId}`);
    socket.leave(rideId as string);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

const PORT = process.env.SOCKET_PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
}).on('error', (error) => {
  console.error('Server error:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
}); 