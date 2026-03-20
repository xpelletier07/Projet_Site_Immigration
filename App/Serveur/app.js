const express = require("express");
const app = express();
const port = 3000;
const { initializeDatabase } = require("./db/db.js");
const authRouter = require("./api/auth.js");

app.use(express.json());
app.use("/auth", authRouter);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/../Client/index.html");
});

initializeDatabase()
	.then(() => {
		app.listen(port, () => {
			console.log("Server is running on port " + port);
		});
	})
	.catch((err) => {
		console.error("Error initializing database:", err.message);
	});

