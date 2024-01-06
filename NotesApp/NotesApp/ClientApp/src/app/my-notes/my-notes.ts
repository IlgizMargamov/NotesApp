import {Component, Inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AddNoteModal} from "./add-note/add-note";
import {MatDialog} from "@angular/material/dialog";
import {EditNoteModal} from "./edit-note/edit-note";
import {ClientHelper} from "../helpers/ClientHelper";
import {Note} from "./note";
import {Tag} from "../my-tags/tag";

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
    ClientHelper.getNotes(http, baseUrl).subscribe(result => {
      this.notes = result;
    }, error => console.error(error))
    ClientHelper.getTags(http, baseUrl).subscribe(result => {
      this.tags = result;
    }, error => console.error(error))
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddNoteModal, {
      data: {
        header: "",
        description: ""
      },
      disableClose: true, maxHeight: "100", maxWidth: "100"
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
  }

  deleteNote(id: number) {
    ClientHelper.deleteNote(this.http, this.baseUrl, id).subscribe(x => {
      location.reload();
    }, error => console.error(error))
  }

  setTagToNote(noteId: number, tagId: number) {
    ClientHelper.setTagToNote(this.http, this.baseUrl, noteId, tagId).subscribe(x => {
      location.reload();
    }, error => console.error(error))
  }

  removeTag(noteId: number, tagId: number) {
    ClientHelper.removeTagFromNote(this.http, this.baseUrl, noteId, tagId).subscribe(x => {
      location.reload();
    }, error => console.error(error))
  }
}

