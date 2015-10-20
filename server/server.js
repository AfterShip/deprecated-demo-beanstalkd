'use strict';

let config = require('./config');

let express = require('express');

let app = express();

let fivebeans = require('fivebeans');

let client = new fivebeans.client(config.bs.host, config.bs.port);


client
	.on('connect', function () {
		// client can now be used
		console.log('client connected');

		client.use(config.bs.tube, function (err, tube) {
			if (err) {
				console.log('Error use tube: ' + tube);
				console.log(err);
			} else {
				console.log('Using tube: ' + tube);
			}
		});
	})
	.on('error', function (err) {
		// connection failure
		console.log('connection failure: ' + err);
	})
	.on('close', function () {
		// underlying connection has closed
		console.log('connection closed');
	})
	.connect();


let server = app.listen(process.env.SERVER_PORT || 7777, function () {
	let host = server.address().address;
	let port = server.address().port;
	console.log('Listening: ' + host + ':' + port);
});

app.get('/', function (req, res) {
	if (req.query.vote === 'carol' || req.query.vote === 'may' || req.query.vote === 'tina') {
		client.put(config.bs.pri, config.bs.delay, config.bs.ttr, req.query.vote, function (err, job_id) {
			let status = 1;
			if (err) {
				status = 0;
			}
			res
				.status(200)
				.json({
					job_id: job_id,
					status: status
				});
		});
	} else {
		res
			.status(200)
			.json({
				message: 'Please request /?vote=carol or /?vote=may or /?vote=tina'
			});
	}
});
