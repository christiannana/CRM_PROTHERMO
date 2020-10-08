import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
