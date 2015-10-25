import http from 'http';
import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import db from './db';
import middleware from './middleware';
import api from './api';
import request from 'superagent';

var app = express();
app.server = http.createServer(app);
var io = require('socket.io')(app.server);

var questionToVote = ''; //temporary var

io.on('connection', function(socket){
  console.log('a new client has connected');

	socket.on('init-message', function(msg){
    // socket.join(msg.class);
	});

  socket.on('question', (question) => {
    console.log('Received question packet: ');
    console.log(question);

    questionToVote = question;

    io.emit('question', question);
  });

  socket.on('vote', (vote) => {
    console.log('Received vote packet: ');
    console.log(vote);

    io.emit('vote', vote);
  });
});

// 3rd party middleware
app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
	limit : '100kb'
}));

app.get('/pebble/question', function (req, res) {
  res.json(questionToVote);
});

app.post('/pebble/vote', function (req, res) {
  console.log(req.body);
  io.emit('vote', {
    agree: req.body.agree
  });

  res.json({
    msg: 'done'
  });
});

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use('/splash', express.static(path.join(__dirname, '../landing')));

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

	console.log('Started on port ' + app.server.address().port);
});

export default app;

function executeQuery(queryString, cb) {
	request
		.post('https://api-us.clusterpoint.com/v4/102304/HackingEDU2015/_query')
		.set('Content-Type', 'application/text')
		.auth('clement.hoang24@gmail.com', 'ClusterpointClem123')
		.send(queryString)
		.end(cb);
}
