const express = require('express');
const cors = require('cors');
const socket = require('socket.io');

const app = express();

app.use(cors());

const server = app.listen(3000, () => {
	console.log('Running at port 3000.');
});

const io = socket(server);

io.on('connection', (socket) => {
	console.log(`Client with id ${socket.id} was connected.`);

	socket.on('message', (message) => {
		io.emit('message', message);
	});

	socket.on('disconnect', () => {
		console.log(`Client with id ${socket.id} was disconnected.`);
	});
});
