import React from "react";
import { useState } from "react";
import NoteContext from "./Notecontext";

const NoteState= (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = [];

        const[notes, setNotes] = useState(notesInitial) ;

  // Get all Note
  const getNote= async ()=>{
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', 
         headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json() ; 
    console.log(json);
    setNotes(json) ;


}


        // Add a note
        const addNote= async (title, description, tag)=>{
            // API call
            const response = await fetch(`${host}/api/notes/addnote`, {
              method: 'POST', 
                 headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem("token")
              }, 
              body: JSON.stringify({title, description, tag}) 
            });

            try {
              const note = await  response.json(); 
            setNotes(notes.concat(note))
            console.log("NEw note added");
            console.log(note);
              
            } catch (error) {
              console.log("Error is ",error) ;
              
            }

            
        }

        // Delete a note
        const deleteNote= async(id)=>{
          // API call
          
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', 
               headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token")
            }, 
          });
          const json =  response.json();
                console.log(json);
               const  newNotes = notes.filter((note)=>{return note._id!==id}) ;
               setNotes(newNotes) ;
        }



        // Edit a note
        const editNote= async(id,title, description, tag)=>{
          // API call
          
          const response = await fetch(`${host}/api/notes/update/${id}`, {
            method: 'PUT', 
               headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token")
            }, 
            body: JSON.stringify({title, description, tag}) 
          });
          //const json =  response.json(); 
        
          let newNotes = JSON.parse(JSON.stringify(notes)) ;
          // Logic to edit in client 
            for (let index = 0; index < newNotes.length; index++) {
              const element = newNotes[index];
              if(element._id=== id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break ;
              }
              
            }
            setNotes(newNotes) ;
        }

        return(
            // Iske andar jo bhi wrap hoga uska childern ane aap aa jayega
            <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
               { props.children}
            </NoteContext.Provider>
        )
}

export default NoteState ;
