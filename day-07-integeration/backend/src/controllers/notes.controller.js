const noteModel = require('../models/notes.models')

// Create Notes API
const createNotesController = async (req, res) => {
    try {
        const { title, description } = req.body
        const newNote = await noteModel.create({
            title,
            description
        })

        return res.status(201).json({
            message: "note created successfully ✅",
            data: newNote
        })
    } catch (err) {
        return res.status(400).json({
            message: "something went wrong",
            error: err.message
        })
    }
}

// Fetch All Notes API
const getAllNotesController = async (req, res) => {
    try {
        const notes = await noteModel.find()
        return res.status(200).json({
            message: "notes fetched successfully",
            data: notes
        })
    } catch (err) {
        return res.status(400).json({
            message: "something went wrong",
            error: err.message
        })
    }
}

// Fetch Single Notes API
const getSingleNoteController = async (req, res) => {
    try {
        const note = await noteModel.findById(req.params.id)
        return res.status(200).json({
            message: "note fetched successfully",
            data: note
        })
    } catch (err) {
        return res.status(400).json({
            message: "something went wrong",
            error: err.message
        })
    }
}

// Update Notes API
const updateNoteController = async (req, res) => {
    try {
        const note = await noteModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(200).json({
            message: "note updated successfully",
            data: note
        })
    } catch (err) {
        return res.status(400).json({
            message: "something went wrong",
            error: err.message
        })
    }
}

// Delete Notes API
const deleteNotesController = async (req, res) => {
    try {
        const note = await noteModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "note deleted successfully"
        })
    } catch (err) {
        return res.status(400).json({
            message: "something went wrong",
            error: err.message
        })
    }
}

module.exports = {
    createNotesController,
    getAllNotesController,
    getSingleNoteController,
    updateNoteController,
    deleteNotesController
}