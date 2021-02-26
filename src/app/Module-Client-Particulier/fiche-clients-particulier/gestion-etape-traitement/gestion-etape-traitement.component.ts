
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAdministrationService } from 'src/app/Services/api_administration/api-administration.service';
import { ApiAgentService } from 'src/app/Services/api_agent/api-agent.service';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';

@Component({
  selector: 'app-gestion-etape-traitement',
  templateUrl: './gestion-etape-traitement.component.html',
  styleUrls: ['./gestion-etape-traitement.component.css']
})
export class GestionEtapeTraitementComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  proprietaire_ou_locataire
  etat_lead
  progresse: boolean = false;

  data_etape_comparaison = [
    { id: 1, nom: "Prise de Rendez-vous" },
    { id: 2, nom: "Envoyer le dossier à AMO" },
    { id: 3, nom: "Etat du rendez-vous" },
    { id: 4, nom: "Livraison pompe à chaleur" },
    { id: 5, nom: "Etat du dossier" },
    { id: 6, nom: "Accompte action logement" },
    { id: 7, nom: "Commande fournisseur" },
    { id: 8, nom: "Choix installateur" },
    { id: 9, nom: "En attente d'installation" },
    { id: 10, nom: "Dossier CEE validé" },
    { id: 11, nom: "Installation" },
    { id: 12, nom: "Mise en service effectuée " },
    { id: 13, nom: "Action paiement final " },
    { id: 14, nom: "Dossier CEE payé" },
    { id: 15, nom: "Validation du lead en reste à charge" },
    { id: 16, nom: "Financement " },
  ]





  id_clientparticulierLead
  mail
  identifiant_action_logement
  ref_dossier_CEE
  retour_rdv
  type_livraison
  commentaire_livraison
  ref_virement_accompte
  designation
  ref_virement_logement
  ref_payement
  ref_produit
  commentaire_finacement
  var1
  var2
  var3
  var4
  var5
  var6: any;
  var7
  var8
  var9
  var10

  info1
  info2

  info3
  info4
  info5
  info6
  info7
  info8
  info9

  info10
  info11
  info12
  info13
  info14
  info15
  info16

  info17
  info18
  info19
  info20
  info21

  description
  datas_Etape: any[];
  datas_Etape_valeur: any[];

  etape1: boolean = false;
  etape2: boolean = false;
  etape3: boolean = false;
  etape4: boolean = false;
  etape5: boolean = false;
  etape6: boolean = false;
  etape7: boolean = false;
  etape8: boolean = false;
  etape9: boolean = false;
  etape10: boolean = false;
  etape11: boolean = false;
  etape12: boolean = false;
  etape13: boolean = false;
  etape14: boolean = false;
  etape15: boolean = false;
  etape16: boolean = false;
  etape: string;
  data_Etape_done: any;


  constructor(
    // private location: Location,
    // private _formBuilder: FormBuilder,
    // public route: Router, public activatedRoute: ActivatedRoute,
    public alert: POPUPServiceService,
    public dialog: MatDialog,
    public agentService: ApiAgentService,
    public serviceAdmin: ApiAdministrationService,
  ) { }

  ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });

    this.onGet_list_Etape()
    this.onGet_Etape_Traitement_valeur();
    this.onGet_Data_Etape_Done();

  }

  onDialo() {
    document.getElementById('id01').style.display = 'none'
  }

  onAgent_Registration() {
  }
  onControle_Etat() { }


  onGet_Etape_Traitement_valeur() {
    this.agentService.onGet_Etape_Traitement_valeur(+localStorage.getItem('client_id')).then(async (res) => {
      let result = await res.json();
      this.datas_Etape_valeur = result;
      console.log(this.datas_Etape);
    }, function (error) {
      error.message //=> String
      console.log(error)
    })
  }



  onEtape_registration() {
    this.progresse = true;
    this.agentService.onEtape_Traitement(+localStorage.getItem('client_id'), this.mail, this.identifiant_action_logement,
      this.ref_dossier_CEE, this.retour_rdv, this.type_livraison, this.commentaire_livraison,
      this.ref_virement_accompte, this.designation, this.ref_virement_logement, this.ref_payement,
      this.ref_produit, this.commentaire_finacement, this.var1, this.var2, this.var3, this.var4,
      this.var5, this.var6, this.var7, this.var8, this.var9, this.var10, this.info1, this.info2,
      this.info3, this.info4, this.info5, this.info6, this.info7, this.info8, this.info9,
      this.info10, this.info11, this.info12, this.info13, this.info14, this.info15, this.info16,
      this.info17, this.info18, this.info19, this.info20, this.info21)
      .then(async (res: Response) => {
        this.progresse = false;
        console.log(res);
        this.alert.onInfo('Opération réussit', 'Traitement etape enregistré avec succès.')
      }, err => {
        this.progresse = false;
        console.log(err)
      })
  }



  onGet_list_Etape() {
    this.serviceAdmin.onGet_liste_des_etape(localStorage.getItem('user_id')).then(async (res) => {
      let result = await res.json();
      this.datas_Etape = result;
      console.log(this.datas_Etape);

      this.onEtape_vue();
    }, function (error) {
      error.message //=> String
      console.log(error)
    })

  }


  onEtape_vue() {
    for (var i = 0; i < this.datas_Etape.length; i++) {
      let etape = this.datas_Etape[i].etape;
      for (var j = 0; j < this.data_etape_comparaison.length; j++) {
        if (this.data_etape_comparaison[j].nom == etape) {
          j = j + 1
          if (j == 1) {
            this.etape1 = true
          }
          if (j == 2) {
            this.etape2 = true
          }
          if (j == 3) {
            this.etape3 = true
          }
          if (j == 4) {
            this.etape4 = true
          }
          if (j == 5) {
            this.etape5 = true
          }
          if (j == 6) {
            this.etape6 = true
          }
          if (j == 7) {
            this.etape7 = true
          }
          if (j == 8) {
            this.etape8 = true
          }
          if (j == 9) {
            this.etape9 = true
          }
          if (j == 10) {
            this.etape10 = true
          }
          if (j == 11) {
            this.etape11 = true
          }
          if (j == 12) {
            this.etape12 = true
          }
          if (j == 13) {
            this.etape13 = true
          }
          if (j == 14) {
            this.etape14 = true
          }

          if (j == 15) {
            this.etape15 = true
          }
          if (j == 16) {
            this.etape16 = true
          }

        }

      }

    }
  }



  onGet_Data_Etape_Done() {
    this.serviceAdmin.onGet_Data_Etape(+localStorage.getItem('client_id')).then(async (res) => {

      let result = await res.json();
      this.data_Etape_done = result;
      console.log(this.data_Etape_done);

      this.id_clientparticulierLead  = this.data_Etape_done[0].id_clientparticulierLead
      this.mail  = this.data_Etape_done[0].mail
      this.identifiant_action_logement  = this.data_Etape_done[0].identifiant_action_logement
      this.ref_dossier_CEE  = this.data_Etape_done[0].ref_dossier_CEE
      this.retour_rdv  = this.data_Etape_done[0].retour_rdv
      this.type_livraison  = this.data_Etape_done[0].type_livraison
      this.commentaire_livraison  = this.data_Etape_done[0].commentaire_livraison
      this.ref_virement_accompte  = this.data_Etape_done[0].ref_virement_accompte
      this.designation  = this.data_Etape_done[0].designation
     this. ref_virement_logement  = this.data_Etape_done[0].ref_virement_logement
      this.ref_payement  = this.data_Etape_done[0].ref_payement
      this.ref_produit  = this.data_Etape_done[0].ref_produit
      this.commentaire_finacement  = this.data_Etape_done[0].commentaire_finacement
      this.var1 = this.data_Etape_done[0].var1
      this.var2 = this.data_Etape_done[0].var2
      this.var3 = this.data_Etape_done[0].var3
      this.var4 = this.data_Etape_done[0].var4
      this.var5 = this.data_Etape_done[0].var5
      this.var6 = this.data_Etape_done[0].var6
      this.var7 = this.data_Etape_done[0].var7
      this.var8 = this.data_Etape_done[0].var8
      this.var9 = this.data_Etape_done[0].var9
      this.var10 = this.data_Etape_done[0].var10

      this.info1 = this.data_Etape_done[0].info1
      this.info2 = this.data_Etape_done[0].info2

      this.info3 = this.data_Etape_done[0].info3
      this.info4 = this.data_Etape_done[0].info4
      this.info5 = this.data_Etape_done[0].info5
      this.info6 = this.data_Etape_done[0].info6
      this.info7 = this.data_Etape_done[0].info7
      this.info8 = this.data_Etape_done[0].info8
      this.info9 = this.data_Etape_done[0].info9

      this.info10 = this.data_Etape_done[0].info10
      this.info11 = this.data_Etape_done[0].info11
      this.info12 = this.data_Etape_done[0].info12
      this.info13 = this.data_Etape_done[0].info13
      this.info14 = this.data_Etape_done[0].info14
      this.info15 = this.data_Etape_done[0].info15
      this.info16 = this.data_Etape_done[0].info16

      this.info17 = this.data_Etape_done[0].info17
      this.info18 = this.data_Etape_done[0].info18
      this.info19 = this.data_Etape_done[0].info19
      this.info20 = this.data_Etape_done[0].info20
      this.info21 = this.data_Etape_done[0].info21


    }, function (error) {
      error.message //=> 
      console.log(error)
    })
  }


}