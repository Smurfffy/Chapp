import { Injectable, EventEmitter } from '@angular/core';
import { AuthProviders, AngularFire, FirebaseAuthState, AuthMethods } from 'angularfire2';
import { Observable } from "rxjs/Observable";
 
@Injectable()
export class AuthProvider {
  private authState: FirebaseAuthState;
  public onAuth: EventEmitter<FirebaseAuthState> = new EventEmitter();
   
  constructor(private af: AngularFire) {
    this.af.auth.subscribe((state: FirebaseAuthState) => {
      //console.log('Firebase auth state:', state);
      this.authState = state;
      this.onAuth.emit(state);
    });
  }
   
  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.af.auth.login(credentials, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((authData) => {
        console.log(authData);
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

registerUser(credentials: any) {
    return Observable.create(observer => {
      this.af.auth.createUser(credentials).then(authData => {
        //authData.auth.updateProfile({displayName: credentials.displayName, photoURL: credentials.photoUrl}); //set name and photo
        observer.next(authData);
      }).catch(error => {
        //console.log(error);
        observer.error(error);
      });
    });
  }
 
  logout() {
    this.af.auth.logout();
  }
 
  get currentUser():string{
    return this.authState?this.authState.auth.email:'';
  } 

}