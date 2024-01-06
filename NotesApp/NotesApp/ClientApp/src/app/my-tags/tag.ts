import {Note} from "../my-notes/note";

export interface Tag {
  id: number;
  header: string;
  noteId: number;
  note: Note;
}
