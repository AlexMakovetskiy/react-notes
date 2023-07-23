import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import useAppDispatch from '../../hooks/useAppDiispatch';
import useAppSelector from '../../hooks/useAppSelector';

import { INote } from '../../types/CommonTypes';
import Header from '../../components/header/Header';
import { addNote, updateNote } from '../../redux/features/noteList/NoteListSlice';
import noteListSelector from '../../redux/features/noteList/NoteListSelector';
import { setTag } from '../../redux/features/tagList/TagListSlice';
import { getformattedDate, getUniqueHashtags } from '../../utils/NoteUtils';

import './CurrentNote.scss';

const { TextArea } = Input;

function CurrentNote() {
    const [noteState, setNoteState] = useState<INote>({
        noteId: uuidv4(),
        date: getformattedDate(),
        tagList: [],
        title: '',
        noteContent: '',
    });
    const params = useParams();
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const isAddedNote = useAppSelector(noteListSelector).find((note) => note.noteId === noteState.noteId || params.id);

    useEffect(() => {
        if(params.id) {
            const currentNote = isAddedNote;
            if(currentNote)
                setNoteState(currentNote);
        }
    },  [isAddedNote, params.id]);

    function saveNote() {
        const updatedNote = {
            noteId: noteState.noteId,
            date: noteState.date,
            tagList: getUniqueHashtags(noteState.noteContent),
            title: noteState.title.length ? noteState.title : 'Note',
            noteContent: noteState.noteContent,
        };
    
        setNoteState((prevState) => ({
            ...prevState,
            tagList: updatedNote.tagList,
        }));
    
        if (!isAddedNote) {
            dispatch(addNote(updatedNote));
        }
        dispatch(updateNote(updatedNote));
        dispatch(setTag([...updatedNote.tagList]));
    }
    
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNoteState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value, 
        }));
    };

    return (
        <div className="current-note-wrap small-container">
            <Header title="Note"/>
            <div className="editor-wrap">
                <Input 
                    placeholder="Title of your note"  
                    onChange={handleChange} 
                    name="title"
                    className="editor-wrap__title"
                    autoFocus
                    value={noteState.title}
                />
                <TextArea 
                    rows={30} 
                    placeholder="Start typing your note" 
                    onChange={handleChange} 
                    name="noteContent"
                    className="editor-wrap__edit-field" 
                    value={noteState.noteContent}
                />
                <div className="tags-wrap">
                    Tags: 
                    {
                        noteState.tagList.map((tagLine, index) => 
                            <span key={index} className="tags-wrap__subtitle">{tagLine}</span>,
                        )
                    }
                </div>
                <div className="control-panel">
                    <Button type="default" onClick={() => navigator(-1)} className="control-panel__action-back">Back</Button>
                    <Button type="primary" onClick={saveNote} className="control-panel__action-confirm">Save changes</Button>
                </div>
            </div>
        </div>
    );
}

export default CurrentNote;