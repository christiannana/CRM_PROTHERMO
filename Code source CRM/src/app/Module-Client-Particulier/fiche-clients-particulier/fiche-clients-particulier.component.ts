// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-fiche-clients-particulier',
//   templateUrl: './fiche-clients-particulier.component.html',
//   styleUrls: ['./fiche-clients-particulier.component.css']
// })
// export class FicheClientsParticulierComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }



import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { Location, Time } from '@angular/common';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';
import { ApiAgentService } from 'src/app/Services/api_agent/api-agent.service';
import { MatDialog } from '@angular/material/dialog';
// import { MapboxService } from 'src/app/Services/mapbox/mapbox.service';
import { PDFmakerService } from 'src/app/Services/PDFmaker/pdfmaker.service';
// import { AgmCoreModule } from '@agm/core/lib/core.module';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiAdministrationService } from 'src/app/Services/api_administration/api-administration.service';
// import { AgmCoreModule } from '@agm/core';
import * as fileSaver from 'file-saver';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

// import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AjoutInfosFiscalsComponent } from './ajout-infos-fiscals/ajout-infos-fiscals.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

// import htmlToPdfmake from 'html-to-pdfmake';
// import { isThisHour } from 'date-fns';

 pdfMake.vfs = pdfFonts.pdfMake.vfs;

 export class Fiscal {
  intitule : string;
  numerofiscal : string;
  reference : string
}


@Component({
  selector: 'app-fiche-clients-particulier',
  templateUrl: './fiche-clients-particulier.component.html',
  styleUrls: ['./fiche-clients-particulier.component.css']
})
export class FicheClientsParticulierComponent implements OnInit {

  _opened: boolean = false;
  
  panelOpenState = false;
  zoom = 3
  lat = 47.704060;
  long = 4.102493;
  googleMapType = 'satellite';
  google: any;

  Categorie_doc: any[] = [
    { id: "1", nom: "Avis d'impot" },
    { id: "2", nom: "Bulletin de salaire" },
    { id: "3", nom: "CI MME" },
    { id: "4", nom: "CI MR" },
    { id: "5", nom: "Documents AMO" },
    { id: "6", nom: "Justificatif de propriété" },
    { id: "7", nom: "livret de famille" },
    { id: "8", nom: "Photos" },
    { id: "9", nom: "Rapport AMO" },

  ]


 // public variables = ['One','Two','County', 'Three', 'Zebra', 'XiOn'];



  displayedColumns = ['num_fisc', 'ref', 'avis', 'intitule', 'description','id_client'];//,'fonction','idResponsable','action','supprimer'];
  displayedColumnsParcAirEau = ['marque','materiel','quantite',"prixttc","supprimer"];
  dataSource;
  dataSourcePacAirEau;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  listesFiscales : Fiscal[];
  
