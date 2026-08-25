const express = require('express')
const {
    createNotesController,
    getAllNotesController,
    getSingleNoteController,
    updateNoteController,
    deleteNotesController
} = require('../controllers/notes.controller')

// It creates a router instance which we can use to define routes
const notesRoute = express.Router()

// Create Notes
notesRoute.post('/create', createNotesController)

// Fetch All Notes
notesRoute.get('/all', getAllNotesController)

// Fetch Single Note
notesRoute.get('/:id', getSingleNoteController)

// Update Notes
notesRoute.patch('/update/:id', updateNoteController)

// Delete Notes
notesRoute.delete('/delete/:id', deleteNotesController)

module.exports = notesRoute