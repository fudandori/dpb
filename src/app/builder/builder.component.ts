import {Component} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {Entry} from '../objects/entry';
import {Helper} from '../objects/helper';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const A4_WIDTH = 210, A4_HEIGHT = 297;

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent {

  entries = Array<Entry>();
  title = '';
  popLoad: boolean;
  exporting = false;
  fileList = Array<string>();
  selected: string;
  selectedOptions: Array<string>;

  constructor(private electron: ElectronService, private helper: Helper) {
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

      this.selectedOptions = new Array<string>(this.entries.length);

      this.popLoad = false;
    } catch (e) {
      alert('Could not load. File corrupted');
    }
  }

  generatePDF() {

    const data = document.getElementById('output');
    data.style.width = '1080px';
    data.style.fontSize = '100%';


    html2canvas(data).then(canvas => {
      data.style.width = 'initial';
      data.style.fontSize = '2vw';

      const imgWidth = A4_WIDTH - 20;
      let imgHeight = canvas.height * imgWidth / canvas.width;

      imgHeight = imgHeight > A4_HEIGHT - 20 ? A4_HEIGHT - 20 : imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');

      const doc = new jsPDF();

      doc.addImage(contentDataURL, 'PNG', 10, 10, imgWidth, imgHeight);
      doc.save('a4.pdf');
    });
  }
}
