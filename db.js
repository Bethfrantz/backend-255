const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://SDEV255:password255@songdb.xbxh6fd.mongodb.net/songsdb?retryWrites=true&w=majority", 
)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB...", err));

module.exports = mongoose;
