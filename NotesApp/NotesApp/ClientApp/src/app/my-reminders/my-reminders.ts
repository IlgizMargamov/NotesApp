import {Component, Inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {AddReminderModal} from "./add-reminder/add-reminder";
import {ClientHelper} from "../helpers/ClientHelper";
import {Reminder} from "./reminder";
import {Note} from "../my-notes/note";

@Component({
  selector: 'app-my-reminders',
  templateUrl: './my-reminders.html',
  styleUrls: ['./my-reminders.css']
})
export class MyRemindersComponent {
  public reminders: Reminder[] = []
  public notes: Note[] = [];

  constructor(private readonly http: HttpClient, @Inject('BASE_URL') private readonly baseUrl: string, public dialog: MatDialog) {
    ClientHelper.getReminders(http, baseUrl).subscribe(result => {
      this.reminders = result;
    }, error => console.error(error))

    ClientHelper.getNotes(http, baseUrl).subscribe(result => {
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
  }

  deleteReminder(id: number) {
    ClientHelper.deleteReminder(this.http, this.baseUrl, id).subscribe(x => {
      location.reload();
    }, error => console.error(error))
  }

  getTime(dueDateTime: string) {
    let date = new Date(dueDateTime);
    return date.toLocaleDateString(navigator.language) + " " + date.toLocaleTimeString()
  }
}

