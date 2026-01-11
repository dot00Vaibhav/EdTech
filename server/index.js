// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// Prefer PORT env if set, else 5000; frontend will auto-detect if different
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();
 
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "studynotion-sand-sigma.vercel.app",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Lightweight health endpoint for frontend to discover the backend port
app.get("/api/v1/ping", (req, res) => {
	return res.status(200).json({ ok: true });
});

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Start server; if port busy, try next free port automatically
function startOnAvailablePort(targetPort) {
	const server = app
		.listen(targetPort, () => {
			console.log(`Server running on port ${targetPort}`);
		})
		.on("error", (err) => {
			if (err && err.code === "EADDRINUSE") {
				const next = targetPort + 1;
				console.error(`Port ${targetPort} in use, trying ${next}...`);
				startOnAvailablePort(next);
			} else {
				throw err;
			}
		});
}

startOnAvailablePort(PORT);

// End of code.