  // Tous les produits Début
  tousLesProduits : any[]
  produits = new FormControl();
  nomProduits : string[]=[];

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.dataSourcePacAirEau=filterValue;
  }



  lead: boolean = false;
  commercial: boolean = false;
  installation: boolean = false;
  regie: boolean = false;
  actionControl =  localStorage.getItem('role');

  datas: any;

  id_clientparticulier_lead: number;
  nom: string;
  prenom: string;
  num_fisc
  addresse
  cp
  ville
  telephone
  email
  ref_avis_impot
  id_agent: any = null;
  etape
  etat_lead
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
  created_time;
  revenue_fiscal_reference;
  statut_marital;
  //////
  commentaire
  statut_dossier
  date_traitement = Date.now();
  commentaire_confirmateur
  projet
  type_client
  username_create
  id_affected

  type_modele

  //etat_lead;	
  etat_rdv; user_id_install;
  user_id_lead;
  user_id_rdv;
  etat_install

  date_rdv: Date
  heure_rdv: Time
  type_notification: string

  ////////////////////////////  DONNEES FICHE TECHNIQUE   ///////////////////


  //chantier début
  categorie_sociale

  
  mode_chauffage: string
  surface_chauffee
  revenu_fiscal
  nbre_foyers
  
  nature_occupation
  type_bien
  salarie_prive
  consommation_annuelle
  credit_impot
  credit_en_cours
  adresse_chantier
  complement_adresse
  code_postal
  
  type_systeme
  type_mat_demonte
  hauteur_plafond
  altitude
  temp_moyenne_chauffage
  combles_isoles
  sous_sol_isole
  annee_construction
  vmc
  nbre_chauffage
  taille_chauffages
  type_pompe
  temp_sortie_chaudiere
  epais_isolation_mur_ext
  vitrage
  tableau_electrique
  paiement_comptant
  montant_acompte
  infos_paiement
  //chantier fin


  id_clientparticulierLead
 
    


  progresse: boolean = false;
  datas_Fiche: any[];
  data_historique: any[];
  mailMessage: any;
  Typenotification: any;
  Datenotification: any;
  Heurenotification: any;
  // commentaire: any;
  documents_Data: any[];

  thumbnail: any;
  documents_Data_X: any[] = [];
  datas_agent: any[];
  zone_choix: any;
  username_affected: any;

  
  commercial_user: any = localStorage.getItem('username');


  data_devis: any[];
  filteredList2 

  data_devis_push: any[] = [];
  data_devis_statut: boolean = false;
  devis_produit: string;
  sous_total: any ;
  tva_total: any;
  total_devis: any;
  datas_aide: any[];
  aide_description: any;
  PRIME_CEE_PAC_AIR_EAU: number;
  PRIME_CEE_ballon_hydrodynamique: number;
  PRIME_RENOV: number;
  montant_prime = 0
  reste_a_charge: any;

  devis_numero
  date_devis_start = Date.now();
  date_devis_end
  Datas_devis_tableau: any[] = [ [{text: 'Description', style: 'tableHeader' , fillColor: '#dddddd'}, {text: 'Qté', style: 'tableHeader' , fillColor: '#dddddd'},  {text: 'TVA', style: 'tableHeader' , fillColor: '#dddddd'}, {text: 'Prix unitaire HT', style: 'tableHeader' , fillColor: '#dddddd'}, {text: 'Prix HT', style: 'tableHeader' , fillColor: '#dddddd'},{text: 'Prix TTC', style: 'tableHeader' , fillColor: '#dddddd'},] ]
  aide_nom: any;
  aides_devis: any;
  aides_devis_data: any[] = [];
  data_list_agent_affecter: any[];
  datas_rendezVous: any[];
  motif_rendezVous: any;
  lieu_rendezVous: any;

  
  // @ViewChild('pdfTable') pdfTable: ElementRef;

  // @ViewChild('htmlData') htmlData:ElementRef;

  
  constructor(private location: Location,
    public route: Router, public activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public alert: POPUPServiceService,
    public dialog: MatDialog,
    public agentService: ApiAgentService,
    // private map: MapboxService,
    private pdf: PDFmakerService,
    public serviceAdmin: ApiAdministrationService,
    private sanitizer: DomSanitizer,) { }

  ngOnInit() {

    // this.map.buildMap()

    this.activatedRoute.params.subscribe((data) => {
      this.datas = data
      console.log(data)

      this.id_clientparticulier_lead = data.id_clientparticulierLead;
      this.nom = data.nom;
      this.prenom = data.prenom;
      this.num_fisc = data.num_fisc;
      this.addresse = data.addresse;
      this.cp = data.cp;
      this.ville = data.ville
      this.telephone = data.telephone
      this.email = data.email
      this.ref_avis_impot = data.ref_avis_impot
      this.etat_lead = data.etat_Lead
      this.proprietaire_ou_locataire = data.proprietaire_ou_locataire;
      this.type_de_logement = data.type_de_logement;
      this.statut_professionnel = data.statut_professionnel;
      this.systeme_chauffage_principal = data.systeme_chauffage_principal;
      this.zone = data.zone;
      this.domaine_activite = data.domaine_activite;
      this.type_travaux = data.type_travaux;
      this.ballon_thermo = data.ballon_thermo;
      this.vmc2 = data.vmc2;
      this.statut_marital = data.statut_marital
      this.nbre_personne_foyer = data.nbre_personne_foyer;
      this.precarite = data.precarite;
      this.numero_dossier = data.numero_dossier;
      this.created_time = data.created_time;
      //etat_lead;	
      this.etat_rdv = data.etat_rdv;
      this.user_id_install = data.user_id_install;
      this.user_id_lead = data.user_id_Lead;
      this.user_id_rdv = data.user_id_rdv;
      this.etat_install = data.etat_install

      this.commentaire  = data.commentaire
      this.statut_dossier = data.statut_dossier
      this.date_traitement = data.date_traitement
      this.commentaire_confirmateur = data.commentaire_confirmateur
      this.projet = data.projet
      this.type_client = data.type_client
      this.username_create = data.username_create
      this.id_affected = data.id_affected
      this.username_affected = data.username_affected;

      this.date_rdv = data.date_rdv
      this.heure_rdv = data.heure_rdv
      this.type_notification = data.type_notification
      this.type_modele = data.type_modele

      localStorage.setItem('client_id', this.id_clientparticulier_lead.toString())

      this.onGetClients_Historique();
      this.onGetClients_Fiche(this.id_clientparticulier_lead);
      this.onZone_Seach();
      this.onDocument_Download_ALL();
      this.onGet_list_Agents();
      this.onGet_list_RendezVous();
      this. onGet_Listes_Infos_Fisales(this.id_clientparticulier_lead);
     
    });

    if (localStorage.getItem('fiche') == 'lead') {
      this.lead = true;
    }
    if (localStorage.getItem('fiche') == 'commercial') {
      this.commercial = true;
    }
    if (localStorage.getItem('fiche') == 'installation') {
      this.installation = true;
    }
    if (localStorage.getItem('fiche') == 'regie') {
      this.regie = true;
    }


    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.onGet_list_produits()
    this.onGet_list_aides()
    this.onGet_list_agent_affecter();
    this.onDevisCode();
    
  }


  openDialog_info() {
    const dialogRef = this.dialog.open(AjoutInfosFiscalsComponent);
    dialogRef.afterClosed().subscribe(result => {
      this. onGet_Listes_Infos_Fisales(this.id_clientparticulier_lead);
      console.log(`Dialog result: ${result}`);
    });
  }




  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  onDevisCode(){
    if(this.devis_numero != null){
      return null;
    }
    let un = this.nom.substring(0,1).toUpperCase();
    let prenom = this.prenom.substring(0,1).toUpperCase();
    let date = Date.now().toString().substring(9,14)
    let code = 'S'+ date + un + prenom;
    this.devis_numero = code
  }

  goBack() {
    this.location.back();
  }

  onToggleSidebar() {
    this._opened = !this._opened;
  }
  onCloseToggleSidebar() {
    this._opened = false;
  }

  onPDF_Generate() {
   // this.pdf.generatePdf(this.id_clientparticulier_lead, this.nom, this.prenom, this.email, this.telephone, this.cp, this.ville, this.proprietaire_ou_locataire, this.statut_professionnel, this.num_fisc);
      this.pdf.onDevisPDF()
  }



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
 
  onAffectation_client(data) {
       this.progresse = true;
        let id_client:number = +this.id_clientparticulier_lead;
        let id_user: string = data.id;
        let nom: string = data.nom;
        let username: string = data.username //localStorage.getItem('username')
        let email: string = data.email;
        let prenom:string = data.prenom;
        let id ='prothermo'; 
        this.serviceAdmin.onAffectation_client( id ,  id_user,  username,  nom,  prenom,  email, id_client)
          .then(async (res: Response) => {
              this.progresse = false;
              let result = res;
              this.onGet_list_agent_affecter();
              console.log(result); 
              this.alert.onInfo('Opération réussit', 'L\'affectation du clients à l\'agent ' + data.prenom + '  à été faite avec succès.')
          }, err => {
            this.progresse = false;
            console.log(err)
            return;
          })
      }
  


  title = 'dropzone';
  // file: File

  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles)
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onControle_Etat() {
    // if (this.etat_lead == "Passé en confirmation") {
    //   this._opened = true;
    // }
    // if (this.etat_lead == "A rappeler / En attente") {
    //   this._opened = true;
    // }
    // if (this.etat_lead == "Annulé pas intéressé") {
    //   this._opened = true;
    // }
  }
  

  onControle_Etat_donnee() {
    // if (this.etat_lead == "Passé en confirmation") {
    //   if (this.mailMessage == null) {
    //     this.alert.onInfo('Erreur', 'Vous devez remplire le champ email.')
    //     return null;
    //   } else {
    //     this._opened = false;
    //   }
    // }

    // if (this.etat_lead == "A rappeler / En attente") {
    //   if (this.Datenotification == null) {
    //     this.alert.onInfo('Erreur', 'Vous devez remplire la date et l\'heure.')
    //     return null;
    //   } else {
    //     this._opened = false;
    //   }
    // }

    // if (this.etat_lead == "Annulé pas intéressé") {
    //   if (this.commentaire == null) {
    //     this.alert.onInfo('Erreur', 'Vous devez remplire le champ commentaire.')
    //     return null;
    //   } else {
    //     this._opened = false;
    //   }
    // }
  }


  onClientUpdate_lead() {
    console.log(this.type_notification, this.user_id_lead)
    this.etape = 'Lead'
    if (this.etat_lead == "Passé en confirmation") {
      this.etat_lead = 'Nouveau';
      this.etape = 'Rdv'
    }
    this.progresse = true;
    this.onMail_Send();
    this.onUpdate_Fiche_Techinique(this.id_clientparticulier_lead);
    this.onPostClients_Historique();
    this.agentService.onClientUpdate(this.id_clientparticulier_lead,  this.addresse, this.ballon_thermo, this.cp, this.created_time, this.domaine_activite, this.email, this.etape, this.etat_install, this.etat_lead, this.etat_rdv, this.nbre_personne_foyer, this.nom, this.num_fisc, this.numero_dossier, this.precarite, this.prenom, this.proprietaire_ou_locataire, this.ref_avis_impot, this.statut_professionnel, this.systeme_chauffage_principal, this.telephone, this.type_de_logement, this.type_travaux, this.user_id_install, this.user_id_lead, this.user_id_rdv, this.ville, this.vmc2, this.zone, this.date_rdv, this.heure_rdv.toString(), this.type_notification, this.revenue_fiscal_reference, this.statut_marital,
    this.commentaire,
    this.statut_dossier,
    this.date_traitement,
    this.commentaire_confirmateur,
    this.projet,
    this.type_client,
    this.username_create,
    this.id_affected,
    this.username_affected , this.type_modele,)
      .then(async (res: Response) => {
        this.progresse = false;
        console.log(res);
        this.location.back();
        this.alert.onInfo('Opération réussit', 'Fiche client modifier avec succès.')
      }, err => {
        this.progresse = false;
        console.log(err)
      })
  }

  onClientUpdate_commercial() {
    this.etape = 'Rdv'
    if (this.etat_lead == "Devis signé/ A installer") {
      this.etat_lead = 'Nouveau';
      this.etape = 'Install'
    }
    this.progresse = true;
    this.onUpdate_Fiche_Techinique(this.id_clientparticulier_lead);
    this.onPostClients_Historique(); 
    this.agentService.onClientUpdate(this.id_clientparticulier_lead, this.addresse, this.ballon_thermo, this.cp, this.created_time, this.domaine_activite, this.email, this.etape, this.etat_install, this.etat_lead, this.etat_rdv, this.nbre_personne_foyer, this.nom, this.num_fisc, this.numero_dossier, this.precarite, this.prenom, this.proprietaire_ou_locataire, this.ref_avis_impot, this.statut_professionnel, this.systeme_chauffage_principal, this.telephone, this.type_de_logement, this.type_travaux, this.user_id_install, this.user_id_lead, this.user_id_rdv, this.ville, this.vmc2, this.zone, this.date_rdv, this.heure_rdv.toString(), this.type_notification, this.revenue_fiscal_reference, this.statut_marital, this.commentaire,
    this.statut_dossier,
    this.date_traitement,
    this.commentaire_confirmateur,
    this.projet,
    this.type_client,
    this.username_create,
    this.id_affected,
    this.username_affected, this.type_modele, )
      .then(async (res: Response) => {
        this.progresse = false;
        console.log(res);
        this.location.back();
        this.alert.onInfo('Opération réussit', 'Fiche client modifier avec succès.')
      }, err => {
        this.progresse = false;
        console.log(err)
      })
  }

  onClientUpdate_installation() {
    this.etape = 'Install'
    if (this.etat_lead == "Passé en confirmation") {
      // this.etape = 'Commercial'
    }
    this.progresse = true;
    this.onUpdate_Fiche_Techinique(this.id_clientparticulier_lead);
    this.onPostClients_Historique();
    // this.etat_lead = 'Nouveau';
    this.agentService.onClientUpdate(this.id_clientparticulier_lead, this.addresse, this.ballon_thermo, this.cp, this.created_time, this.domaine_activite, this.email, this.etape, this.etat_install, this.etat_lead, this.etat_rdv, this.nbre_personne_foyer, this.nom, this.num_fisc, this.numero_dossier, this.precarite, this.prenom, this.proprietaire_ou_locataire, this.ref_avis_impot, this.statut_professionnel, this.systeme_chauffage_principal, this.telephone, this.type_de_logement, this.type_travaux, this.user_id_install, this.user_id_lead, this.user_id_rdv, this.ville, this.vmc2, this.zone, this.date_rdv, this.heure_rdv.toString(), this.type_notification, this.revenue_fiscal_reference, this.statut_marital, this.commentaire,
    this.statut_dossier,
    this.date_traitement,
    this.commentaire_confirmateur,
    this.projet,
    this.type_client,
    this.username_create,
    this.id_affected,
    this.username_affected, this.type_modele, )
      .then(async (res: Response) => {
        this.progresse = false;
        console.log(res);
        this.location.back();
        this.alert.onInfo('Opération réussit', 'Fiche client modifier avec succès.')
      }, err => {
        this.progresse = false;
        console.log(err)
      })
  }


   //Variables ajoutées Début
   mail;
   identifiant_action_logement;  ref_dossier_CEE;  retour_rdv;  type_livraison;
   ref_virement_accompte;  designation;  ref_virement_logement;  ref_payement;
   ref_produit;  commentaire_finacement;
   onUpdate_Fiche_Techinique(id_clientparticulier_lead){     
     if(this.commentaire_finacement != null){this.commentaire_finacement = this.commentaire_finacement.toString();}
     this.agentService.onUpdate_Fiche_Chantier_Client(id_clientparticulier_lead, this.categorie_sociale,this. mode_chauffage,this.surface_chauffee,this.revenu_fiscal,
       this.nbre_foyers,this.nature_occupation, this.type_bien, this.salarie_prive, this.consommation_annuelle,
       this.credit_impot, this.credit_en_cours,this.adresse_chantier,this.complement_adresse,this.code_postal,    
       this.type_systeme,this.type_mat_demonte,this.hauteur_plafond,this.altitude,this.temp_moyenne_chauffage,
       this.combles_isoles,this.sous_sol_isole,this.annee_construction,this.vmc,this.nbre_chauffage,this.taille_chauffages,
       this.type_pompe,this.temp_sortie_chaudiere,this.epais_isolation_mur_ext,this.vitrage,this.tableau_electrique,
       this.paiement_comptant,this.montant_acompte, this.infos_paiement,  this.mail,
       this.identifiant_action_logement,  this.ref_dossier_CEE,  this.retour_rdv,  this.type_livraison,
       this.ref_virement_accompte,  this.designation,  this.ref_virement_logement,  this.ref_payement,
       this.ref_produit,  this.commentaire_finacement )
       .then(async (res: Response) => {
         console.log(id_clientparticulier_lead, this.categorie_sociale,this. mode_chauffage,this.surface_chauffee,this.revenu_fiscal,)
         console.log('DONNEED TECHNIQUES === ' + res);
         // this.alert.onInfo('Opération réussit', 'Fiche client modifier avec succès.')
       }, err => {
         console.log(err)
       })
   }


  // onUpdate_Fiche_Techinique() {
  //   console.log(this.menuiserie)
  //   if (this.menuiserie != null) { this.menuiserie = this.menuiserie.toString() }
  //   if (this.occultation != null) { this.occultation = this.occultation.toString() }
  //   if (this.mode_chauffage != null) { this.mode_chauffage = this.mode_chauffage.toString() }
  //   this.agentService.onUpdate_Fiche_Technique_Client(this.id_clientparticulier_lead, this.annee_construction, this.altitude,
  //     this.si_renove_annee, this.surface_habitable, this.hateur_sous_plafond_moyenne,
  //     this.mble_perdu_non_chauffe, this.combles_amenage, this.toit_terasse, this.mitoyennete,
  //     this.facade, this.orientation_porte_sortie, this.orientation_porte_entree, this.murs,
  //     this.autre_matiere, this.epaisseur_mur, this.mur_isole, this.mur_epaisseur_isolant, this.type_sol,
  //     this.sol_isole, this.sol_epaisseur_isolant, this.type_toit, this.toit_isole,
  //     this.toit_epaisseur_isolant, this.menuiserie, this.occultation, this.mode_chauffage,
  //     this.chauffage_annee, this.chauffage_nbre_radiateur, this.facture_annuelle, this.si_poele_a_bois,
  //     this.chauffage_facture, this.eau_chaude, this.ventillation, this.chauffage_autre, this.travaux_prevus, this.type_fenetre,
  //     this.compteur,
  //     this.temperature_chaudiere,
  //     this.matiere_sous_sol,
  //     this.qualite_sous_sol,
  //     this.distribution_chauffage,
  //     this.forme_generale,
  //     this.annee_vmc,
  //     this.nature_vmc)
  //     .then(async (res: Response) => {
  //       console.log('DONNEED TECHNIQUES === ' + res);
  //       // this.alert.onInfo('Opération réussit', 'Fiche client modifier avec succès.')
  //     }, err => {
  //       console.log(err)
  //     })
  // }


  onGetClients_Fiche(id_clientparticulier_lead) {
    console.log(this.id_clientparticulier_lead)
    this.agentService.onGet_FicheTechnique_des_clients(id_clientparticulier_lead).then(async (res: Response) => {

      let result = await res.json();
      this.datas_Fiche = result;
      this.id_clientparticulier_lead = this.datas_Fiche[0].id_clientparticulierLead
      this.categorie_sociale = this.datas_Fiche[0].categorie_sociale
      this.mode_chauffage = this.datas_Fiche[0].mode_chauffage
      this.commentaire_finacement = this.datas_Fiche[0].commentaire_finacement

      this.surface_chauffee = this.datas_Fiche[0].surface_chauffee
      this.revenu_fiscal = this.datas_Fiche[0].revenu_fiscal

      this.nbre_foyers = this.datas_Fiche[0].nbre_foyers

      this.nature_occupation = this.datas_Fiche[0].nature_occupation
      this.type_bien = this.datas_Fiche[0].type_bien
      this.salarie_prive = this.datas_Fiche[0].salarie_prive
      this.consommation_annuelle = this.datas_Fiche[0].consommation_annuelle

      this.credit_impot = this.datas_Fiche[0].credit_impot
      this.credit_en_cours = this.datas_Fiche[0].credit_en_cours
      this.adresse_chantier = this.datas_Fiche[0].adresse_chantier
      this.complement_adresse = this.datas_Fiche[0].complement_adresse

      this.code_postal = this.datas_Fiche[0].code_postal
      this.type_systeme = this.datas_Fiche[0].type_systeme
      this.type_mat_demonte = this.datas_Fiche[0].type_mat_demonte
      this.hauteur_plafond = this.datas_Fiche[0].hauteur_plafond
      this.altitude = this.datas_Fiche[0].altitude
      this.designation = this.datas_Fiche[0].designation
      this.ref_dossier_CEE = this.datas_Fiche[0].ref_dossier_CEE
      this.ref_payement = this.datas_Fiche[0].ref_payement

      this.temp_moyenne_chauffage = this.datas_Fiche[0].temp_moyenne_chauffage
      this.combles_isoles = this.datas_Fiche[0].combles_isoles
      this.sous_sol_isole = this.datas_Fiche[0].sous_sol_isole
      this.annee_construction = this.datas_Fiche[0].annee_construction

      this.vmc = this.datas_Fiche[0].vmc
      this.mail = this.datas_Fiche[0].mail
      this.nbre_chauffage = this.datas_Fiche[0].nbre_chauffage;
      this.taille_chauffages = this.datas_Fiche[0].taille_chauffages;
      this.type_pompe = this.datas_Fiche[0].type_pompe;

      this.temp_sortie_chaudiere = this.datas_Fiche[0].temp_sortie_chaudiere
      this.epais_isolation_mur_ext = this.datas_Fiche[0].epais_isolation_mur_ext
      this.vitrage = this.datas_Fiche[0].vitrage
      this.tableau_electrique = this.datas_Fiche[0].tableau_electrique

      this.paiement_comptant = this.datas_Fiche[0].paiement_comptant
      this.montant_acompte = this.datas_Fiche[0].montant_acompte
      this.infos_paiement = this.datas_Fiche[0].infos_paiement

      console.log(this.datas_Fiche)
      // console.log(this.menuiserie, this.mode_chauffage, this.occultation, stringo.split(', '));
    }, function (error) {
      error.message //=> String
      console.log(error)
    })
    // this.agentService.onFiche_test(id_clientparticulier_lead).subscribe((res) => {
    //   console.log(res)
    // }, err =>{
    //   console.log( 'gfufgytiyoiu '+err)
    // })
  }

  onPostClients_Historique() {
    let id_client = this.id_clientparticulier_lead;
    let user_id = localStorage.getItem('username');
    console.log(Date.now(), this.etat_lead, this.user_id_lead)
    this.agentService.onHistorique_Register(this.commentaire, Date.now(), this.etat_lead, id_client, user_id,).then(async (res) => {
      let result = await res.json();
      // this.datas_Fiche = result;
      console.log(res);
    }, function (error) {
      error.message //=> String
      console.log(error)
    })
  }

  onGetClients_Historique() {
    this.agentService.onHistorique_Get_List(this.id_clientparticulier_lead).then(async (res) => {
      let result = await res.json();
      this.data_historique = result;
      console.log(this.data_historique);
    }, function (error) {
      error.message //=> String
      console.log(error)
    })
  }

  // Character.deleteMany({ name: /Stark/, age: { $gte: 18 } });


  onPostClients_Commentaires() {
    if (this.commentaire == null) {
      this.alert.onInfo('Erreur !', 'Vous devez ecrire un commentaire.')
      return null;
    }
    this.progresse = true;
    this.agentService.onHistorique_Register(this.commentaire, Date.now(), this.etat_lead, this.id_clientparticulier_lead, localStorage.getItem('username'),).then(async (res) => {
      let result = await res.json();
      this.onGetClients_Historique();
      this.progresse = false;
      this.alert.onInfo('Succès !', 'Votre commentaire sur ce client à été enregistré avec succès.')
      this.commentaire = null
      console.log(res);
    }, function (error) {
      this.progresse = false;
      error.message //=> String
      console.log(error)
    })
  }

  onPostClients_Email_Send() {
    if (this.commentaire == null) {
      this.alert.onInfo('Erreur !', 'Vous devez ecrire le contenu du mail a envoyer.')
      return null;
    }
    this.progresse = true;
    this.agentService.onMail_SendTo_Client(this.email, this.commentaire).then(async (res) => {
      let result = await res;
      this.commentaire = null
      this.progresse = false;
      this.alert.onInfo('Succès !', 'Votre mail a été envoyer au client avec succès.')
      console.log(result);
    }, function (error) {
      this.progresse = false;
      error.message //=> String
      console.log(error)
    })
  }

  onDocuments_Upload(categorie) {
    if (this.files.length == 0) {
      this.alert.onInfo('Erreur !', 'Vous devez au moins un document à enregistrer.')
      return null;
    }
    if (this.files.length > 1) {
      this.alert.onInfo('Erreur !', 'Vous ne pouvez pas uploader plus de un document à la fois.')
      return null;
    }
    let cpt = 0;
    const formData = new FormData();
    for (var file of Array.from(this.files)) {
      formData.append("file", file,);
      formData.append('id_client_part', this.id_clientparticulier_lead.toString());
      formData.append('categorie', categorie)
      console.log(formData)
      this.progresse = true;
      this.agentService.onDocument_Upload_X(formData)
        .subscribe(res => {
          console.log(res);
          cpt = cpt + 1
          {
            this.progresse = false;
            let result = res;
            console.log(result);
            // this.onGet_list_Client_non_Affecter();
            this.alert.onInfo('Opération réussit', 'L\'enregistrement de ' + this.files.length + ' document(s) client à à été fait avec succès.')
            this.files = []
            console.log('oreation en cours')
            this.onDocument_Download_ALL();
            this.progresse = false;
          }

        }, function (error) {
          this.progresse = false;
          error.message //=> String
          this.alert.onInfo('Echec !', 'Une erreur c\'est produite, veuillez recommencer.')
        })
    }
  }

  onDocument_Download(data) {
    this.agentService.onDocument_Download_X(data.id).subscribe((res: Blob) => {
      let blob: any = new Blob([res], { type: data.fileType + '; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      window.location.href = url;
      // fileSaver.saveAs(blob, 'Capturejjjkkn.PNG');
      console.log(url)
    }, function (error) {
      error.message //=> String
      console.log('document téléchargé');
      console.log(error);
    })
  }

  onDocument_Download_All(data) {
    this.agentService.onDocument_Download_X(data.id).subscribe((res: Blob) => {
      let blob: any = new Blob([res], { type: data.fileType + '; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      //  window.location.href = url;
      fileSaver.saveAs(blob, data.fileName);
      console.log(url)
    }, function (error) {
      error.message //=> String
      console.log('document téléchargé');
      console.log(error);
    })

  }


  onDocument_Download_ALL() {
    console.log('docume ioiio ioi io i o i o iooiooioooo');
    this.agentService.onDocument_Download_ALL_DOCS(this.id_clientparticulier_lead).then(async (res: Response) => {
      // let blob:any = new Blob([res.url], { type: 'text/json; charset=utf-8' });
      // const url = window.URL.createObjectURL(blob);
      // window.open(url);
      //  window.location.href = res.url;
      // fileSaver.saveAs(blob, 'employees.json');
      let result = await res.json();
      this.documents_Data = result;
      //   this.documents_Data_X = [];
      // for(var i= 0 ; i < this.documents_Data.length ; i++ ){
      //   let objectURL = 'data:image/jpeg;base64,' + this.documents_Data[i].data;
      //   this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      //   this.documents_Data_X.push(this.thumbnail)
      //   console.log(i)
      // }
      console.log(this.documents_Data);
      console.log(res)
    }, function (error) {
      error.message //=> String
      console.log('document téléchargé');
      console.log(error);
    })

  }


  onMail_Send() {
    this.agentService.onMail_SendTo_Client(this.email, this.mailMessage).then(async (res) => {
      let result = await res;
      console.log(result);
    }, function (error) {
      error.message //=> String
      console.log(error)
    })
  }


  onRendez_vous_post() {
    if (this.date_rdv == null || this.heure_rdv == null || this.motif_rendezVous == null) {
      this.alert.onInfo('Erreur !', 'Vous devez au renseigner la date et l\'heure du rendez-vous.')
      return null;
    }
    this.agentService.onRende_vous_post(this.date_rdv, this.heure_rdv, this.motif_rendezVous, this.lieu_rendezVous, localStorage.getItem('username'), this.id_clientparticulier_lead, localStorage.getItem('prenom'),localStorage.getItem('nom'), this.email, this.nom).then(async (res) => {
      let result = await res;
      this.onGet_list_RendezVous();
      this.alert.onInfo('Enregistrement réussit', 'Votre rendez est bien pris en compte.')
      console.log(result);
    }, function (error) {
      error.message //=> String
      console.log(error)
    })
  }

  onZone_Seach() {
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


  onAgent_Registration(){
    
  }

  onGet_list_produits() {
    this.serviceAdmin.onGet_liste_des_produits().then(async (res) => {
      let result = await res.json();  
      this.data_devis = result;
      this.filteredList2 = this.data_devis.slice();
      console.log(this.datas);
    }, function (error) {
      error.message //=> 
      console.log(error)
    })
  }

  onGet_list_agent_affecter() {
    this.serviceAdmin.onGet_liste_des_agent_affecter(this.id_clientparticulier_lead).then(async (res) => {
      let result = await res.json();
      this.data_list_agent_affecter = result;
      console.log(this.data_list_agent_affecter);
    }, function (error) {
      error.message //=> 
      console.log(error)
    })
  }    

  onGet_Delete_Client_affecter(data){
    this.serviceAdmin.onDelete_clients_affecter(data.id).then(async (res) => {
       this.alert.onInfo('Supression réussit', 'L\'affectation a été suprimé avec succès.')
       this.onGet_list_agent_affecter();
       console.log(res.body);
     }, function (error) {
       error.message //=> String
       this.alert.onInfo('Echec', 'Une erreur c\'est produit durant l\opération.')
       console.log(error)
     })
   }

   onGet_Delete_Client_RendezVous(data){
    this.serviceAdmin.onDelete_clients_RendezVous(data.id).then(async (res) => {
       this.alert.onInfo('Supression réussit', 'L\'affectation a été suprimé avec succès.')
       this.onGet_list_RendezVous();
       console.log(res.body);
     }, function (error) {
       error.message //=> String
       this.alert.onInfo('Echec', 'Une erreur c\'est produit durant l\opération.')
       console.log(error)
     })
   }

 

  onDevis_Generate(code){ 
    let message;
    let titre; 

    if(code == 'facture'){
      titre = 'Facture';
      message = '';
    }else{
      titre = 'Devis';
      message = this.pdf.condition_vente;
    }

    if(this.devis_numero == null || this.adresse_chantier == null || this.nbre_personne_foyer == null || this.date_devis_end == null || this.precarite == null ){
      this.alert.onInfo('Erreur', 'Un ou plusieurs champs sont vides.');
      return null;
    }
 
    let datas_devis_tableau_recap = [
      [{text: 'TOTAL HT', italics: false,fontSize:10 }, {text: this.sous_total +' €', color: 'blue',fontSize:10},],
      [{text: 'TOTAL TVA', italics: false,fontSize:10}, {text: this.tva_total +' €', color: 'blue',fontSize:10},],
      [{text: 'TOTAL TTC', italics: false,fontSize:10, fillColor: '#dddddd'}, {text: this.total_devis +' €', color: 'blue',fontSize:10},],    
    ]

    let therme = ''    
    let compt = false;

    for(var i = 0; i < this.data_devis_push.length; i++ ){
      console.log('HUMMMM GRAOS DEVIS')
      if( i > (this.data_devis_push.length -2)){
        compt = true
       }
      let devis_donnee =  [ {  border: [true, false, true, compt],  text: this.data_devis_push[i].description+'\n`',  style: ['quote', 'small']}  , {  border: [true, false, true, compt], text: this.data_devis_push[i].qte, italics: false,fontSize: 10},  {  border: [true, false, true, compt], text: this.data_devis_push[i].tva + '%', italics: false,fontSize: 10, color: 'grey'},{  border: [true, false, true, compt], text: this.data_devis_push[i].prix_vente_ref +' €', italics: false,fontSize: 10},{  border: [true, false, true, compt], text: this.data_devis_push[i].prix_ht +' €', italics: false,fontSize: 10},{ border: [true, false, true, compt], text: this.data_devis_push[i].prix_revient +' €', color: 'blue',italics: false,fontSize: 10},];
      this.Datas_devis_tableau.push(devis_donnee);     
    }

    for(var i = 0; i < this.aides_devis_data.length; i++ ){
        let aideData =  [{text: this.aides_devis_data[i].nom, italics: false, fontSize:10}, {text: this.aides_devis_data[i].montant +' €', color: 'blue', fontSize:10}, ];
        datas_devis_tableau_recap.push(aideData)

        if( i >=  this.aides_devis_data.length - 1 ){
          let resteCharge =  [{text: 'Reste à charge', italics: false, fontSize:11, fillColor: '#dddddd'}, {text: this.reste_a_charge +' €', color: 'blue', fontSize:11, fillColor: '#dddddd'},];
          datas_devis_tableau_recap.push(resteCharge)
        }
      }

      for(var i = 0; i < this.aides_devis_data.length; i++ ){      
        therme = therme + '\n\n' + '- ' + this.aides_devis_data[i].description +' '+ this.aides_devis_data[i].montant +' €'      
     }


    let docDefinition = {  
      // header: 'C#Corner PDF Header', 
     content: [
      
        {
          
        },
        {
          columns: [
               { width: '*',
                table: {
                body: [
                  [{border: [false, false, false, false],
                    image: this.pdf.logo, 
                    width: 150,
                    height: 90,
                    style: 'logo',
                  },],
                  [ { border: [false, false, false, false],             
                    text: '\nAdresse du chantier: '+ this.adresse_chantier +'\n Commercial: '+ this.commercial_user + '\n Nombre de personne à charge: '+ this.nbre_personne_foyer +'\n Statut du ménage Grand Précaire: '+this.precarite,
                    style: 'subheader',
                    marginBottom: 30,
                    color: 'black'
                  },]
                ]
              }
             
            },
            {	width: 120,
              text: '`' 
            },
            { width: '*',
              text: [{text: titre +' N°: '+ this.devis_numero +' \n ID Client: '+this.id_clientparticulier_lead +'\n Date de devis: '+ this.date_devis_start +'\n Devis valable jusqu\'au: ' + this.date_devis_end, fontSize:10},
                {text: '\n\n'+ this.nom +' '+this.prenom, fontSize: 16, underline:true, bold: true},               
                {text: '\n\n'+this.addresse + '\n' +this.cp+ '\n'+this.telephone +'\n'+ this.email + '\n\n', fontSize: 10,  marginBottom: 9,fontWeight: 200},
              ]
            },
          ]
        },
        
        {
          style: 'tableExample', marginBottom:40,
          table: {	widths: ['*', 30, 35,75,50,55],         
           body: this.Datas_devis_tableau        
          }
        },
        {	
          text: 'Termes et conditions '
        },

        {
          text: therme + '\n\n\n.',
          style: ['quote', 'small'],
        },

        {
          columns: [          
            {	width: '*',
            text: "Date de visite préalable le "+this.date_traitement+"\nApposer date et signature, précédées de la mention ' bon pour accord '\n\n\n\n\n\n Le:................................",         
            marginBottom: 20,
            color: 'grey',
            style: 'subheader',
                  
          },
          {	width: 20,
            text: '`'
          },
            {	width: 250,                       
              style: 'tableExample', marginBottom:30,
              table: {	widths: [110, 110,], 
                body: datas_devis_tableau_recap,
                headlineLevel: 1
              }          
            },
          ],
          //headlineLevel: 1
        },


        {	
          text: message,
          italics: false,fontSize: 11,
          headlineLevel: 1
        },
  

      ],

     // footer: function(currentPage, pageCount) { return { text: 'PROTHERMO: SAS au Capital: 20 000 Euros. Agence Rhone : 1 Place Louis Braille 69300 Caluire-Et-Cuire R.C.S Lyon N° SIREN : 851 837 427 - Siret : 851 837 427 000 26- N° TVA FR54 851837427- N° Vert : 0800 15 75 15 - Email : contact@prothermo.fr', alignment: 'center' , color: 'grey', fontSize:8, margin: [ 25, 10, 25, 10 ]} }, 
      
      
      styles: {
        header: {
          fontSize: 10,
          bold: true
        },
        subheader: {
          fontSize: 10,
          bold: false
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        },
        logo:{
          marginBottom: 15
        },

        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'black'
        }
      },

      pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
        return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
     }
      
    };    
        pdfMake.createPdf(docDefinition).open();
    //  pdfMake.createPDF(docDefinition).download();
    //  pdfMake.createPDF(docDefinition).print();
     this.Datas_devis_tableau = [ [{text: 'Description', style: 'tableHeader' , fillColor: '#dddddd'}, {text: 'Qté', style: 'tableHeader' , fillColor: '#dddddd'},  {text: 'TVA', style: 'tableHeader' , fillColor: '#dddddd'}, {text: 'Prix unitaire HT', style: 'tableHeader' , fillColor: '#dddddd'}, {text: 'Prix HT', style: 'tableHeader' , fillColor: '#dddddd'},{text: 'Prix TTC', style: 'tableHeader' , fillColor: '#dddddd'},] ]
 
  }


  onGet_list_aides() {
    this.serviceAdmin.onGet_liste_des_aides().then(async (res) => {
      let result = await res.json();
      this.datas_aide = result;
      console.log(this.datas);

    }, function (error) {
      error.message //=> 
      console.log(error)
    })
  }

  onGet_list_RendezVous() {
    this.serviceAdmin.onGet_liste_des_RendezVous(this.id_clientparticulier_lead).then(async (res) => {
      let result = await res.json();
      this.datas_rendezVous = result;
      console.log(this.datas_rendezVous);

    }, function (error) {
      error.message //=> 
      console.log(error)
    })
  }

  onProduits_selection(data){
    let prix_revient = 0
     prix_revient = ((data.prix_vente_ref * data.tva)/100) + data.prix_vente_ref
    let tva_c = (data.prix_vente_ref * data.tva)/100
     data.prix_revient = +prix_revient.toFixed(2) ;
     data.tva_c = tva_c     
     data.qte = 1
     data.prix_ht = +(data.prix_vente_ref * data.qte).toFixed(2)

     this.data_devis_push.push(data);
     let sous_totalF = 0;
     let tva_totalF = 0
     let total_devisF = 0;

     for(var i = 0; i < this.data_devis_push.length; i++ ){
      sous_totalF = sous_totalF + this.data_devis_push[i].prix_ht
      this.sous_total = +sous_totalF.toFixed(2);

      tva_totalF = tva_totalF + this.data_devis_push[i].tva_c
      this.tva_total = +tva_totalF.toFixed(2);

      total_devisF = total_devisF + this.data_devis_push[i].prix_revient;
      this.total_devis = +total_devisF.toFixed(2)
     }
    
    //  this.sous_total.toFixed(2)
    //  this.tva_total = this.tva_total + data.tva_c
    //  this.total_devis = this.total_devis + data.prix_revient
     // this.total_devis.toFixed(2)
     this.onDevi_Total()
     if(this.data_devis_push.length > 0 ){
      this.data_devis_statut = true
     }
     this.devis_produit = null     
     console.log(this.data_devis_push, this.total_devis);
     this.filteredList2 = this.data_devis.slice();
  }

  


  onAide_selection(data){
    this.montant_prime = 0;
    if(this.aides_devis.length > this.aides_devis_data.length ){
      this.aides_devis_data.push(data)
    }
    if(this.aides_devis.length < this.aides_devis_data.length ){
      this.aides_devis_data = [];
      this.aides_devis = [];
    }
    for(var i = 0; i < this.aides_devis_data.length; i++ ){
      if(this.aides_devis_data[i].type_aide == "D"){
        this.montant_prime = this.montant_prime + this.aides_devis_data[i].montant 
        }
      }
    this.aide_description = data.description
    //this.montant_prime = data.montant
    this.aide_nom = data.nom

    // let jsonarray = []
    // for(var i = 0; i < this.aides_devis.length; i++ ){
    //  // this.montant_prime = this.aides_devis[i].montant  
    //   let json = JSON.parse(this.aides_devis[i])
    //   jsonarray.push(json)
    //   console.log(jsonarray);  
    //   }   
    this.onDevi_Total()
  }

  onAideChange(){
    this.montant_prime = 0
    for(var i = 0; i < this.aides_devis_data.length; i++ ){
      if(this.aides_devis_data[i].type_aide == "D"){
        this.montant_prime = this.montant_prime + this.aides_devis_data[i].montant 
        }
      }
      this.onDevi_Total();
  }

  onDevi_Total(){
    console.log('EUAZEI IOIO IEOEIE')
     let reste_a_chargeF:number = 0;
     reste_a_chargeF = this.total_devis - (this.montant_prime)
     this.reste_a_charge = +(reste_a_chargeF).toFixed(2)
  }


  onNgChange(data){
    console.log(data)
 
    //  let tva_totalF =  data.tva_c
    //  this.tva_total = tva_totalF.toFixed(2)
    //  let sous_totalF = data.prix_ht  
    //  this.sous_total = sous_totalF.toFixed(2)
    //  let total_devisF = data.prix_revient
    //  this.total_devis = total_devisF.toFixed(2)

    let prix_revient = ((data.prix_vente_ref * data.tva)/100) + data.prix_vente_ref
    let tva_c = (data.prix_vente_ref * data.tva)/100
     data.prix_revient = +prix_revient.toFixed(2) ;
     data.tva_c = tva_c     
     data.prix_ht = data.prix_vente_ref * data.qte
     //  data.prix_ht = data.prix_vente_ref * data.qte
     data.prix_revient = (data.prix_vente_ref + data.tva_c) * data.qte;
     data.prix_revient = +prix_revient * data.qte;
     data.prix_revient = +data.prix_revient.toFixed(2);
     data.prix_ht = +data.prix_ht.toFixed(2)

     let sous_totalF:number = 0;
     let tva_totalF:number = 0
     let total_devisF:number = 0;

     for(var i = 0; i < this.data_devis_push.length; i++ ){
      sous_totalF = sous_totalF + this.data_devis_push[i].prix_ht
      this.sous_total = +sous_totalF.toFixed(2);

      tva_totalF = tva_totalF + (this.data_devis_push[i].tva_c * this.data_devis_push[i].qte)
      this.tva_total = +tva_totalF.toFixed(2);

      total_devisF = total_devisF + this.data_devis_push[i].prix_revient;
      this.total_devis = +total_devisF.toFixed(2);
     }

     this.onDevi_Total();
  }


  onDevis_Generate_annuler(){
    this.data_devis_statut = false
    this.data_devis_push = [];
    this.Datas_devis_tableau  = [ [{text: 'Description', style: 'tableHeader' , fillColor: '#dddddd'}, {text: 'Qté', style: 'tableHeader' , fillColor: '#dddddd'},  {text: 'TVA', style: 'tableHeader' , fillColor: '#dddddd'}, {text: 'Prix unitaire HT', style: 'tableHeader' , fillColor: '#dddddd'}, {text: 'Prix HT', style: 'tableHeader' , fillColor: '#dddddd'},{text: 'Prix TTC', style: 'tableHeader' , fillColor: '#dddddd'},] ]
    this.tva_total =  0
    this.sous_total = 0
    this.total_devis = 0
    this.montant_prime = 0
    this.reste_a_charge = 0
    this.devis_produit = null;
    this.aides_devis_data = [];
    this.aides_devis = [];
  }   
 

  onDelet_Produit_Devis(data){
  for(var i = 0; i < this.data_devis_push.length; i++ ){
    if(this.data_devis_push[i].commentaire == data.commentaire ){
      this.data_devis_push.splice(i,1);
    }
   }
   
   let sous_totalF:number = 0;
   let tva_totalF:number = 0;
   let total_devisF:number = 0;

   for(var i = 0; i < this.data_devis_push.length; i++ ){
     sous_totalF = sous_totalF + this.data_devis_push[i].prix_ht
     this.sous_total = +sous_totalF.toFixed(2);
     tva_totalF = tva_totalF + (this.data_devis_push[i].tva_c * this.data_devis_push[i].qte)
     this.tva_total = +tva_totalF.toFixed(2); 
     total_devisF = total_devisF + this.data_devis_push[i].prix_revient;
     this.total_devis = +total_devisF.toFixed(2)
    }

    this.onDevi_Total()
   if(this.data_devis_push.length == 0 ){
    this.data_devis_statut = false
   }
  }
    
  onGet_Listes_Infos_Fisales(id_clientparticulier_lead) {
    this.agentService.onGet_Infos_Fiscales(id_clientparticulier_lead).then(async (res) => {
      let result = await res.json();
      console.log("MEISSA tOUNCRA");
      console.log(result)
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort

    }, function (error) {
      error.message //=> 
      console.log(error)
    })
  }

  onGet_Delete_Infos_Fiscales(id){
    this.agentService.onDelete_Infos_Fiscal(id).then(async (res) => {
      this.alert.onInfo('Supression réussit', 'Infos Fiscales  suprimées avec succès.')
      this.onGet_Listes_Infos_Fisales(this.id_clientparticulier_lead);
      console.log(res.body);
    }, function (error) {
      error.message //=> String
      this.alert.onInfo('Echec', 'Une erreur c\'est produit durant l\opération.')
      console.log(error)
    })
  }

 


}
