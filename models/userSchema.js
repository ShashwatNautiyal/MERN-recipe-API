const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		min: 6,
		max: 30,
	},
	lastName: {
		type: String,
		required: true,
		min: 6,
		max: 30,
	},
	email: {
		type: String,
		required: true,
		min: 10,
		max: 255,
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("user", userSchema);
