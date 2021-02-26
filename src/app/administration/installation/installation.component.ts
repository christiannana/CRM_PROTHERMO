import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAdministrationService } from 'src/app/Services/api_administration/api-administration.service';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.css']
})
export class InstallationComponent implements OnInit {
  
  //Datable avec td début
  dtOptions;
  
  
  //sleep fin
  ngOnInit(){

    this.onGetClients();
    this.dtOptions = {
      language: {
        processing:     "Traitement en cours...",
        search:         "Rechercher&nbsp;:",
        lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
        info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
        infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        infoPostFix:    "",
        loadingRecords: "Chargement en cours...",
        zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
        emptyTable:     "Aucune donnée disponible dans le tableau",
        paginate: {
            first:      "Premier",
            previous:   "Pr&eacute;c&eacute;dent",
            next:       "Suivant",
            last:       "Dernier"
        },
        aria: {
            sortAscending:  ": activer pour trier la colonne par ordre croissant",
            sortDescending: ": activer pour trier la colonne par ordre décroissant"
        }
    },
      pagingType: 'full_numbers',
      pageLength: 25,
    lengthMenu : [5, 10, 25, 50],
      processing: true
    };
  }
  //Recharger la page
  onReload(){
    setTimeout(()=>{
      window.location.reload();
    }, 3000);
    }
  //Data Table avec td fin
  datas: any[];
  clientDatas: any[];
  _opened: boolean = false;
  progresse = false


  constructor(public serviceAdmin: ApiAdministrationService,
    public alert: POPUPServiceService, 
    public route: Router, ) { }

  


  
  onGetClients() {
    this.serviceAdmin.onGet_liste_des_clients_Install().then(async (res) => {
      let result = await res.json();
      this.datas = result;
      
      for(var i = 0; i < this.datas.length; i++ ){
        if(this.datas[i].etat_Lead == 'Nouveau'){
          let color = 'blue'
          this.datas[i].color = color
        }    
        if (this.datas[i].etat_Lead == 'En attente simulation') {
          let color = 'orange'
          this.datas[i].color = color
        }
        if(this.datas[i].etat_Lead == 'NRP'){
          let color = 'blue'
          this.datas[i].color = color
        }       
        if(this.datas[i].etat_Lead == 'Annulé pas intéressé'){
          let color = 'red'
          this.datas[i].color = color
        }
        if(this.datas[i].etat_Lead == 'Devis signé/ A installer'){
          let color = 'green'
          this.datas[i].color = color
        }
        if(this.datas[i].etat_Lead == 'A rappeler / En attente'){
          let color = 'orange'
          this.datas[i].color = color
        }
        if(this.datas[i].etat_Lead == 'En attente'){
          let color = 'orange'
          this.datas[i].color = color
        }
        if(this.datas[i].etat_Lead == 'Installation planifiée'){
          let color = 'green'
          this.datas[i].color = color
        }
      }
      console.log(this.datas);
    }, function (error) {
      error.message //=> String
      console.log(error)
    })
  }


  onEditFiche(data) { 
    localStorage.setItem('fiche', 'installation');
    setTimeout(() => {
      this.route.navigate(['modifier_fiche_client',data])
    }, 500)
  }

  // onDelet1(){
  //   this.ngxSmartModalService.open('myModal');
  // }

  onGet_Delete_Client(data){ 
   this.serviceAdmin.onDelete_clients_particulier(data.id_clientparticulierLead).then(async (res) => {
      this.alert.onInfo('Supression réussit', 'La fiche client a été suprimé avec succès.')
      this.onGetClients();
      console.log(res.body);
      this.onReload();
    }, function (error) {
      error.message //=> String
      this.alert.onInfo('Echec', 'Une erreur c\'est produit durant l\opération.')
      console.log(error)
    })
  }




}

