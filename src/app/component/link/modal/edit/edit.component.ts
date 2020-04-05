import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Link } from 'src/app/model/links.model';
import { FirebaseService } from 'src/app/services/firebase.service/firebase.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  @Input() link: Link;
  private id: string

  constructor(
    private firebaseService: FirebaseService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.id = this.link.id;
  }

  async myDismiss() {
    await this.popoverController.dismiss('');
  }



  update() {
    this.link.id = this.id;
    this.firebaseService.updateLink(this.link, this.id);
    this.myDismiss();
  }

}
