import { FC } from 'react';
import { Link } from 'react-router-dom';

import useAppDispatch from '../../hooks/useAppDiispatch';

import { INoteCard } from '../../types/ComponentProps';
import { removeNote } from '../../redux/features/noteList/NoteListSlice';

import crossLogo from '../../assets/components/noteCard/crossNote.svg';

import './NoteCard.scss';

const NoteCard: FC<INoteCard> = ({content}) => {
    const dispatch = useAppDispatch();

    function handleClick () {
        dispatch(removeNote(content.noteId));
    }

    return (
        <div className="note-card-wrapper">
            <header className="header-card-wrap">
                <span className="header-card-wrap__date-line">{content.date}</span>
                <button className="header-card-wrap__remove-action" onClick={handleClick}>
                    <img src={crossLogo} alt="remove note"/>
                </button>
            </header>
            <Link to={`/editor/${content.noteId}`}>
                <h3 className="note-card-wrapper__title">{content.title}</h3>
            </Link>
            <div className="tag-list-wrap">
                {
                    content.tagList.map((tagLine, index) => 
                        <span key={index} className="tag-list-wrap__tag">{tagLine}</span>,
                    )
                }
            </div>
        </div>
    );
};

export default NoteCard;