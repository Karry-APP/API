const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/config');

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true }).then(
	() => {
		console.log('Successfully connected to database');
	},
	err => {
		console.log('Failed to connect to database', err);
	}
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static(__dirname + '/uploads'));

require('./routes/users')(app);
require('./routes/trips')(app);

app.listen(config.PORT, () => {
	console.log(`Successfully lunched server on port ${config.PORT}`);
});
