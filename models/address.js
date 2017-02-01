var Arrow = require('arrow');

module.exports = Arrow.Model.extend('address', {
	fields: {
        sid: { type: String },
		friendlyName: { type: String },
		customerName: { type: String },
		street: { type: String },
		city: { type: String },
		region: { type: String },
		postalCode: { type: String },
		isoCountry: { type: String }
	},
    connector: "appc.twilio"
});