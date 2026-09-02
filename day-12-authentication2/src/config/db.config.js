import mongoose from "mongoose";

const connectToDb = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("connected to DB");
        })
        .catch((err) => {
            console.log("DB connection error:", err.message);
        });
};

export default connectToDb;