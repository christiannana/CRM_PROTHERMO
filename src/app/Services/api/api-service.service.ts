
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { TokenStorageService } from '../service/token-storage.service';


@Injectable({
  providedIn: 'root'
}) 
export class APIServiceService {

  configUrl = 'https://jsonplaceholder.typicode.com/todos/';

  constructor(private http: HttpClient) { }

  onJSONplaceHolder() {
    return this.http.get(this.configUrl);
  }

}



const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        const token = localStorage.getItem('token');
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        }
        return next.handle(authReq);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
