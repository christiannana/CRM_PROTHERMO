import { EventEmitter, Injectable } from '@angular/core';
import { AngualertService, AlertOptions } from 'angualert';
import { NgxBootstrapDialogService } from 'ngx-bootstrap-dialog';

@Injectable({
  providedIn: 'root'
})
export class POPUPServiceService {

  constructor(private dialog: NgxBootstrapDialogService) { }

  onError(message) {
    
  }
 
  onInfo(titre, message){
    this.dialog.alert({
      title: titre,
      message: message,
      confirmButtonLabel:"Compris"
    });
  }

  onSucces(titre,message){
    this.dialog.confirm({
      title: titre,
      message: message,
    });
  }


  
 

}
