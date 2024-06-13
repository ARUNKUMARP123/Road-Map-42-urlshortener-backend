const mongoose = require('mongoose');
mongoose.set("strictQuery",false);

const connectDB = async (res) => {
    const mongodb_URL=process.env.NODE_ENV==="production"?process.env.MONGODB_ATLAS_URL:process.env.MONGODB_COMPASS_URL;
    try {
        await mongoose.connect(mongodb_URL);
        if(mongoose.connection.readyState===2){
            res &&  res.send("Connecting......!")
        }
        if(mongoose.connection.readyState===1){
            res && res.send("Connected.")
        }

        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        res && res.send("Dis-Connected.")
        process.exit(1);
    }
};

module.exports = connectDB;
