import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegieServiceService } from 'src/app/Services/Regie_service/regie-service.service';

@Component({
  selector: 'app-regie-by-user',
  templateUrl: './regie-by-user.component.html',
  styleUrls: ['./regie-by-user.component.css']
})
export class RegieByUserComponent implements OnInit {

  clientDatas: any[];
  _opened: boolean = false;
  progresse = false
  datas_agent: any[] = [{},{},{}]

  constructor(public route: Router, public regieService: RegieServiceService,) { }

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
    this.regieService.onGet_liste_des_ClientsRegie_byUser(localStorage.getItem('user_id')).then(async (res) => {    
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


}
