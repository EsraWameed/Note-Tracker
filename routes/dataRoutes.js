//requiring modules
const newroute  = require("express").Router();
const dataSave = require("../db/dataSave");

//creating GET requests
newroute.get("/notes", function(req, res){
    dataSave.fetchNote().then(newNotes => res.json(newNotes))
    .catch(error=> res.status(404).json(error));
});

//handling POST request
newroute.post("/notes", (req,res)=>{
    dataSave.noteAdd(req.body).then((newNote)=> res.json(newNote)).catch(error => res.status(404).json(error));
});

//delete Note
newroute.delete("/notes/:id", function(req,res){
    dataSave.noteDelete(req.params.id)
    .then(()=>res.json({ok:true}))
    .catch(error=> res.status(404).json(error));
})

module.exports = newroute;