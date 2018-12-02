import {Component} from '@angular/core';
import {Entry} from './entry';
import {ElectronService} from 'ngx-electron';

declare var os: any;
declare var path: any;

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

  label: string;
  option: string;
  index: number;
  fileName: string;
  template: string;
  fileList = Array<string>();
  selected: string;

  fs: any;
  homeFolder: string;

  constructor(private electron: ElectronService) {
    this.fs = electron.remote.require('fs');
    this.homeFolder = os.homedir() + path.sep + 'dpb-templates' + path.sep;
  }

  newEntry() {
    const entry = new Entry();
    entry.label = this.label;
    entry.options = Array<string>();

    this.entries.push(entry);
    this.popCreation = false;
  }

  showCreation() {
    this.label = '';
    this.popCreation = true;
  }

  cancel() {
    this.popCreation = false;
  }

  showAddOption(index: number) {
    this.index = index;
    this.option = '';
    this.popAddOption = true;
  }

  cancelAddOption() {
    this.popAddOption = false;
  }

  newOption() {
    this.entries[this.index].options.push(this.option);
    this.popAddOption = false;
  }

  showSave() {
    this.fileName = '';
    this.popSave = true;
  }

  cancelSave() {
    this.popSave = false;
  }

  save() {
    const filePath = this.homeFolder + this.fileName;
    const data = JSON.stringify(this.entries);

    if (!this.fs.existsSync(this.homeFolder)) {
      this.fs.mkdirSync(this.homeFolder);
    }

    this.fs.writeFileSync(filePath, data);

    this.popSave = false;
  }

  showLoad() {
    if (!this.fs.existsSync(this.homeFolder)) {
      alert('There are no saved templates');
    } else {
      this.fileList = this.fs.readdirSync(this.homeFolder);
      if (this.fileList.length === 0) {
        alert('There are no saved templates');
      } else {
        this.popLoad = true;
      }
    }
  }

  cancelLoad() {
    this.popLoad = false;
  }

  load() {
    const filePath = this.homeFolder + this.selected;

    const data = this.fs.readFileSync(filePath);
    this.entries = JSON.parse(data);
    this.popLoad = false;
  }
}
