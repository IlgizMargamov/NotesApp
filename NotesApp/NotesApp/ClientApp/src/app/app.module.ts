import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {HomeComponent} from './home/home.component';
import {MyNotesComponent} from "./my-notes/my-notes";
import {AddNoteModal} from "./my-notes/add-note/add-note";
import {MatDialogModule} from "@angular/material/dialog";
import {EditNoteModal} from "./my-notes/edit-note/edit-note";
import {ShortenPipe} from "./helpers/shorten";
import {MyRemindersComponent} from "./my-reminders/my-reminders";
import {MyTagsComponent} from "./my-tags/my-tags";
import {AddTagModal} from "./my-tags/add-tag/add-tag";
import {AddReminderModal} from "./my-reminders/add-reminder/add-reminder";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MenuIconsExample} from "./helpers/menuComponent/menu.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,

    MyNotesComponent,
    AddNoteModal,
    EditNoteModal,

    MyRemindersComponent,
    AddReminderModal,

    MyTagsComponent,
    AddTagModal,

    MenuIconsExample
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'my-notes', component: MyNotesComponent},
      {path: 'my-reminders', component: MyRemindersComponent},
      {path: 'my-tags', component: MyTagsComponent},
    ]),
    ShortenPipe,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
