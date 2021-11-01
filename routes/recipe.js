const express = require("express");
const recipe = require("../models/recipeSchema.js");
const { upload } = require("../middleware/upload");
const verifyUser = require("../middleware/verifyUser.js");

const router = express.Router();

router.post("/", verifyUser, upload.array("image", 5), (req, res) => {
	const newRecipe = {
		name: req.body.name,
		image: req.files[0].location,
		description: req.body.description,
		time: req.body.time,
		serves: req.body.serves,
		ingredients: req.body.ingredients,
		steps: req.body.steps,
		user: req.body.userId,
	};

	recipe.create(newRecipe, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

router.put("/:id", verifyUser, upload.array("image", 5), function (req, res) {
	const newRecipe = {
		name: req.body.name,
		image: req.files[0] ? req.files[0].location : req.body.image,
		description: req.body.description,
		time: req.body.time,
		serves: req.body.serves,
		ingredients: req.body.ingredients,
		steps: req.body.steps,
		user: req.body.userId,
	};

	recipe.findByIdAndUpdate(req.body._id, newRecipe, (err, updatedRecipe) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(updatedRecipe);
		}
	});
});

router.get("/", (req, res) => {
	recipe.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

router.get("/search", (req, res) => {
	const { query } = req.query;
	recipe.find({ $text: { $search: query } }).exec((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

router.get("/user/:id", verifyUser, (req, res) => {
	recipe.find({ user: req.params.id }).exec((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

router.get("/:id", (req, res) => {
	recipe.findById(req.params.id, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

router.delete("/:id", (req, res) => {
	recipe.remove({ _id: req.params.id }, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

module.exports = router;
