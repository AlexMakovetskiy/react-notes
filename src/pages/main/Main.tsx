import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import useAppSelector from '../../hooks/useAppSelector';

import { INote } from '../../types/CommonTypes';
import Header from '../../components/header/Header';
import NoteCard from '../../components/noteCard/NoteCard';
import TagFilter from '../../components/tagFilter/TagFilter';
import noteListSelector from '../../redux/features/noteList/NoteListSelector';
import tagListSelector from '../../redux/features/tagList/TagListSelector';

import './Main.scss';

function Main() {
    const [tagFilterList, setTagFilterList] = useState<string[]>([]);
    const [filteredNotes, setFilteredNotes] = useState<INote[]>([]);
    const navigator = useNavigate();
    const noteList = useAppSelector(noteListSelector);
    const tagList = useAppSelector(tagListSelector);

    useEffect(() => {
        filterNotesByTag();
    }, [tagFilterList]);

    function setFilterTag(data: string) {
        const isContainTag = tagFilterList.find((tagFilter) => tagFilter === data);
        if(!isContainTag)
            setTagFilterList((prevState) => ([ ...prevState, data ]));
        else {
            const deletedDataFromTagList = tagFilterList.filter(tagFilter => tagFilter !== data);
            setTagFilterList(deletedDataFromTagList);
        }
        filterNotesByTag();
    }

    function filterNotesByTag() {
        const filteredNoteList: INote[] = noteList.filter((currentNote) => {
            const currentNoteTags: string[] = Array.from(currentNote.tagList);
            const isContainTag = tagFilterList.some((commonTag) => currentNoteTags.includes(commonTag));
            if(isContainTag)
                return currentNote;
        });
        setFilteredNotes(filteredNoteList);
    }

    return (
        <div className="main-page-wrap medium-container">
            <Header title="Notes"/>
            <hr />
            <main className="main-page-container">
                <div className="control-panel">
                    <div className="new-note-wrap">
                        <Button type="primary" onClick={() => navigator('/react-notes/editor')} className="new-note-wrap__note-action">Add new note</Button>
                    </div>
                    <div className="tag-list-wrap">
                        Tags: 
                        {
                            tagList.map((tagLine, index) => 
                                <TagFilter key={index} clickAction={() => setFilterTag(tagLine)} text={tagLine}/>,
                            )
                        }
                    </div>
                </div>
                <hr />
                <div className="note-list-wrapper">
                    {
                        filteredNotes && filteredNotes.length > 0 ?
                            filteredNotes.map((note) =>
                                <NoteCard key={note.noteId} content={note} />,
                            ) :
                            noteList.map((note) =>
                                <NoteCard key={note.noteId} content={note} />,
                            )
                    }
                </div>
            </main>
        </div>
    );
}

export default Main;
