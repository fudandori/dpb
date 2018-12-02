import {Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import SaveDialogOptions = Electron.SaveDialogOptions;

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  constructor(private electron: ElectronService) {
  }

  ngOnInit() {
    const fs = this.electron.remote.require('fs');
    const dialog = this.electron.remote.dialog;

    const options: SaveDialogOptions = {
        buttonLabel: 'Test Me',
        title: 'Hello World.txt',
        filters: [
          {name: 'Text Files', extensions: ['txt', 'doc', 'docx', 'odt', 'pdf', 'rtf', 'tex']},
          {name: 'Images', extensions: ['jpg', 'png', 'gif']},
          {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
          {name: 'All Files', extensions: ['*']}
        ]
      }
    ;
    dialog.showSaveDialog(options, (fileName) => {
      if (fileName === undefined) {
        console.log('You didn\'t save the file');
        return;
      }

      // fileName is a string that contains the path and filename created in the save file dialog.
      fs.open(fileName, 'wx', (err, fd) => {
        if (err) {
          if (err.code === 'EEXIST') {
            console.error('myfile already exists');
            return;
          }

          throw err;
        }

        fs.writeFile(fd, 'Hellow World', (err2) => {
          if (err2) {
            alert('An error ocurred creating the file ' + err.message);
          }

          alert('The file has been succesfully saved');
        });
      });

    });
  }

}
