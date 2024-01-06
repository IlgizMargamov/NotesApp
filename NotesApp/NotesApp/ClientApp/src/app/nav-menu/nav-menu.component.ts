import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Reminder} from "../my-reminders/my-reminders";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private readonly http: HttpClient, @Inject('BASE_URL') private readonly baseUrl: string) {
    this.checkReminders(http, baseUrl);

    let fiveMinutes = 1000 * 60 * 5;
    setInterval(() => {
      this.checkReminders(http, baseUrl);
    }, fiveMinutes)
    let i = 0;
    setInterval(() => {
      console.log(`${i++} seconds passed`)
    }, 1000)

  }

  private checkReminders(http: HttpClient, baseUrl: string) {
    http.get<Reminder[]>(baseUrl + "reminder/CheckDates").subscribe(result => {
      for (const reminder of result) {
        const note = reminder.note;
        alert(`A note: ${note.header} with description: ${note.description} has been reminded`);
        location.reload();
      }
    }, error => console.error(error))
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
