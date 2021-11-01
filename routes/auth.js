const router = require("express").Router();
const user = require("../models/userSchema");
const { registerValidation } = require("../middleware/validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
	let userReq = req.body;
	const saltRounds = 10;
	const { error } = registerValidation(userReq);
	const emailExist = await user.findOne({ email: req.body.email }).exec();

	if (error) return res.status(400).send(error.details[0].message);
	else if (emailExist) return res.status(400).send("Email already exists");
	else {
		bcrypt.hash(userReq.password, saltRounds).then((hash) => {
			userReq.password = hash;
			user.create(userReq, (err, data) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(201).send({ _id: data._id });
				}
			});
		});
	}
});

router.post("/login", async (req, res) => {
	const _user = await user.findOne({ email: req.body.email }).exec();

	if (!_user) return res.status(400).send("Email doesn't exist");
	else {
		bcrypt.compare(req.body.password, _user.password).then(function (result) {
			if (result) {
				const token = jwt.sign(
					{
						_id: _user._id,
						firstName: _user.firstName,
						lastName: _user.lastName,
						fullName: _user.firstName + " " + _user.lastName,
						email: _user.email,
					},
					process.env.JWT_TOKEN_SECRET
				);
				res.header("auth-token", token).send(token);
			} else {
				res.status(400).send("Wrong Password");
			}
		});
	}
});

module.exports = router;
