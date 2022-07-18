const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const corsMiddleWare = require("./middleware/cors.middleware");
const path = require("path");
const initDataBase = require("./startUp/initDataBase");
const app = express();
app.use(corsMiddleWare);

const routes = require("./routes");
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api", routes);

const PORT = process.env.PORT || 8080;

// if(process.env.NODE_ENV==="production"){
//     console.log("Production")
// }else{
//    console.log("Development")
// }

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client")));

    const indexPath = path.join(__dirname, "client", "index.html");

    app.get("*", (req, res) => {
        res.sendFile(indexPath);
    });
}

async function start() {
    try {
        mongoose.connection.once("open", () => {
            initDataBase();
        });
        await mongoose.connect(config.get("mongoUri"));
        console.log(chalk.green("MongoDB connected."));
        app.listen(PORT, () => console.log(chalk.green(`Server has been started on port ${PORT} `)));
    } catch (e) {
        console.log(chalk.red(e.message));
        process.exit(1);
    }
}

start();
