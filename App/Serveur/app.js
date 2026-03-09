const app = require("express");
const port = 3000
import {db, initializeDatabase} from "./db/db.js"

app.use(express.json());

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/../Client/index.html");
});


app.listen(port, () => {
	console.log("Server is running on port " + port );
});

