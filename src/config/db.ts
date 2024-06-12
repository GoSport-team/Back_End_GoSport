import mongoose from "mongoose";
const connectionDB = async () => {
    try {
        const dbURI ='mongodb+srv://GoSport:e4t5La0iPpalsVTT@atlascluster.aiyeayr.mongodb.net/goSport';
        await mongoose.connect(dbURI);
        console.log("Connection established to goSport database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};

export default connectionDB;