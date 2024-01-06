import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tag} from "../my-tags/my-tags";
import {Reminder} from "../my-reminders/my-reminders";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {}
