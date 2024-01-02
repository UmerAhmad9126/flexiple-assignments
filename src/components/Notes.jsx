import React, { useState } from 'react'
import "../styles/Notes.css"

const Notes = () => {

    const [notesData, setNotesData] = useState([{
        id: 1, text: 'My Notes!', pinned: false
    }]);
    const [addNotes, setAddNotes] = useState("");
    const [hoveredNote, setHoveredNote] = useState(null);

    // Add Notes
    const handleAddNotes = () => {
        setNotesData((prevNotes) => [
            ...prevNotes,
            {
                id: prevNotes.length + 1,
                text: addNotes,
                pinned: false,
            },
        ]);
        setAddNotes("");
    };

    // Delete Notes
    const handleDeleteNotes = (id) => {
        setNotesData((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };

    // Edit Notes
    const handleEditNote = (id) => {
        const newText = prompt('Edit note:', notesData.find((note) => note.id === id).text);

        if (newText !== null) {
            setNotesData((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === id ? { ...note, text: newText } : note
                )
            );
        }
    };

    // Pin Notes 
    const handlePinNote = (id) => {
        setNotesData((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, pinned: !note.pinned } : note
            )
        );
    };



    return (
        <div className='notes-container'>
            {/* Add Note */}
            <div className="add-note">
                <input
                    type="text"
                    value={addNotes}
                    onChange={(e) => setAddNotes(e.target.value)}
                    placeholder="New Note..."
                />
                <button onClick={handleAddNotes}>+</button>
            </div>

            {/*Map Notes Data */}
            <div className='notes-data'>
                {
                    notesData && notesData.map((note) => {
                        return <div
                            key={note.id}
                            className='note-data'
                            onMouseEnter={() => setHoveredNote(note.id)}
                            onMouseLeave={() => setHoveredNote(null)}
                        >
                            <p>{note.text}</p>

                            {hoveredNote === note.id && (
                                <div>
                                    <button onClick={() => handleDeleteNotes(note.id)}>X</button>
                                    <button onClick={() => handleEditNote(note.id)}>EDIT</button>
                                    <button onClick={() => handlePinNote(note.id)}>PIN</button>
                                </div>
                            )}
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Notes