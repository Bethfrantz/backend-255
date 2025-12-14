const express = require("express");
const Song = require("./models/song");
var cors = require('cors')
const app = express();
app.use(cors())
const bodyParser = require("body-parser");
const jwt = require("jwt-simple");
const User = require("./models/users");
// Middleware that parses HTTP requests with JSON body
app.use(express.json());

const router = express.Router();
const secret = "supersecret";

//creating a new user
router.post("/users", async (req, res) => {
   if (!req.body.username || !req.body.password) {
      res.status(400).json({ message: "Missing username or password" });
   }
   
   const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      status: req.body.status
   });
   try {
      await newUser.save();
      res.status(201).json(newUser);
   }
   catch(err){
console.log(err);
res.status(500).json({ error: "err.message" });
   }
})
// Get list of all songs in the database
router.get("/songs", async (req, res) => {
   try {
      const songs = await Song.find({})
      res.send(songs)
      console.log(songs)
   }
   catch (err) {
      console.log(err)
   }
})

//Grab a single song in the database
router.get("/songs/:id", async (req, res) => {
   try {
      const song = await Song.findById(req.params.id)
      res.json(song)
   }
   catch (err){
    res.status(404).send(err)
   }
})

// Add a new song to the database
router.post("/songs", async (req, res) =>{
   try {
      const song = await new Song(req.body);
      await song.save();
      res.status(201).json(song);
      console.log(song);
      
   }
   catch (err) {
      res.status(400).send(err);
   }
})

//update is to update an existing record/resource/database entry...it uses a put request
router.put("/songs/:id", async(req, res) => {
//first we need to find and update the song the frontend wants us to update.
//to do this we need to request the ide of the song from the request
//and then find it in the database and update it
try {
    const song = req.body
    await Song.updateOne({ _id: req.params.id},song);
    console.log(song)
    res.sendStatus(204)
    
}
catch (err) {
    if(err){}
        res.status(400).send(err);

}
})
router.delete("/songs/:id", async (req, res) => {
   try {
      const result = await Song.deleteOne({ _id: req.params.id});
      console.log("Delete result:", result);
   if (result.deletedCount === 0) {
      res.status(404).json({ message: "Song not found"});
   }
   res.status(200).json({ message: "Song deleted successfully"});
}catch (err) {
   console.error(err);
    res.status(400).json({error: err.message});
   }
})

app.use("/api", router);

app.listen(3000);
