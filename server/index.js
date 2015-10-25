import http from 'http';
import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import db from './db';
import middleware from './middleware';
import api from './api';

var app = express();
app.server = http.createServer(app);
var io = require('socket.io')(app.server);

io.on('connection', function(socket){
  console.log('a user connected');

	socket.on('chat message', function(msg){
		console.log(msg);
	});
});



// 3rd party middleware
app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
	limit : '100kb'
}));

app.use('/', express.static(path.join(__dirname, '../client/dist')));

// connect to db
db( λ => {

	// internal middleware
	app.use(middleware());

	// api router
	app.use('/api', api());

	app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });

	app.server.listen(process.env.PORT || 9001);

	console.log('Started on port ${app.server.address().port}');
});

export default app;
