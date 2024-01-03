import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {HttpClient} from "@angular/common/http";

export interface DialogData {
  noteId: number;
  dueDateTime: string;
}

@Component({
  selector: 'add-reminder-modal',
  templateUrl: './add-reminder.html',
})
export class AddReminderModal {
  constructor(private readonly http: HttpClient,
    @Inject('BASE_URL') private readonly baseUrl: string,
    public dialogRef: MatDialogRef<AddReminderModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.baseUrl = baseUrl;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick():void{
    if (this.data.noteId==0 || this.data.dueDateTime.length==0){
      alert("Please enter header and description");
      return;
    }

    this.http.post<boolean>(this.baseUrl+"reminder/Create", {
      noteId: this.data.noteId,
      dueDateTime: this.data.dueDateTime
    }).subscribe(x=>{
      location.reload();
    }, error => console.error(error))
  }
}
