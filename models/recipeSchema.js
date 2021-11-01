const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	ingredients: [String],
	steps: [String],
	time: {
		type: Number,
		required: true,
	},
	serves: {
		type: Number,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

recipeSchema.index({ name: "text" });

module.exports = mongoose.model("recipe", recipeSchema);
