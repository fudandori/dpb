import {Component} from '@angular/core';
import {Entry} from '../objects/entry';
import {Helper} from '../objects/helper';


@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent {

  entries = Array<Entry>();

  popCreation = false;
  popAddOption = false;
  popSave = false;
  popLoad = false;
  popEdit = false;
  popRemove = false;

  editIndex: number;
  removeIndex: number;
  removeLabel: string;

  label = '';
  option = '';
  editLabel = '';
  position: number;
  fileName: string;
  fileList = Array<string>();
  selected: string;

  constructor(private helper: Helper) {
  }


  newEntry(close: boolean) {
    const entry = new Entry();
    entry.label = this.label;
    entry.options = Array<string>();

    this.entries.push(entry);
    this.label = '';
    this.popCreation = !close;
  }

  showCreation() {
    this.label = '';
    this.popCreation = true;
  }

  cancel() {
    this.label = '';
    this.popCreation = false;
  }

  showAddOption(index: number) {
    this.position = index;
    this.option = '';
    this.popAddOption = true;
  }

  cancelAddOption() {
    this.popAddOption = false;
    this.option = '';
  }

  newOption(close: boolean) {
    this.entries[this.position].options.push(this.option);
    this.option = '';
    this.popAddOption = !close;
  }

  showSave() {
    this.fileName = '';
    this.popSave = true;
  }

  cancelSave() {
    this.popSave = false;
    this.fileName = '';
  }

  save() {
    const saved = this.helper.save(this.fileName, this.entries);
    const message = saved ? 'Template saved' : 'Could not save the template';

    this.popSave = false;
    this.fileName = '';
    alert(message);
  }

  showLoad() {
    if (this.helper.existsSavedData()) {
      this.fileList = this.helper.fileList();
      this.popLoad = true;
    } else {
      alert('There are no saved templates');
    }
  }

  cancelLoad() {
    this.popLoad = false;
  }

  load() {
    const data = this.helper.load(this.selected);

    try {
      this.entries = JSON.parse(data);
      this.popLoad = false;
    } catch (e) {
      alert('Could not load. File corrupted');
    }
  }

  edit(index: number) {
    this.editLabel = this.entries[index].label;
    this.editIndex = index;
    this.popEdit = true;
  }

  cancelEdit() {
    this.popEdit = false;
  }

  confirmEdit() {
    this.entries[this.editIndex].label = this.editLabel;
    this.popEdit = false;
  }

  showRemove(index: number) {
    this.removeLabel = this.entries[index].label;
    this.removeIndex = index;
    this.popRemove = true;
  }

  cancelRemove() {
    this.popRemove = false;
  }

  remove() {
    this.entries[this.removeIndex].options = [];
    this.popRemove = false;
  }
}
