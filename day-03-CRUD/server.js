const express = require('express')

const app = express()

app.use(express.json())

let notes = [] // Temp. Database

// Create
app.post('/create', (req, res)=>{
    const {id, title, description} = req.body
    notes.push({id, title, description})
    res.send('notes created successfully ✅')
})

// Read
app.get('/', (req, res)=>{
    res.send(notes)
})

// Update
app.put('/update/:id', (req,res)=>{
    let {title , description} = req.body
    notes[req.params.id].title = title
    notes[req.params.id].description = description
    res.send('notes updated successfully ✅')
})

// Delete
app.delete('/delete/:id', (req,res)=>{
    delete notes[Number(req.params.id)]
    res.send('notes deleted successfully ✅')
})

app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})