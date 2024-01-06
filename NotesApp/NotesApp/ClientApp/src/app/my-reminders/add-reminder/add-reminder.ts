import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {HttpClient} from "@angular/common/http";
import {ClientHelper} from "../../helpers/ClientHelper";
import {Note} from "../../my-notes/note";

export interface AddReminderDialogData {
  noteId: number;
  dueDate: string
  dueTime: string;
  notes: Note[];
  noteHeader: string;
}

@Component({
  selector: 'add-reminder-modal',
  templateUrl: './add-reminder.html',
  styleUrls: ['./add-reminder.css']
})
export class AddReminderModal {
  constructor(private readonly http: HttpClient,
              @Inject('BASE_URL') private readonly baseUrl: string,
              public dialogRef: MatDialogRef<AddReminderModal>,
              @Inject(MAT_DIALOG_DATA) public data: AddReminderDialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    if (this.data.noteId == 0 || this.data.dueDate.length == 0 || this.data.dueTime.length == 0) {
      alert("Please enter date, time and pick note");
      return;
    }

    const date = new Date(this.data.dueDate + " " + this.data.dueTime)

    ClientHelper.createReminder(this.http, this.baseUrl, this.data, date).subscribe(x => {
      location.reload();
    }, error => console.error(error))
  }

  setNote(noteId: number, header: string) {
    this.data.noteId = noteId;
    this.data.noteHeader = header;
  }
}
