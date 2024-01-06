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
  public notes: Note[] = [];

  constructor(private readonly http: HttpClient, @Inject('BASE_URL') private readonly baseUrl: string, public dialog: MatDialog) {
    http.get<Reminder[]>(baseUrl + "reminder/get").subscribe(result => {
      this.reminders = result;
    }, error => console.error(error))

    http.get<Note[]>(baseUrl + "note/get").subscribe(result => {
      this.notes = result;
    }, error => console.error(error))
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddReminderModal, {
      data: {
        noteId: 0,
        dueDate: new Date().getDate().toString(),
        dueTime: new Date().getTime().toString(),
        notes: this.notes
      },
      disableClose: true, maxHeight: "100", maxWidth: "100"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  deleteReminder(id: number) {
    this.http.delete<boolean>(this.baseUrl + "reminder/Delete?id=" + id).subscribe(x => {
      location.reload();
    }, error => console.error(error))
  }

  getTime(dueDateTime: string) {
    let date = new Date(dueDateTime);
    return date.toLocaleDateString(navigator.language) + " " + date.toLocaleTimeString()
  }
}

export interface Reminder {
  id: number;
  noteId: string;
  note: Note
  dueDateTime: string;
}
