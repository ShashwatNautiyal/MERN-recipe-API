const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
require("dotenv/config");
const recipesRoute = require("./routes/recipe");
const authRoute = require("./routes/auth");

const app = express();
const port = process.env.PORT || 8000;
const connection_url = process.env.DB_CONNECTION_URL;

mongoose.connect(connection_url, { useNewUrlParser: true }, () => {
	console.log("connected to DB!");
});

app.use(
	cors({
		origin: "*",
	})
);
app.use(express.json());
app.use("/recipes", recipesRoute);
app.use("/user", authRoute);

app.get("/", (req, res) => {
	res.status(200).send("recipes API");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
