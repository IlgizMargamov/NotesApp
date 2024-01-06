import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Reminder} from "../my-reminders/reminder";
import {Tag} from "../my-tags/tag";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {}
