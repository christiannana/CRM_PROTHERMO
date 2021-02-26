import { Component, OnInit } from '@angular/core';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';
import { RegieServiceService } from 'src/app/Services/Regie_service/regie-service.service';
import { Location, Time } from '@angular/common';
import { ApiAgentService } from 'src/app/Services/api_agent/api-agent.service';


@Component({
  selector: 'app-ajout-client-regie',
  templateUrl: './ajout-client-regie.component.html',
  styleUrls: ['./ajout-client-regie.component.css']
})
export class AjoutClientRegieComponent implements OnInit {

  progresse: boolean = false;


 date_ajout: any = Date.now();
 nom
 prenom
 addresse
 etat_Lead = 'Nouveau'
 cp
 ville
 telephone
 statut_professionnel
 systeme_chauffage_principal
 zone
 precarite
 projet
 statut_marital
 commentaire
 type_de_logement
 etape: string =  'Rdv';
 type_client:string = 'Regie'
 username_create:any = localStorage.getItem('username')
 vmc2

 zone_choix: any[];


  constructor(public regieService: RegieServiceService,
     private location: Location,
     public agentService: ApiAgentService,
     public alert: POPUPServiceService) { }

  ngOnInit(): void {
   console.log( this.date_ajout )
  }

  onClient_Registration(){
    if(this.nom == null || this.prenom == null || this.addresse == null || this.cp == null || this.ville == null || this.telephone == null || this.statut_professionnel == null || this.systeme_chauffage_principal == null || this.precarite == null || this.projet == null || this.statut_marital == null ||  this.type_de_logement == null || this.vmc2 == null ){
      this.alert.onInfo('Erreur', 'Un ou plusieurs champs sont vides.');
      return null;
    }
   this.progresse = true;
   this.regieService.onClient_Registration( this.date_ajout, this.nom, this.prenom, this.addresse, this.cp, this.ville, this.telephone, this.statut_professionnel, this.systeme_chauffage_principal, this.zone, this.precarite, this.projet, this.statut_marital, this.commentaire,this.etape, this.type_client, this.username_create, this.etat_Lead, this.type_de_logement, this.vmc2)
     .then(async (res: Response) => {
        this.progresse = false;
        let result = await res.body.tee();
        this.alert.onInfo('Opération réussit', 'Client enregistrer avec succès.');
        this.goBack();
     }, err => {
       this.progresse = false;
       console.log(err)
     })
  }


  goBack() {
    this.location.back();
  }

  onZone_Seach(){
    this.agentService.onZone_Search(this.cp).then(async (res) => {
      let result = await res.json();
     // this.zone = result;
      this.zone_choix = result[0].zonage
      console.log(result);
    }, function (error) {
      error.message //=> String
      console.log(error)
    })
  }



}
