require("dotenv").config();
const express      = require("express");
const cookieParser = require("cookie-parser");
const movieRouter  = require("./routes/router.movie");
const hallsRouter  = require("./routes/router.halls");
const authRouter   = require("./routes/router.auth");
const userRouter   = require("./routes/router.user");
const dashboardRouter = require("./routes/router.dashboard");
const globalHandler = require("./middleware/errorhandler");

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL || "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.use("/api/v1/auth",   authRouter);
app.use("/api/v1/users",  userRouter);
app.use("/api/v1/movie",  movieRouter);
app.use("/api/v1/halls",  hallsRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.use(globalHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
