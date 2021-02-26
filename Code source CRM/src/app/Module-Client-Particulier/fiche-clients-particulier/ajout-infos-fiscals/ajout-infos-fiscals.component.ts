import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiAgentService } from 'src/app/Services/api_agent/api-agent.service';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';

@Component({
  selector: 'app-ajout-infos-fiscals',
  templateUrl: './ajout-infos-fiscals.component.html',
  styleUrls: ['./ajout-infos-fiscals.component.css']
})
export class AjoutInfosFiscalsComponent implements OnInit {

  
  constructor(  public alert: POPUPServiceService, public dialog: MatDialog, private route: Router, public agentService: ApiAgentService) { }
  num_fisc
  ref
  avis
  intitule
  description
  
  
  ngOnInit(): void {
  
  }

    onRegister_Infos_Fiscal(){
      this.agentService.onRegister_Infos_fiscalles(this.num_fisc, this.ref, this.avis, this.intitule, this.description,localStorage.getItem('client_id')).then(async (res) => {
        let result = await res;
        console.log(result);
        this.dialog.closeAll()
        //this.onGet_Listes_Infos_Fisales()
      }, function (error) {
        error.message //=> String
        console.log(error)
      })
    
    }

}
