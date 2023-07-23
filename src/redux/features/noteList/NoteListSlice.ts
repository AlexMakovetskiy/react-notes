import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { INoteListState } from '../../types/storeTypes';
import { INote } from '../../../types/CommonTypes';

const noteListInitialstate: INoteListState = {
    noteList: [],
};

const NoteListSlice = createSlice({
    name: 'notes',
    initialState: noteListInitialstate,
    reducers: {
        addNote (state: INoteListState, action: PayloadAction<INote>) {
            state.noteList = [action.payload, ...state.noteList];
        },
        updateNote (state: INoteListState, action: PayloadAction<INote>) {
            state.noteList = state.noteList.map((note) => {
                if(note.noteId === action.payload.noteId) {
                    note = ({
                        ...action.payload,
                        title: action.payload.title,
                        noteContent: action.payload.noteContent,
                        tagList: action.payload.tagList,
                    });
                }
                return note;
            });
        },
        removeNote (state: INoteListState, action: PayloadAction<string>) {
            state.noteList = state.noteList.filter(currentNote => currentNote.noteId !== action.payload);
        },
    },
});

export const { addNote, removeNote, updateNote } = NoteListSlice.actions;
export default NoteListSlice.reducer;