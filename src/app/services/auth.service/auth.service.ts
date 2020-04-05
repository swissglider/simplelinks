import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User, auth as auth1 } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData: User;

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
  ) {
    this.userData = null;
    if(JSON.parse(localStorage.getItem('credential'))){
      const credential = auth1.AuthCredential.fromJSON(JSON.parse(localStorage.getItem('credential')));
      this.afAuth.signInWithCredential(credential).then(e => {
        this.userData = e.user;
        this.ngZone.run(() => {
          this.router.navigate(['link']);
        })
      }).catch(function (error) {
        this.userData = null;
        this.afAuth.authState.subscribe(user => {
          if (user) {
            this.userData = user;
          }
        });
      }.bind(this));
    } else {
      this.userData = null;
        this.afAuth.authState.subscribe(user => {
          if (user) {
            this.userData = user;
          }
        });
    }
    
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        localStorage.setItem('credential', JSON.stringify(result.credential.toJSON()));
        this.userData = result.user;
        this.ngZone.run(() => {
          this.router.navigate(['link']);
        })
      }).catch((error) => {
        this.userData = null;
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    return (this.userData) ? true : false;
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      // logout...
      this.userData = null;
      localStorage.removeItem('credential')
      this.router.navigate(['sign-in']);
    })
  }

}