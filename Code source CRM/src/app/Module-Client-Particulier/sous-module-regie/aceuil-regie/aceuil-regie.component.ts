import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegieServiceService } from 'src/app/Services/Regie_service/regie-service.service';

@Component({
  selector: 'app-aceuil-regie',
  templateUrl: './aceuil-regie.component.html',
  styleUrls: ['./aceuil-regie.component.css']
})
export class AceuilRegieComponent implements OnInit {

  
  clientDatas: any[];
  _opened: boolean = false;
  progresse = false
  datas_agent: any[] = [{},{},{}]



  constructor(public route: Router, public regieService: RegieServiceService,) { }

  ngOnInit(): void {
    localStorage.setItem('role', 'regie_ext');
    this.onGetClients()
  }

  onAjoutClient_Regie() {
    this.route.navigate(['/ajout_client_regie'])
  }

  onEditFiche(data) {
    localStorage.setItem('fiche', 'regie_ext');
    setTimeout(() => {
      this.route.navigate(['modifier_fiche_client', data])
    }, 500)
  }

  
  onGetClients() {
    this.progresse = true;
    this.regieService.onGet_liste_des_ClientsRegie_byRegie(localStorage.getItem('username')).then(async (res) => {    
      let result = await res.json();
      this.clientDatas = result;
      
      for (var i = 0; i < this.clientDatas.length; i++) {
        if (this.clientDatas[i].etat_Lead == 'Nouveau') {
          let color = 'blue'
          this.clientDatas[i].color = color
        }
        if (this.clientDatas[i].etat_Lead == 'NRP') {
          let color = 'blue'
          this.clientDatas[i].color = color
        }
        if (this.clientDatas[i].etat_Lead == 'Annulé pas intéressé') {
          let color = 'red'
          this.clientDatas[i].color = color
        }
        if (this.clientDatas[i].etat_Lead == 'Devis signé/ A installer') {
          let color = 'green'
          this.clientDatas[i].color = color
        }
        if (this.clientDatas[i].etat_Lead == 'A rappeler / En attente') {
          let color = 'orange'
          this.clientDatas[i].color = color
        }
        if (this.clientDatas[i].etat_Lead == 'En attente') {
          let color = 'orange'
          this.clientDatas[i].color = color
        }
        if (this.clientDatas[i].etat_Lead == 'Passé en confirmation') {
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

  onDeconnexion(){
    localStorage.removeItem('token')
    this.route.navigate(['/'])
  }

  
}
