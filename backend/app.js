require("dotenv").config();
const express      = require("express");
const cookieParser = require("cookie-parser");
const movieRouter  = require("./routes/router.movie");
const hallsRouter  = require("./routes/router.halls");
const authRouter   = require("./routes/router.auth");
const userRouter   = require("./routes/router.user");
const globalHandler = require("./middleware/errorhandler");

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth",   authRouter);
app.use("/api/v1/users",  userRouter);
app.use("/api/v1/movie",  movieRouter);
app.use("/api/v1/halls",  hallsRouter);

app.use(globalHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
