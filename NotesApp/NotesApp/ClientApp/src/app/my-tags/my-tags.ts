import {Component, Inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DialogPosition, MatDialog} from "@angular/material/dialog";
import {Note} from "../my-notes/my-notes";
import {AddTagModal} from "./add-tag/add-tag";

@Component({
  selector: 'app-my-tags',
  templateUrl: './my-tags.html',
  styleUrls: ['./my-tags.css']
})
export class MyTagsComponent {
  public tags: Tag[] = []

  constructor(private readonly http: HttpClient, @Inject('BASE_URL') private readonly baseUrl: string, public dialog: MatDialog) {
    http.get<Tag[]>(baseUrl + "tag/get").subscribe(result => {
      this.tags = result;
    }, error => console.error(error))
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddTagModal, {
      data: {
        header: "",
      },
      disableClose: true, maxHeight: "100", maxWidth: "100"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  deleteNote(id: number) {
    this.http.delete<boolean>(this.baseUrl + "tag/Delete?id=" + id).subscribe(x => {
      location.reload();
    }, error => console.error(error))
  }
}

export interface Tag {
  id: number;
  header: string;
  noteId: number;
  note: Note;
}
