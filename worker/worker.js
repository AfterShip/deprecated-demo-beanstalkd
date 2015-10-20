'use strict';

let config = require('./config');

let fivebeans = require('fivebeans');

let Redis = require('ioredis');
let redis = new Redis(config.redis);

let client = new fivebeans.client(config.bs.host, config.bs.port);

client
	.on('connect', function () {
		// client can now be used
		console.log('client connected');

		client.watch(config.bs.tube, function (err, num_watched) {
			if (err) {
				console.log('Error watch tube (' + num_watched + '): ' + config.bs.tube);
				console.log(err);
			} else {
				console.log('Watching tube (' + num_watched + '): ' + config.bs.tube);
				doJob();
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

function doJob() {
	console.log('Waiting a job to be reserved...');
	client.reserve(function (err, job_id, payload) {
		console.log('Job ' + job_id + ' in progress');

		if (err) {
			client.bury(job_id, config.bs.pri, function (bury_err) {
				console.log('bury: ' + bury_err);

				doJob();
			});
		} else {
			saveVote(job_id, payload.toString(), function (save_vote_err) {
				if (save_vote_err) {
					console.log('destroy: ' + job_id + ' error: ' + save_vote_err);
				} else {
					console.log('destroyed: ' + job_id);
				}
				doJob();
			});
		}
	});
}


function saveVote(job_id, girl, callback) {
	redis.incr(girl);
	client.destroy(job_id, function (err) {
		callback(err);
	});
}
