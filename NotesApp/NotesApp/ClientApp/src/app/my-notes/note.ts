import {Tag} from "../my-tags/tag";

export interface Note {
  id: number;
  date: string;
  header: string;
  description: string;
  tags: Tag[]
}
