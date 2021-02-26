import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AUTHServiceService {

//   constructor() { }
// }


@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate { 
  constructor() {}; 

  canActivate() {
    console.log("OnlyLoggedInUsers");
    if (localStorage.getItem('token') != null) { 
      return true;
    } else {
      window.alert("Désolé vous devez etre connecté pour acceder à cette page.")
      return false;
    }
  }
}