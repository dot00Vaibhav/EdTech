const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
	// Support both common env var names without requiring env changes
	const mongoUrl =
		process.env.MONGO_URL || process.env.MONGODB_URL || process.env.DATABASE_URL;

	if (!mongoUrl || typeof mongoUrl !== "string") {
		console.error("DB Connection Failed");
		console.error(
			"Missing MongoDB connection string. Set MONGO_URL or MONGODB_URL in server/.env"
		);
		process.exit(1);
	}

	mongoose
		.connect(mongoUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log("DB Connection Success"))
		.catch((err) => {
			console.error("DB Connection Failed");
			console.error(err);
			process.exit(1);
		});
};
