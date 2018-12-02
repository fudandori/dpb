import {Component, OnInit} from '@angular/core';
import {Entry} from './entry';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent {

  entries = Array<Entry>();

  popCreation = false;
  popAddOption = false;

  label: string;
  option: string;
  index: number;

  newEntry() {
    const entry = new Entry();
    entry.label = this.label;
    entry.options = Array<string>();

    this.entries.push(entry);
    this.popCreation = false;
  }

  showCreation() {
    this.popCreation = true;
  }

  cancel() {
    this.popCreation = false;
  }

  showAddOption(index: number) {
    this.index = index;
    this.popAddOption = true;
  }

  cancelAddOption() {
    this.popAddOption = false;
  }

  newOption() {
    this.entries[this.index].options.push(this.option);
    this.popAddOption = false;
  }
}
