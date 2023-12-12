const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//Route 1 : Get all notes using: GET "/api/auth/getuser". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 2 : Add a ner notes using: POST "/api/auth/addnote". Login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", " Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If There are the error return Bad request with errrors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saved_note = await note.save();

      res.json(saved_note);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);


//Route 3 : Update a existing notes using: PUT "/api/note/updatenote". Login required
router.put(
  "/update/:id",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", " Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
      const  {title,description, tag} = req.body ;

      try {
      
      // Create a newNote object
      const newNote = {} ;
      if(title){newNote.title = title };
      if(description){newNote.description = description };
      if(tag){newNote.tag = tag };
  
      // Find the note to be updated and update it:-
      let note = await Note.findById(req.params.id) ;
      if(!note){return res.status(404).send("Note not found")};

      if(note.user.toString()!= req.user.id){
        return res.status(401).send("Not allowes");
      };

      note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
      res.json({note});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
  );


  //Route 4 : Delete a existing notes using: DELETE "/api/note/deletenote". Login required
router.delete("/deletenote/:id",fetchuser,async (req, res) => {
      
    try {
      
      // Find the note to be updated and delete it:-
      let note = await Note.findById(req.params.id) ;
      if(!note){return res.status(404).send("Note not found")};

      // Allow deletion only if user owns this Note
      if(note.user.toString()!= req.user.id){
        return res.status(401).send("Not allowes");
      };

      note = await Note.findByIdAndDelete(req.params.id)
      res.json({"Success": "Note has been deleted", note: note});

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
  );

module.exports = router;
