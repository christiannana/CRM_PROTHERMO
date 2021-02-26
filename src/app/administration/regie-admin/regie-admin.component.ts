import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAdministrationService } from 'src/app/Services/api_administration/api-administration.service';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';
import { RegieServiceService } from 'src/app/Services/Regie_service/regie-service.service';

@Component({
  selector: 'app-regie-admin',
  templateUrl: './regie-admin.component.html',
  styleUrls: ['./regie-admin.component.css']
})
export class RegieAdminComponent implements OnInit {

  
  clientDatas: any[];
  _opened: boolean = false;
  progresse = false
  datas_agent: any[] = [{},{},{}]



  constructor(public route: Router,
    public serviceAdmin: ApiAdministrationService,
    public alert: POPUPServiceService, 
     public regieService: RegieServiceService,) { }

  ngOnInit(): void {
    this.onGetClients()
  }

  onEditFiche(data) {
    localStorage.setItem('fiche', 'regie');
    setTimeout(() => {
      this.route.navigate(['modifier_fiche_client',data])
    }, 500)
  }


  onAjoutClient_Regie() {
    this.route.navigate(['/ajout_client_regie'])
  }
  
  onGetClients() {
    this.progresse = true;
    this.regieService.onGet_liste_des_ClientsRegie(localStorage.getItem('user_id')).then(async (res) => {    
      let result = await res.json();
      this.clientDatas = result;

      for(var i = 0; i < this.clientDatas.length; i++ ){
        if(this.clientDatas[i].etat_Lead == 'Nouveau'){
          let color = 'blue'
          this.clientDatas[i].color = color
        }    
        if(this.clientDatas[i].etat_Lead == 'NRP'){
          let color = 'blue'
          this.clientDatas[i].color = color
        }       
        if(this.clientDatas[i].etat_Lead == 'Annulé pas intéressé'){
          let color = 'red'
          this.clientDatas[i].color = color
        }
        if(this.clientDatas[i].etat_Lead == 'Devis signé/ A installer'){
          let color = 'green'
          this.clientDatas[i].color = color
        }
        if(this.clientDatas[i].etat_Lead == 'A rappeler / En attente'){
          let color = 'orange'
          this.clientDatas[i].color = color
        }
        if(this.clientDatas[i].etat_Lead == 'En attente'){
          let color = 'orange'
          this.clientDatas[i].color = color
        }
        if(this.clientDatas[i].etat_Lead == 'Passé en confirmation'){
          let color = 'green'
          this.clientDatas[i].color = color
        }
        if(this.clientDatas[i].etat_Lead == 'Confirmé' || this.clientDatas[i].etat_Lead == 'signer'){
          let color = 'green'
          this.clientDatas[i].color = color
        }  
      }
      console.log(this.clientDatas);
      this.progresse = false;
    }, function (error) {
      this.progresse = false;
      error.message //=> String
      console.log(error)
    })
  }


  onGet_Delete_Client(data){
    this.serviceAdmin.onDelete_clients_particulier(data.id_clientparticulierLead).then(async (res) => {
       this.alert.onInfo('Supression réussit', 'La fiche client a été suprimé avec succès.')
       this.onGetClients();
       console.log(res.body);
     }, function (error) {
       error.message //=> String
       this.alert.onInfo('Echec', 'Une erreur c\'est produit durant l\opération.')
       console.log(error)
     })
   }

}
