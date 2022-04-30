const mongoose = require("mongoose");

const connectionDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Server Has Been Connected"))
    .catch((err) => console.error(err));
};

module.exports = connectionDatabase