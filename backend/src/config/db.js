import mongoose from "mongoose";
import props from "./properties";

module.exports = function () {
    mongoose.connect(props.DB).then(() => {
        console.log("Connected to MongoDB...");
    }
    ).catch(err => {
        console.log("Could not connect to MongoDB...");
        process.exit();
    }
    );
}
