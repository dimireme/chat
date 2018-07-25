const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const dataFile = path.join(__dirname, 'data.json');

app.use(cors());
app.get('/getHistory', (req, res) => {
	fs.readFile(dataFile, 'utf8', (err, data) => {
		if (err) console.error(err);

		// get only last 3 messages.
		const result = JSON.parse(data).slice(-3);

		res.json(result);
	});
});

const server = app.listen(3000, () => {
	console.log('Running at port 3000.');
});

const io = socket(server);

io.on('connection', (socket) => {
	console.log(`Client with id ${socket.id} was connected.`);

	socket.on('message', (message) => {
		// save message to the data file
		fs.readFile(dataFile, 'utf8', (err, data) => {
			if (err) console.error(err);

			const result = JSON.parse(data);
			result.push(message);
			fs.writeFile(dataFile, JSON.stringify(result), (err) => {
				if (err) console.error(err);
			});
		});

		io.emit('message', message);
	});

	socket.on('disconnect', () => {
		console.log(`Client with id ${socket.id} was disconnected.`);
	});
});
