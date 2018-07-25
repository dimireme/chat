const express = require('express');
const cors = require('cors');
const socket = require('socket.io');

const app = express();

app.use(cors());
app.get('/getHistory', (req, res) => {
	res.json([
		{ author: 'Alex', text: 'Hello one!', timestamp: '2018-07-25T14:04:48.000Z' },
		{ author: 'Andrey', text: 'Hi!', timestamp: '2018-07-25T14:05:18.000Z' },
	]);
});

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
