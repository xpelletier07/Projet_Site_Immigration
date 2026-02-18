const app = require("express");

app.use(express.json());

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/../Client/index.html");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
