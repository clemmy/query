import { Router } from 'express';
import facets from './facets';
import request from 'superagent';
import _ from 'lodash';
import crypto from 'crypto';

function validateSchema(keysArray, actualObj) {
	var valid = true;
	_.forEach(keysArray, (key) => {
		if (!actualObj[key]) {
			valid = false;
			return;
		}
	});

	return valid;
}

function executeQuery(queryString, cb) {
	request
		.post('https://api-us.clusterpoint.com/v4/102304/HackingEDU2015/_query')
		.set('Content-Type', 'application/text')
		.auth('clement.hoang24@gmail.com', 'ClusterpointClem123')
		.send(queryString)
		.end(cb);
}

export default function() {
	var api = Router();

	// mount the facets resource
	api.use('/facets', facets);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({
			version : '1.0'
		});
	});

	api.post('/query', (req, res) => {
		console.log('Hit /query');
		console.log(req.body);

		executeQuery(req.body.cmd, (error, response) => {
			res.json({
				err: error,
				res: response
			});
		});
	});

	api.post('/login', (req, res) => {
		executeQuery('select * from HackingEDU2015 where username == "' + req.body.username + '"', (error, response) => {
				var resp = JSON.parse(response.text);

				if (resp.results.length != 1) {
					throw new Error('duplicate usernames');
				}

				var acc = resp.results[0];
				if (acc.password === req.body.password) {
					res.json({
						user: acc.username,
						role: acc.userType,
						authenticated: true
					});
				} else {
					res.json({
						user: acc.username,
						role: acc.userType,
						authenticated: false
					});
				}
		});
	});

	api.post('/users', (req, res) => {
		console.log('Hit /users');
		console.log(req.body);

		if (validateSchema(['username', 'password', 'userRole'], req.body)) {

			if (req.body.userRole === 'prof') {
				req.body.accessCode = crypto.randomBytes(20).toString('hex').substring(0, 6);

				request
					.post('https://api-us.clusterpoint.com/v4/102304/HackingEDU2015')
					.auth('clement.hoang24@gmail.com', 'ClusterpointClem123')
					.send(req.body)
					.end((error, response) => {
						res.json({
							err: error,
							res: response
						});
					});

			} else if (req.body.userRole === 'student') {
				executeQuery('select * from HackingEDU2015 where accessCode == "' + req.body.accessCode + '"', (error, response) => {
					if (error) {
						// console.log(error);
						console.log('warning: an error has occurred, but still working.');
					}

					req.body.class = JSON.parse(response.text).results[0].class;
					delete req.body.accessCode;

					request
						.post('https://api-us.clusterpoint.com/v4/102304/HackingEDU2015')
						.auth('clement.hoang24@gmail.com', 'ClusterpointClem123')
						.send(req.body)
						.end((error, response) => {
							res.json({
								err: error,
								res: response
							});
						});

				});
			}
		} else {
			res.json({
				err: 'params do not match schema'
			})
		}
	});

	api.post('/clean', (req, res) => {
		executeQuery('select * from HackingEDU2015', (error, response) => {
				var docs = JSON.parse(response.text);

				_.forEach(docs.results, function(result) {
					executeQuery('delete HackingEDU2015["' + result._id + '"]');
				});
		});
		res.json({
			msg: "deleted stuff"
		});
	});

	return api;
}
