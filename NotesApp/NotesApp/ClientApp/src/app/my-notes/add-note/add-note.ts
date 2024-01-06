import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {HttpClient} from "@angular/common/http";

export interface DialogData {
  header: string;
  description: string;
}

@Component({
  selector: 'add-note-modal',
  templateUrl: './add-note.html',
  styleUrls: ['./add-note.css']
})
export class AddNoteModal {
  constructor(private readonly http: HttpClient,
              @Inject('BASE_URL') private readonly baseUrl: string,
              public dialogRef: MatDialogRef<AddNoteModal>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    if (this.data.header.length == 0 || this.data.description.length == 0) {
      alert("Please enter header and description");
      return;
    }

    this.http.post<boolean>(this.baseUrl + "note/Post", {
      Header: this.data.header,
      Description: this.data.description
    }).subscribe(x => {
      location.reload();
    }, error => console.error(error))
  }
}
