const app = require('./app')
require('dotenv').config();



const PORT = process.env.PORT || 3030;

const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', () => {
  console.log('a user connected');
 
});

const start = async () => {
  try {
    console.log('Database connection successful');
    
    server.listen(PORT, (err) => {
      if (err) console.error('Error at aserver launch:', err);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
};

start();


