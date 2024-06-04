const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://nickoberoy629:Niranjan123@cluster0.jeubyyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);  // Exit process with failure
    }
};
module.exports = connectDB;
