import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {HttpClient} from "@angular/common/http";
import {ClientHelper} from "../../helpers/ClientHelper";

export interface CreateTagDialogData {
  header: string;
}

@Component({
  selector: 'add-tag-modal',
  templateUrl: './add-tag.html',
  styleUrls: ['./add-tag.css']
})
export class AddTagModal {
  constructor(private readonly http: HttpClient,
              @Inject('BASE_URL') private readonly baseUrl: string,
              public dialogRef: MatDialogRef<AddTagModal>,
              @Inject(MAT_DIALOG_DATA) public data: CreateTagDialogData,
  ) {
    this.baseUrl = baseUrl;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    if (this.data.header.length == 0) {
      alert("Please enter header");
      return;
    }

    ClientHelper.createTag(this.http, this.baseUrl, this.data).subscribe(x => {
      location.reload();
    }, error => console.error(error))
  }
}
