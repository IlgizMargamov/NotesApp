import {AddNoteDialogData} from "../my-notes/add-note/add-note";
import {HttpClient} from "@angular/common/http";
import {EditNoteDialogData} from "../my-notes/edit-note/edit-note";
import {AddReminderDialogData} from "../my-reminders/add-reminder/add-reminder";
import {CreateTagDialogData} from "../my-tags/add-tag/add-tag";
import {Reminder} from "../my-reminders/reminder";
import {Note} from "../my-notes/note";
import {Tag} from "../my-tags/tag";

export class ClientHelper{
  static getTags(http: HttpClient, baseUrl: string){
    return http.get<Tag[]>(baseUrl + "tag/get")
  }
  static createTag(http: HttpClient, baseUrl: string, data: CreateTagDialogData){
    return http.post<boolean>(baseUrl + "tag/Post", {
      Header: data.header,
    })
  }
  static deleteTag(http: HttpClient, baseUrl: string, tagId: number){
    return http.delete<boolean>(baseUrl + "tag/Delete?id=" + tagId);
  }
  static getNotes(http: HttpClient, baseUrl: string){
    return http.get<Note[]>(baseUrl + "note/get")
  }
  static patchNote(http: HttpClient, baseUrl: string, data: EditNoteDialogData){
    return http.patch<boolean>(baseUrl + "note/Edit", {
      id: data.id,
      header: data.header,
      description: data.description
    })
  }
  static createNote(http: HttpClient, baseUrl: string, data: AddNoteDialogData){
    return  http.post<boolean>(baseUrl + "note/Post", {
      Header: data.header,
      Description: data.description
    })
  }
  static deleteNote(http: HttpClient, baseUrl: string, noteId: number){
    return  http.delete<boolean>(baseUrl + "note/Delete?id=" + noteId)
  }
  static getReminders(http: HttpClient, baseUrl: string){
    return http.get<Reminder[]>(baseUrl + "reminder/get");
  }
  static deleteReminder(http: HttpClient, baseUrl: string, reminderId: number){
    return http.delete<boolean>(baseUrl + "reminder/Delete?id=" + reminderId)
  }

  static setTagToNote(http: HttpClient, baseUrl: string, noteId: number, tagId: number) {
    return http.patch<boolean>(baseUrl + `note/SetTag?noteId=${noteId}&tagId=${tagId}`, null)
  }

  static removeTagFromNote(http: HttpClient, baseUrl: string, noteId: number, tagId: number) {
    return http.patch<boolean>(baseUrl + `note/RemoveTag?noteId=${noteId}&tagId=${tagId}`, null)
  }

  static createReminder(http: HttpClient, baseUrl: string, data: AddReminderDialogData, date: Date) {
    return http.post<boolean>(baseUrl + "reminder/Create", {
      noteId: data.noteId,
      dueDateTime: date,
      timeZoneOffset: date.getTimezoneOffset()
    })
  }

  static checkReminders(http: HttpClient, baseUrl: string) {
    return http.get<Reminder[]>(baseUrl + "reminder/CheckDates")
  }
}
