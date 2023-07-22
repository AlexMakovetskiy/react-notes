import { INote } from './CommonTypes';

export interface IHeader {
    title: string,
}

export interface INoteCard {
    content: INote,
}

export interface ITagFilter {
    text: string,
    clickAction: () => void
}