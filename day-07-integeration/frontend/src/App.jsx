import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:3000/notes'

export default function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [editId, setEditId] = useState(null)

  const fetchNotes = () => axios.get(`${API}/all`).then(res => setNotes(res.data.data || [])).catch(console.error)
  useEffect(() => { fetchNotes() }, [])

  const reset = () => { setEditId(null); setTitle(''); setDesc('') }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !desc.trim()) return
    editId
      ? await axios.patch(`${API}/update/${editId}`, { title, description: desc })
      : await axios.post(`${API}/create`, { title, description: desc })
    reset()
    fetchNotes()
  }

  const handleDelete = (id) => axios.delete(`${API}/delete/${id}`).then(fetchNotes).catch(console.error)

  const handleEdit = (n) => {
    setEditId(n._id || n.id)
    setTitle(n.title)
    setDesc(n.description)
  }

  return (
    <div className="p-8 max-w-xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6">Notes App</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border border-black p-2 text-sm outline-none" />
        <textarea placeholder="Description" rows={3} value={desc} onChange={e => setDesc(e.target.value)} className="border border-black p-2 text-sm outline-none resize-none" />
        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-black text-white p-2 text-sm cursor-pointer">{editId ? 'Update Note' : 'Add Note'}</button>
          {editId && <button type="button" onClick={reset} className="border border-black p-2 text-sm cursor-pointer">Cancel</button>}
        </div>
      </form>

      <div className="flex flex-col gap-3">
        {notes.map((n) => (
          <div key={n._id || n.id} className="border border-black p-4 flex justify-between items-start gap-4">
            <div>
              <h3 className="font-bold">{n.title}</h3>
              <p className="text-sm text-neutral-700 mt-1">{n.description}</p>
            </div>
            <div className="flex gap-3 text-xs uppercase underline cursor-pointer">
              <button onClick={() => handleEdit(n)}>Edit</button>
              <button onClick={() => handleDelete(n._id || n.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}