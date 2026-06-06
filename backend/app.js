const express = require('express');
const movieRouter = require('./routes/router.movie');
const hallsRouter = require('./routes/router.halls');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/movie", movieRouter);
app.use("/api/v1/halls", hallsRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});