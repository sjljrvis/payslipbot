exports.port = process.env.PORT || 3000;

exports.mongodb = {
	uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://sejal:sejal@ds121268.mlab.com:21268/slackbot'
};

exports.mailDetails = {
	host: "smtp.gmail.com",
	port: 465,
	user: "sejal@binarynumbers.io",
	password: "jarvis1995"
}


exports.slack = {
	botToken: 'xoxb-309498882962-OdDQOmGp8LR1naPvfhlWGBg9'
}

exports.apiaiAuth = {
	token: 'cd80027eb15f48d49b05cfef580f2aae'
}