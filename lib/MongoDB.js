const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, { useNewUrlParser: true })
    .then(() => {
      // console.log('MongoDB connected');
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};

connectDB();

module.exports = connectDB;
