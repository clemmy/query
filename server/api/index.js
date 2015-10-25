import { Router } from 'express';
import facets from './facets';

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
		// make a user based on username, pw, role type

	});

	api.post('/users/:username/classrooms', (req, res) => {
		// make a classroom, living under prof object, takes in 'access_code', 'classroom_name'

	});

	return api;
}
