import mongoose from "mongoose";

const connectDb = async () => {
    try {
        /**
         * To establish a connection to the MongoDB database named "chai".
         * `mongodb://localhost:27017/chai` is the local database URL where MongoDB is running.
        */
        const conn = await mongoose.connect(`mongodb://localhost:27017/chai`, {
            useNewUrlParser: true,
        }
    );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;

    } catch (error) {
        /**
         * If an error occurs while connecting to DB, Exit the process with status code 1 (indicates failure).
        */
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDb;