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

	api.post('/login', (req, res) => {
		// TODO: validate against database
		var userType = 'student';  // || 'prof';

		res.json({
			user: 'req.username',
			role: userType,
			authenticated: true
		});
	});

	api.post('/users', (req, res) => {

		console.log(req.body);

		if (validateSchema(['username', 'password', 'userRole'], req.body)) {

			if (req.body.userRole === 'prof') {
				req.body.accessCode = crypto.randomBytes(20).toString('hex').substring(0, 6);
			}

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
		} else {
			res.json({
				err: 'params do not match schema'
			})
		}
	});

	api.post('/users/:username/classrooms', (req, res) => {
		// make a classroom, living under prof object, takes in 'access_code', 'classroom_name'

	});

	return api;
}
