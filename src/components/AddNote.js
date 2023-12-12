import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/Notecontext';

const AddNote = (props) => {
    const context = useContext(noteContext) ;
    const {addNote} = context ;
    const [note, setnote] = useState({title: "", description: "", tag: ""}) ;

    const handleClick = (e)=>{
      e.preventDefault() ;
        addNote(note.title, note.description, note.tag) ;
        setnote({title: "", description: "", tag: ""})
        props.showAlert("Added successfully", "success") ;

    }

    const onChangee = (e) =>{
      setnote({...note, [e.target.name]: e.target.value})
    }

  return (
    
      
<div className="container my-3" >
<h1> Add a note </h1>
  <form>
    <div className="form-group" >
      <div className="mb-3">
      <label htmlFor="title">Title</label>
      <input type="text" className="form-control" value={note.title} name="title" aria-describedby="emailHelp " minLength={5} required onChange={onChangee}
      />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="desc">Description</label>
      <input
        type="text" className="form-control" id="description" value={note.description}  name="description"minLength={5} required onChange={onChangee}
      />
    </div>

    <div className="form-group">
      <label htmlFor="desc">Tag</label>
      <input
        type="text" className="form-control" id="tag" value={note.tag}  name="tag" onChange={onChangee}
      />
    </div>
    
    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
      Add a note
    </button>
  </form>
</div>
  )
}

export default AddNote
