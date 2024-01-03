import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {HttpClient} from "@angular/common/http";

export interface DialogData {
  header: string;
  description: string;
  id: number;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './edit-note.html',
})
export class EditNoteModal {
  private readonly httpClient: HttpClient;
  private readonly baseUrl: string;
  constructor(http: HttpClient,@Inject('BASE_URL') baseUrl: string,
    public dialogRef: MatDialogRef<EditNoteModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.baseUrl = baseUrl;
    this.httpClient = http;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEditClick():void{
    if (this.data.header.length==0 || this.data.description.length==0){
      alert("Please enter header and description");
      return;
    }
    this.httpClient.patch<boolean>(this.baseUrl+"note/Edit", {
      id: this.data.id,
      header: this.data.header,
      description: this.data.description
    }).subscribe(x=>{
      location.reload();
    }, error => console.error(error))
  }
}

