export interface INote {
    noteId: string,
    title: string,
    noteContent: string,
    tagList: Set<string>,
    date: string,
}