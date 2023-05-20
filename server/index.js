const express = require('express')
const cors = require("cors")
const sequelize = require("./db")
const fileUpload = require("express-fileupload")
require('dotenv').config()
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errorMiddleware");
const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
const PORT = process.env.PORT ?? 3000
app.use("/api", routes);
app.use(errorMiddleware);
async function start() {
    try {

        app.listen(PORT, async () => {
            await sequelize.authenticate();
            await sequelize.sync();
            console.log(`server started on PORT ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
