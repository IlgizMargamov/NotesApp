import {Component, Inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {AddTagModal} from "./add-tag/add-tag";
import {ClientHelper} from "../helpers/ClientHelper";
import {Tag} from "./tag";

@Component({
  selector: 'app-my-tags',
  templateUrl: './my-tags.html',
  styleUrls: ['./my-tags.css']
})
export class MyTagsComponent {
  public tags: Tag[] = []

  constructor(private readonly http: HttpClient, @Inject('BASE_URL') private readonly baseUrl: string, public dialog: MatDialog) {
    ClientHelper.getTags(this.http, this.baseUrl).subscribe(result => {
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
  }

  deleteTag(id: number) {
    ClientHelper.deleteTag(this.http, this.baseUrl, id).subscribe(x => {
      location.reload();
    }, error => console.error(error))
  }
}

