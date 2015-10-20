'use strict';

let development = {
	bs: {
		host: 'localhost',
		port: 11300,
		tube: 'vote',
		pri: 1000,
		ttr: 300,
		delay: 0
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
