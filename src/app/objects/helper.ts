import {ElectronService} from 'ngx-electron';
import {Injectable} from '@angular/core';

declare var os: any;
declare var path: any;

@Injectable()
export class Helper {

  folder: string;
  fs: any;

  constructor(private electron: ElectronService) {
    this.fs = electron.remote.require('fs');
    this.folder = os.homedir() + path.sep + 'dpb-templates' + path.sep;
  }

  public existsSavedData(): boolean {
    let exists = this.fs.existsSync(this.folder);

    if (exists) {
      exists = this.fs.readdirSync(this.folder).length > 0;
    }

    return exists;
  }

  public fileList(): string[] {
    return this.fs.readdirSync(this.folder);
  }

  public load(fileName: string): string {

    const filePath = this.folder + fileName;

    return this.fs.readFileSync(filePath);
  }

  save(fileName: string, input): boolean {
    let success = true;
    const data = JSON.stringify(input);

    if (!this.fs.existsSync(this.folder)) {
      this.fs.mkdirSync(this.folder);
    }
    const filePath = this.folder + fileName;
    try {
      this.fs.writeFileSync(filePath, data);
    } catch (e) {
      success = false;
    }

    return success;
  }
}
