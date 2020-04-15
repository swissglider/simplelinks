import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { Link } from 'src/app/model/links.model';
import { FirebaseService } from 'src/app/services/firebase.service/firebase.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  link: Link
  folders: string[] = [];
  selectedFolder: string;

  constructor(
    private firebaseService: FirebaseService,
    public authService: AuthService,
    public router: Router,
    public alertController: AlertController,
    private cd: ChangeDetectorRef
  ) {
    this.link = { name: '', link: '', target: '_blank', owner: this.authService.userData.uid };
  }

  ngOnInit() {
    this.firebaseService.getLinks().subscribe(data => {
      this.folders = [];
      data.forEach(e => {
        this.folders.push(e.folder)
      })
      this.folders = [...new Set(this.folders)];
    });
  }

  create(link: Link) {
    this.firebaseService.createLink(link);
  }

  logForm() {
    this.create(this.link)
    this.link = { name: '', link: '', target: '_blank', owner: this.authService.userData.uid };
    this.router.navigate(['link']);
  }

  cancel() {
    this.router.navigate(['link']);
  }

  async folderChanged($ev) {
    if ($ev.detail.value === 'new') {
      const inputAlert = await this.alertController.create({
        header: 'Folder Name:',
        inputs: [{ type: 'text', placeholder: 'type in' }],
        buttons: [{
          text: 'Cancel',
          handler: data => {
            this.selectedFolder = null;
            this.cd.detectChanges();
          }
        }, {
          text: 'Ok',
          handler: data => {
            if (Object.keys(data).length != 0 && data[0] && data[0] != '' && !this.folders.includes(data[0])) {
              this.folders.push(data[0])
              this.selectedFolder = data[0];
              this.cd.detectChanges();
            } else if (Object.keys(data).length != 0 && data[0] && data[0] != '') {
              this.selectedFolder = data[0];
              this.cd.detectChanges();
            } else {
              this.selectedFolder = null;
              this.cd.detectChanges();
            }
          }
        }]
      });
      await inputAlert.present();
    }
  }

}
