import {Component, Inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DialogPosition, MatDialog} from "@angular/material/dialog";
import {AddReminderModal} from "./add-reminder/add-reminder";
import {Note} from "../my-notes/my-notes";

@Component({
  selector: 'app-my-reminders',
  templateUrl: './my-reminders.html',
  styleUrls: ['./my-reminders.css']
})
export class MyRemindersComponent {
  public reminders: Reminder[] = []

  constructor(private readonly http: HttpClient, @Inject('BASE_URL') private readonly baseUrl: string, public dialog: MatDialog) {
    http.get<Reminder[]>(baseUrl+"reminder/get").subscribe(result => {
      this.reminders = result;
    }, error => console.error(error))
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddReminderModal, {
      data: {
        noteId: 0,
        dueDateTime: ""
      },
      disableClose: true, maxHeight: "100", maxWidth:"100"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  deleteReminder(id: number){
    this.http.delete<boolean>(this.baseUrl+"reminder/Delete?id="+id).subscribe(x=>{
      location.reload();
    }, error => console.error(error))
  }
}

interface Reminder {
  id: number;
  noteId: string;
  note: Note
  dueDateTime: string;
}
