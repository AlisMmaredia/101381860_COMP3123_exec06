const express = require('express');
const router = express.Router();
const noteModel = require('../models/NotesModel');  // Assuming this is your Note model

// Create a new Note
router.post('/', (req, res) => {
    const newNote = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateAdded: new Date(),
        dateUpdated: new Date()
    });

    newNote.save()
        .then(note => res.json(note))
        .catch(err => res.status(400).send({ message: err.message }));
});

// Retrieve all Notes
router.get('/', (req, res) => {
    noteModel.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).send({ message: err.message }));
});

// Retrieve a single Note with noteId
router.get('/:noteId', (req, res) => {
    noteModel.findById(req.params.noteId)
        .then(note => {
            if (!note) return res.status(404).send({ message: "Note not found" });
            res.json(note);
        })
        .catch(err => res.status(400).send({ message: err.message }));
});

// Update a Note with noteId
router.put('/:noteId', (req, res) => {
    const updatedFields = {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateUpdated: new Date()
    };

    noteModel.findByIdAndUpdate(req.params.noteId, updatedFields, { new: true })
        .then(note => {
            if (!note) return res.status(404).send({ message: "Note not found" });
            res.json(note);
        })
        .catch(err => res.status(400).send({ message: err.message }));
});

// Delete a Note with noteId
router.delete('/:noteId', (req, res) => {
    noteModel.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) return res.status(404).send({ message: "Note not found" });
            res.json({ message: "Note deleted successfully!" });
        })
        .catch(err => res.status(400).send({ message: err.message }));
});

module.exports = router;