'use strict';

let development = {
	bs: {
		host: 'localhost',
		port: 11300,
		tube: 'vote',
		pri: 1000,
		ttr: 300,
		delay: 0
	},
	redis: {
		host: '127.0.0.1',   // Redis host
		port: 6379,          // Redis port
		family: 4,           // 4 (IPv4) or 6 (IPv6)
		db: 1,
		retryStrategy: function (times) {
			return Math.min(times * 2, 2000); // delay
		}
	}
};

let production = {
	bs: {
		host: '10.240.0.2',
		port: 11300,
		tube: 'vote',
		pri: 1000,
		ttr: 300,
		delay: 0
	},
	redis: {
		host: '10.240.0.3',   // Redis host
		port: 6379,          // Redis port
		family: 4,           // 4 (IPv4) or 6 (IPv6)
		db: 1,
		retryStrategy: function (times) {
			return Math.min(times * 2, 2000); // delay
		}
	}
};


switch (process.env.NODE_ENV) {
	case 'production':
		module.exports = production;
		break;
	default:
		module.exports = development;
		break;
}
