import {Note} from "../my-notes/note";

export interface Reminder {
  id: number;
  noteId: string;
  note: Note
  dueDateTime: string;
}
