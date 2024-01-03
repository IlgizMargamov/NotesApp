import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {HttpClient} from "@angular/common/http";

export interface DialogData {
  header: string;
}

@Component({
  selector: 'add-tag-modal',
  templateUrl: './add-tag.html',
})
export class AddTagModal {
  constructor(private readonly http: HttpClient,
    @Inject('BASE_URL') private readonly baseUrl: string,
    public dialogRef: MatDialogRef<AddTagModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.baseUrl = baseUrl;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick():void{
    if (this.data.header.length==0){
      alert("Please enter header");
      return;
    }

    this.http.post<boolean>(this.baseUrl+"tag/Post", {
      Header: this.data.header,
    }).subscribe(x=>{
      location.reload();
    }, error => console.error(error))
  }
}
