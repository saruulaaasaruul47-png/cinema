const express = require('express');
const movieRouter = require('./routes/router.movie');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/movie", movieRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});