﻿import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {HttpClient} from "@angular/common/http";
import {ClientHelper} from "../../helpers/ClientHelper";

export interface EditNoteDialogData {
  header: string;
  description: string;
  id: number;
}

@Component({
  selector: 'edit-note-modal',
  templateUrl: './edit-note.html',
})
export class EditNoteModal {
  constructor(private readonly httpClient: HttpClient,
              @Inject('BASE_URL') private readonly baseUrl: string,
              public dialogRef: MatDialogRef<EditNoteModal>,
              @Inject(MAT_DIALOG_DATA) public data: EditNoteDialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEditClick(): void {
    if (this.data.header.length == 0 || this.data.description.length == 0) {
      alert("Please enter header and description");
      return;
    }

    ClientHelper.patchNote(this.httpClient, this.baseUrl, this.data).subscribe(x => {
      location.reload();
    }, error => console.error(error))
  }
}

