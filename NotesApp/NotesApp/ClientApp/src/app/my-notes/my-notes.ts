import {Component, Inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AddNoteModal} from "./add-note/add-note";
import {MatDialog} from "@angular/material/dialog";
import {EditNoteModal} from "./edit-note/edit-note";
import {Tag} from "../my-tags/my-tags";

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.html',
  styleUrls: ['./my-notes.css']
})
export class MyNotesComponent {
  public notes: Note[] = []
  public tags: Tag[] = []
  constructor(private readonly http: HttpClient, @Inject('BASE_URL') private readonly baseUrl: string, public dialog: MatDialog,
  ) {
    http.get<Note[]>(baseUrl+"note/get").subscribe(result => {
      this.notes = result;
    }, error => console.error(error))
    http.get<Tag[]>(baseUrl + "tag/get").subscribe(result => {
      this.tags = result;
    }, error => console.error(error))
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddNoteModal, {
      data: {
        header: "",
        description: ""
      },
      disableClose: true, maxHeight: "100", maxWidth:"100"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  openEditModal(id: number, header: string, description: string): void {
    const dialogRef = this.dialog.open(EditNoteModal, {
      data: {
        id: id,
        header: header,
        description: description
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteNote(id: number){
    this.http.delete<boolean>(this.baseUrl+"note/Delete?id="+id).subscribe(x=>{
      location.reload();
    }, error => console.error(error))
  }

  setTagToNote(noteId: number, tagId: number) {
    this.http.patch<boolean>(this.baseUrl+`note/SetTag?noteId=${noteId}&tagId=${tagId}`, null).subscribe(x=>{
      location.reload();
    }, error => console.error(error))
  }

  removeTag(noteId: number, tagId: number) {
    this.http.patch<boolean>(this.baseUrl+`note/RemoveTag?noteId=${noteId}&tagId=${tagId}`, null).subscribe(x=>{
      location.reload();
    }, error => console.error(error))
  }
}

export interface Note {
  id: number;
  date: string;
  header: string;
  description: string;
  tags: Tag[]
}
