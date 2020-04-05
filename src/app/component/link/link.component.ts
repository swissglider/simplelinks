import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { EditComponent } from './modal/edit/edit.component';
import { Link } from 'src/app/model/links.model';
import { FirebaseService } from 'src/app/services/firebase.service/firebase.service';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: 'link.component.html',
  styleUrls: ['link.component.scss']
})
export class LinkComponent implements OnInit {

  links: Link[];
  folderLinks: {} = {};

  constructor(
    private firebaseService: FirebaseService,
    private popoverController: PopoverController,
    public authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.firebaseService.getLinks().subscribe(data => {
      this.links = data;
      this.splitIntoFolders();
    });
  }

  delete(link: Link) {
    this.firebaseService.deleteLink(link.id);
  }

  openLink(link: Link) {
    let target = ('target' in link) ? link.target : '_blank';
    window.open(link.link, target);
  }

  splitIntoFolders() {
    this.folderLinks = [];
    this.links.forEach(e => {
      let folderName = ('folder' in e) ? e.folder : 'default';
      if (!(folderName in this.folderLinks)) {
        this.folderLinks[folderName] = [];
      }
      this.folderLinks[folderName].push(e);
    })
  }

  async editPopover(link: Link) {
    const popover = await this.popoverController.create({
      component: EditComponent,
      translucent: true,
      componentProps: { link: link },
      cssClass: 'ion-pop'
    });
    return await popover.present();
  }

  add(){
    this.router.navigate(['add']);
  }

}
