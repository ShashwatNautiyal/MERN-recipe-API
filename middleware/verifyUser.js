const jwt = require("jsonwebtoken");
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

const verifyUser = (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) return res.status(400).send("access denied");

	try {
		const verifiedUser = jwt.verify(token, JWT_TOKEN_SECRET);
		req.user = verifiedUser;
		next();
	} catch (err) {
		res.status(400).send("invalid token");
	}
};

module.exports = verifyUser;
