import {Component} from '@angular/core';
import {Tag} from "../../my-tags/my-tags";

/**
 * @title Menu with icons
 */
@Component({
  selector: 'menu-icons-example',
  templateUrl: 'menu.component.html',
})
export class MenuIconsExample {
  constructor() {

  }

  public tags: Tag[] = []
}
