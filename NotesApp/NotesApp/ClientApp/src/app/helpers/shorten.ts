import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  standalone: true,
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(val:string , length?: any):string {
    return (val.length>length)? val.slice(0, 15)+'...':val
  }
}
