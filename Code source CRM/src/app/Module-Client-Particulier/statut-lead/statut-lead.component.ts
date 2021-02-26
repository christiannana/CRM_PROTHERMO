import { Component, OnInit, } from '@angular/core';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { APIServiceService } from 'src/app/Services/api/api-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ApiAgentService } from 'src/app/Services/api_agent/api-agent.service';
import { AngualertService } from 'angualert';
import { config } from 'rxjs';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';



@Component({
  selector: 'app-statut-lead',
  styleUrls: ['./statut-lead.component.css'],
  templateUrl: './statut-lead.component.html',
})
export class StatutLeadComponent implements OnInit {
  
  //Datable avec td début
  dtOptions;
  
  
  //sleep fin
  ngOnInit(){
    this.onGetClients()
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
    lengthMenu : [5, 10, 25,50],
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  datas: any[];
  clientDatas: any[];
  _opened: boolean = false;
  progresse = false



  constructor(public http: APIServiceService,
    public alert: POPUPServiceService, public agentService: ApiAgentService,
    public angualertService: AngualertService,
    public dialog: MatDialog,
    public route: Router,
    public routeCon: ActivatedRoute,) { }

  

  onFechtDatas() {
    this.http.onJSONplaceHolder().subscribe((res: any) => {
      this.datas = res;
    }, (error: any) => {
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AjoutClientComponent, { disableClose: false, closeOnNavigation: true });
    dialogRef.afterClosed().subscribe(result => {
      this.onGetClients();
      console.log(`Dialog result: ${result}`);
      this.onReload()
    });
  }


  onEditFiche(data) {
    localStorage.setItem('fiche', 'lead');
    setTimeout(() => {
      this.route.navigate(['modifier_fiche_client', data])
    }, 500)
  }


  onGetClients() {
    this.agentService.onGet_liste_des_clients(localStorage.getItem('user_id')).then(async (res) => {
      // res.status     //=> number 100–599
      // res.statusText //=> String
      // res.headers    //=> Headers
      // res.url        //=> String
      // console.log(res)
      // this.pha = [];
      let result = await res.json();
      this.datas = result;

      for (var i = 0; i < this.datas.length; i++) {
        if (this.datas[i].etat_Lead == 'Nouveau') {
          let color = 'blue'
          this.datas[i].color = color
        }

        if (this.datas[i].etat_Lead == 'En attente simulation') {
          let color = 'orange'
          this.datas[i].color = color
        }

        if (this.datas[i].etat_Lead == 'NRP') {
          let color = 'blue'
          this.datas[i].color = color
        }
        if (this.datas[i].etat_Lead == 'Annulé pas intéressé') {
          let color = 'red'
          this.datas[i].color = color
        }
        if (this.datas[i].etat_Lead == 'Devis signé/ A installer') {
          let color = 'green'
          this.datas[i].color = color
        }
        if (this.datas[i].etat_Lead == 'A rappeler / En attente') {
          let color = 'orange'
          this.datas[i].color = color
        }
        if (this.datas[i].etat_Lead == 'En attente') {
          let color = 'orange'
          this.datas[i].color = color
        }
        if (this.datas[i].etat_Lead == 'Passé en confirmation') {
          let color = 'green'
          this.datas[i].color = color
        }
      }

      console.log(this.datas);
      // for(let i =0; i<this.pha.length;i++)
      // console.log(this.pha[i].nom);
      // return response.text()
    }, function (error) {
      error.message //=> String
      console.log(error)
    })
  }

  // onDelet1(){
  //   this.ngxSmartModalService.open('myModal');
  // }

  onGet_Delete_Client(data) {
    this.agentService.onDelete_clients_particulier(data.id_clientparticulier).then(async (res) => {
      this.alert.onInfo('Supression réussit', 'La fiche client a été suprimé avec succès.')
      this.onGetClients();
      console.log(res.body);
      this.onReload()
    }, function (error) {
      error.message //=> String
      this.alert.onInfo('Echec', 'Une erreur c\'est produit durant l\opération.')
      console.log(error)
    })
  }


}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

//////////////////   DIALOG AJOUT DE CLIENT ///////////////////////////////////////

@Component({
  selector: 'app-ajout-client',
  templateUrl: './ajout-client/ajout-client.component.html',
  styleUrls: ['./ajout-client/ajout-client.component.css']
})
export class AjoutClientComponent implements OnInit {
  progresse = false

  created_time: any = Date.now();
  id_clientparticulier_lead;
  nom
  prenom
  num_fisc
  addresse
  cp
  ville
  telephone
  email
  ref_avis_impot
  id_agent: any = null;
  etape: string = 'Lead';
  etat_lead: string = 'Nouveau';
  pha: any;
  proprietaire_ou_locataire;
  type_de_logement;
  statut_professionnel;
  systeme_chauffage_principal;
  zone;
  domaine_activite;
  type_travaux;
  ballon_thermo;
  vmc2;
  nbre_personne_foyer;
  precarite;
  numero_dossier;
  //etat_lead;	
  etat_rdv; user_id_install;
  user_id_lead =  localStorage.getItem('user_id');
  user_id_rdv;

  commentaire
  statut_dossier
  date_traitement
  commentaire_confirmateur

  projet

  username_create:any = localStorage.getItem('username')
  id_affected

  type_client: string 
  
  username_affected =  localStorage.getItem('username');


  clientDatas: any[];

  constructor(private fb: FormBuilder, public alert: POPUPServiceService, public dialog: MatDialog, private route: Router, public agentService: ApiAgentService, public angualertService: AngualertService) { }

  ngOnInit(): void {
  }

  onClientRegistration() {
    if(this.nom == null || this.prenom == null || this.addresse == null || this.cp == null || this.ville == null || this.telephone == null || this.statut_professionnel == null || this.systeme_chauffage_principal == null || this.type_de_logement == null ){
      this.alert.onInfo('Erreur', 'Un ou plusieurs champs sont vides.');
      return null;
    }
    this.progresse = true;
    this.agentService.onClientRegister(this.id_clientparticulier_lead, this.addresse, this.ballon_thermo, this.cp, this.created_time, this.domaine_activite, this.email, this.etape, this.user_id_install, this.etat_lead, this.etat_rdv, this.nbre_personne_foyer, this.nom, this.num_fisc, this.numero_dossier, this.precarite, this.prenom, this.proprietaire_ou_locataire, this.ref_avis_impot, this.statut_professionnel, this.systeme_chauffage_principal, this.telephone, this.type_de_logement, this.type_travaux, this.user_id_install, this.user_id_lead, this.user_id_rdv, this.ville, this.vmc2, this.zone, this.commentaire, this.statut_dossier, this.date_traitement, this.commentaire_confirmateur,this.projet, this.type_client, this.username_create, this.id_affected, )
      .then(async (res: Response) => {
        this.progresse = false;
        let result = await res.body.tee();
        this.pha = result;
        console.log(this.pha);

        this.onCloseDialog();
        this.alert.onInfo('Opération réussit', 'Client enregistrer avec succès.')

      }, err => {
        this.progresse = false;
        console.log(err)
      })

  }


  onCloseDialog() { this.dialog.closeAll(); }



}
