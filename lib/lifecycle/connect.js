const client = require('./../client');

exports.connect = function (next) {
	// Note: Our current context, aka "this", is a reference to your connector.
	var self = this;
	var config = self.config;

	this.twilio = client.getClient(config.sid, config.auth_token);

	next();
};