
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { APIServiceService } from 'src/app/Services/api/api-service.service';
import { ApiAdministrationService } from 'src/app/Services/api_administration/api-administration.service';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';
import { AjoutAideComponent } from './ajout-aide/ajout-aide.component';

@Component({
  selector: 'app-aides',
  templateUrl: './aides.component.html',
  styleUrls: ['./aides.component.css']
})
export class AidesComponent implements OnInit {
  
  //Datable avec td début
  dtOptions;
  
  
  //sleep fin
  ngOnInit(){
    
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
      pageLength: 10,
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

  constructor(public http: APIServiceService, public alert: POPUPServiceService, public serviceAdmin: ApiAdministrationService, public dialog: MatDialog, public route: Router, public routeCon: ActivatedRoute) {
    this.onGet_list_aides()
  }

  

  openDialog() {
    const dialogRef = this.dialog.open(AjoutAideComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.onGet_list_aides();
      console.log(`Dialog result: ${result}`);
      this.onReload();
    });
  }

  onGet_list_aides() {
    this.serviceAdmin.onGet_liste_des_aides().then(async (res) => {
      let result = await res.json();
      this.datas = result;
      console.log(this.datas);

    }, function (error) {
      error.message //=> 
      console.log(error)
    })
  }


  onGet_Delete_Aide(data){
    this.serviceAdmin.onDelete_Aide(data.id).then(async (res) => {
       this.alert.onInfo('Supression réussit', 'Le produit a été suprimé avec succès.')
       this.onGet_list_aides();
       console.log(res.body);
       this.onReload();
     }, function (error) {
       error.message //=> String
       this.alert.onInfo('Echec', 'Une erreur c\'est produit durant l\opération.')
       console.log(error)
     })
   }






}
