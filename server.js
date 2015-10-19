// Copyright 2015, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

let express = require('express');

let app = express();


// [START hello_world]
// Say hello!
app.get('/', function (req, res) {
	res
			.status(200)
			.json({status: 1})
});
// [END hello_world]


// [START server]
// Start the server
let server = app.listen(process.env.SERVER_PORT || 8080, function () {
	let host = server.address().address;
	let port = server.address().port;

	//console.log('App listening at http://%s:%s', host, port);
});
// [END server]
