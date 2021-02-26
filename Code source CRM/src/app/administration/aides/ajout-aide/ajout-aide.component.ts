import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { APIServiceService } from 'src/app/Services/api/api-service.service';
import { ApiAdministrationService } from 'src/app/Services/api_administration/api-administration.service';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';

@Component({
  selector: 'app-ajout-aide',
  templateUrl: './ajout-aide.component.html',
  styleUrls: ['./ajout-aide.component.css']
})
export class AjoutAideComponent implements OnInit {
  
  progresse: boolean;
  
  description
  montant
  nom
  type_aide: any;

  constructor(public http: APIServiceService, public alert: POPUPServiceService, public serviceAdmin: ApiAdministrationService, public dialog: MatDialog, public route: Router, public routeCon: ActivatedRoute) {

  }

  ngOnInit(): void {
  }


  onProduit_Registration() {
    if(this.nom == null || this.description == null || this.montant == null ){
      this.alert.onInfo('Erreur', 'Un ou plusieurs champs sont vides.');
      return null;
    }
   
    this.progresse = true;
    this.serviceAdmin.onAide_Register(this.description, this.montant, this.nom, this.type_aide)
      .then(async (res: Response) => {
        this.progresse = false;
        let result = await res.body;
        // this.pha = result;
        console.log(res.body);
        this.onCloseDialog();
        this.alert.onInfo('Opération réussit', 'Aide enregistré avec succès.')

      }, err => {
        this.progresse = false;
        this.alert.onInfo('Echec', 'Une erreur c\'est produite durant l\'opération.')
        console.log(err)
      })

  }

  onCloseDialog() { this.dialog.closeAll(); }

}
