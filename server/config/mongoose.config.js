const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}

const url = process.env.NODE_ENV === 'dev' ?
	`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
	:
	`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const connection = mongoose.connect(url, options)
	.then(() => {
		console.log('Established a connection to the database')
	}).catch((err) => {
		console.log('Something went wrong when connecting to the database: ', + err)
	})

module.exports = connection