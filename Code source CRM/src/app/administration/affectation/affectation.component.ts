import { Component, OnInit } from '@angular/core';
import { ApiAdministrationService } from 'src/app/Services/api_administration/api-administration.service';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';
import { RegieServiceService } from 'src/app/Services/Regie_service/regie-service.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {
  //Datable avec td début
  dtOptions;
  dtOptions1
  
  //sleep fin
  ngOnInit(){
    this.onGet_list_Agents();
    this.onGet_list_Client_non_Affecter();
    this.onGetClients_Regie();
    this.onGet_list_Agents();
    this.onGet_list_Client_non_Affecter();
    this.onGetClients_Regie();
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
      pageLength: 5,
    lengthMenu : [5, 10, 25],
      processing: true
    };
    this.dtOptions1 = {
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
      pageLength: 5,
    lengthMenu : [5, 10, 25],
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
  created_time: any = Date.now();
  proprietaire_ou_locataire: string;
  type_de_logement: string;
  statut_professionnel: string;
  systeme_chauffage_principal: string;
  nom: string;
  ville: string;
  cp: any;
  telephone
 
  etat_lead: string = "Nouveau"

  csvRecords: any[] = [];
  header = true;
  file: any;
  arrayBuffer: any;
  filelist: any[];

  datas_client: any[];
  progresse = false;
  Excel_datas: any[];
  datas_agent: any[];

  Tableau_affectation = [];
  cpt_ref = [];
  clientDatasRegie: any[];

  constructor(public serviceAdmin: ApiAdministrationService,
    public regieService: RegieServiceService,
    public alert: POPUPServiceService,) { }

  


  onGet_list_Agents() {
    this.serviceAdmin.onGet_liste_des_agents().then(async (res) => {
      let result = await res.json();
      this.datas_agent = result;
      console.log(this.datas_agent);

    }, function (error) {
      error.message //=> String
      console.log(error)
    })
  }



  onGet_list_Client_non_Affecter() {
    this.progresse = true;
    this.serviceAdmin.onGet_liste_des_clients_non_Affecter().then(async (res) => {
      let result = await res.json();
      this.datas_client = result;
      this.progresse = false;
      console.log(this.datas_client);
    }, function (error) {
      this.progresse = false;
      error.message //=> String
      console.log(error)
    })
  }

  onClient_Importation_Excel() {
    this.progresse = true;
    let cpt: number = 0;
    if (this.Excel_datas.length == 0) {
      this.progresse = false;
      this.alert.onInfo('Erreur !', 'Le fichier importé semble etre invalide.')      
    }
    for (var i = 0; i < this.Excel_datas.length; i++) {
      console.log(this.Excel_datas[i]);
      console.log(this.Excel_datas[i].proprietaire_ou_locataire)
      // this.created_time = this.Excel_datas[i].date
      this.proprietaire_ou_locataire = this.Excel_datas[i].proprietaire_ou_locataire
      this.type_de_logement = this.Excel_datas[i].type_de_logement
      this.statut_professionnel = this.Excel_datas[i].statut_professionnel
      this.systeme_chauffage_principal = this.Excel_datas[i].systeme_chauffage_principal
      this.nom = this.Excel_datas[i].nom
      this.ville = this.Excel_datas[i].ville
      this.cp = this.Excel_datas[i].code_postal.toString()
      this.telephone = this.Excel_datas[i].telephone
      let type_client:string = 'Particulier'
      let etape: string = "Lead"
      let username_create: string = localStorage.getItem('username')

      this.serviceAdmin.onImportation_Cilent_particulier_Excel(this.created_time, this.proprietaire_ou_locataire, this.type_de_logement,
        this.statut_professionnel, this.systeme_chauffage_principal, this.nom, this.ville, this.cp, this.telephone, etape, this.etat_lead, type_client, username_create)
        .then(async (res: Response) => {
          cpt = cpt + 1
          if (cpt == this.Excel_datas.length) {
            this.progresse = false;
            let result = res;
            console.log(result);
            this.onGet_list_Client_non_Affecter();
            this.alert.onInfo('Opération réussit', 'L\'importation de ' + this.Excel_datas.length + ' clients a été enregistré avec succès.')
          }
        }, err => {
          this.progresse = false;
          console.log(err)
          return;
        })
    }

  }


  // Your applications input change listener for the CSV File
  onImport_Excel(event) {
    this.file = event.addedFiles[0] //event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = async (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.Excel_datas = await XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.onClient_Importation_Excel();
      this.filelist = [];
      console.log(this.Excel_datas)

    }
  }


  onSelection_agnet(data) {
    console.log(data);
    if (data.user_id_Rdv == true) {
      this.Tableau_affectation.push(data);
    } else {
      this.Tableau_affectation.pop();
    }
    console.log(this.Tableau_affectation);
    console.log(data.user_id_Rdv);
  }

  onAffectation_client(data) {
    this.progresse = true;
    let cpt: number = 0;
    if (this.Tableau_affectation.length == 0) {
      this.progresse = false;
      this.alert.onInfo('Erreur !', 'Aucun client n\'a été selectioné.')      
    }
    for (var i = 0; i < this.Tableau_affectation.length; i++) {
      console.log(this.Tableau_affectation[i]);
      console.log(this.Tableau_affectation[i].proprietaire_ou_locataire)
      this.created_time = this.Tableau_affectation[i].date
      this.proprietaire_ou_locataire = this.Tableau_affectation[i].proprietaire_ou_locataire
      this.type_de_logement = this.Tableau_affectation[i].type_de_logement
      this.statut_professionnel = this.Tableau_affectation[i].statut_professionnel
      this.systeme_chauffage_principal = this.Tableau_affectation[i].systeme_chauffage_principal
      this.nom = this.Tableau_affectation[i].nom
      this.ville = this.Tableau_affectation[i].ville
      this.cp = this.Tableau_affectation[i].cp
      this.telephone = this.Tableau_affectation[i].telephone
 
      let id_client:number = +this.Tableau_affectation[i].id_clientparticulierLead;
      let id_user: string = data.id;
      let nom: string = data.nom;
      let username: string = data.username; //localStorage.getItem('username')
      let email: string = data.email;
      let type_client:string = this.Tableau_affectation[i].type_client
      let etape: string = this.Tableau_affectation[i].etape
      let prenom:string = this.Tableau_affectation[i].prenom
      let id ='prothermo';

      this.serviceAdmin.onAffectation_client( id ,  id_user,  username,  nom,  prenom,  email, id_client)
        .then(async (res: Response) => {
          cpt = cpt + 1
          if (cpt == this.Tableau_affectation.length) {
            this.progresse = false;
            let result = res;
            console.log(result); 
            this.onGet_list_Client_non_Affecter();
            this.onGetClients_Regie();
            this.alert.onInfo('Opération réussit', 'L\'affectation de '+ this.Tableau_affectation.length + ' clients à l\'agent ' + data.prenom + '  à été faite avec succès.')
          }
        }, err => {
          this.progresse = false;
          console.log(err)
          return;
        })
    }
  }


  onGetClients_Regie() {
    // this.progresse = true;
    this.regieService.onGet_liste_des_ClientsRegie_nonAffecte(localStorage.getItem('user_id')).then(async (res) => {    
      let result = await res.json();
      this.clientDatasRegie = result;
      console.log(this.clientDatasRegie);
      this.progresse = false;
    }, function (error) {
      this.progresse = false;
      error.message //=> String
      console.log(error)
    })
  }



}
