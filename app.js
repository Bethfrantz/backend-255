const express = require("express");
const Song = require("./models/song");
var cors = require('cors')
const app = express();
app.use(cors())
// Middleware that parses HTTP requests with JSON body
app.use(express.json());

const router = express.Router();

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

app.use("/api", router);

app.listen(3000);
