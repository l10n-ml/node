// Setup main app/server
var http = require('http'),
	// server
	express = require('express'),
	app = express(),
	server = http.createServer(app),
	// main lib
	L10N = require("l10n-api");

// init lib
var l10n = new L10N({
	key: "{{KEY}}",
	secret: "{{SECRET}}",
	//url: "http://localhost"
});

// routes
app.get('/', function(req, res){
	res.send('<html><body><h2>Authenticated</h2><p>Aplication Token: '+ l10n.token() +'</p></body></html>');
	res.end();
});


// 1-1 api endpoing mapping
app.get('/api/*', function(req, res){
	var uri = req.params[0];
	var path = uri.split("/");
	var params = {
		name: path[0],
		id: path[1] || false,
		type: path[3] || false,
		token: l10n.token()
	}
	//
	l10n.read( params, function(err, result){
		console.log(result);
		res.end( result );
	});
});


// Run server on this port
server.listen(8080);
