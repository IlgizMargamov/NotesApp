﻿import {Component, Inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AddNoteModal} from "./add-note/add-note";
import {MatDialog} from "@angular/material/dialog";
import {EditNoteModal} from "./edit-note/edit-note";

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.html'
})
export class MyNotesComponent {
  public notes: Note[] = []

  constructor(private readonly http: HttpClient, @Inject('BASE_URL') private readonly baseUrl: string, public dialog: MatDialog) {
    http.get<Note[]>(baseUrl+"note").subscribe(result => {
      this.notes = result;
    }, error => console.error(error))
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddNoteModal, {
      data: {
        header: "",
        description: ""
      },
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
    this.http.delete<boolean>(this.baseUrl+"note?id="+id).subscribe(x=>{
      location.reload();
    }, error => console.error(error))
  }
}

interface Note {
  id: number;
  date: string;
  header: string;
  description: string;
}