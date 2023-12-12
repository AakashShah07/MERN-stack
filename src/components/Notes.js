import React from 'react'
import noteContext from '../context/notes/Notecontext';
import { useContext, useRef, useState } from "react";
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Notes(props) {

  const context = useContext(noteContext);
  let navigate = useNavigate();
    const { notes, getNote, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem("token")){
      getNote() ;
    }
    else{
        navigate("/login");
    }
  }, []);
  const ref = useRef(null) ;
  const refClose = useRef(null) ;

  const [note, setnote] = useState({id: "",etitle: "", edescription: "", etag: "defult"}) ;

  const updatenote = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id,  etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag}) ;
  
  }

  const handleClick = (e)=>{
    console.log("Updating note", note) ;
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click() ;
    props.showAlert("UPdated successfully", "success") ;
  }

  const onChangee = (e) =>{
    setnote({...note, [e.target.name]: e.target.value})
  }


  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button type="button" className="btn btn-primary d-none" data-toggle="modal" ref={ref} data-target="#exampleModal">
      </button>

      <div className="modal fade"  id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <div className="mb-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" name="etitle" minLength={5} required value={note.etitle} aria-describedby="emailHelp" onChange={onChangee}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="desc">Description</label>
                  <input
                    type="text" className="form-control" id="edescription" minLength={5} required value={note.edescription}name="edescription" onChange={onChangee}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="desc">Tag</label>
                  <input
                    type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChangee}
                  />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update note</button>
            </div>
          </div>
        </div>
      </div>

      
        <h1 style={{textAlignVertical: "center",textAlign: "center",}}><center>Your notes</center>  </h1>
      
        <div className="row my-3">
          {notes.length===0 && 'No notes to display'}
          {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updatenote} showAlert={props.showAlert} note={note} />;
          })}
        </div>
    </>
  )
}

export default Notes
