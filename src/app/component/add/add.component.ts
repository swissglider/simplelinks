import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { Link } from 'src/app/model/links.model';
import { FirebaseService } from 'src/app/services/firebase.service/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  link:Link = {name:'', link:'', target:'_blank'};

  constructor(
    private firebaseService: FirebaseService,
    public authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit() { }

  create(link: Link) {
    this.firebaseService.createLink(link);
  }

  logForm() {
    this.create(this.link)
    this.link = {name:'', link:'', target:'_blank'};
    this.router.navigate(['link']);
  }

  cancel() {
    this.router.navigate(['link']);
  }

}
