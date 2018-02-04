exports.port = process.env.PORT || 3000;

exports.mongodb = {
	uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://user:password@ds121268.mlab.com:21268/slackbot'
};

exports.mailDetails = {
	host: "smtp.gmail.com",
	port: 465,
	user: "user@gmail.io",
	password: ""
}


exports.slack = {
	botToken: ''
}

exports.apiaiAuth = {
	token: ''
}
