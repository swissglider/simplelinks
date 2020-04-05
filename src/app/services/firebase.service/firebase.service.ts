import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Link } from '../../model/links.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) { }

  getLinks() {
    return this.firestore.collection('links').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Link;
        data.id = a.payload.doc.id;
        // const id = a.payload.doc.id;
      return data;
        // return { id, ...data };
      }))
    );
  }

  createLink(link: Link) {
    return this.firestore.collection('links').add(link);
  }

  updateLink(link: Link, id: string) {
    delete link.id;
    this.firestore.doc('links/' + id).update(link);
  }
  deleteLink(linkId: string) {
    this.firestore.collection('links').doc(linkId).delete();
  }
}
