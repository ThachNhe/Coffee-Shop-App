require("dotenv").config();

const express = require("express");
const MongoStore = require("connect-mongo");
const routesInit=require("./routes/index_route");

const connectDB = require("./config/db");

const app = express();
const PORT = 5000 || process.env.PORT;

connectDB();
routesInit(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});