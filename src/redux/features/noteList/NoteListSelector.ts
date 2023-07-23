import { RootState } from '../..';

const noteListSelector = (state: RootState) => {
    return state.NoteListSlice.noteList;
};

export default noteListSelector;