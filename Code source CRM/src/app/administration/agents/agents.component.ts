import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { APIServiceService } from 'src/app/Services/api/api-service.service';
import { ApiAdministrationService } from 'src/app/Services/api_administration/api-administration.service';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  datas: any[];

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

  constructor( public serviceAdmin: ApiAdministrationService, public alert: POPUPServiceService, public dialog: MatDialog, public route: Router, public routeCon: ActivatedRoute) {
   // this.onFechtDatas()
   this.onGet_list_Agents()
  }

  ngAfterViewInit() {
  }


  openDialog() {
    const dialogRef = this.dialog.open(AjoutAgentsComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.onGet_list_Agents();
      this.onReload();
      console.log(`Dialog result: ${result}`);
    });
  }

  onSuprimmer() {
    alert('Fiche client suprimmée.')
  }

  onEditFiche(data) {
    // console.log(' IUSE EZIKZEIKEFZIHJFE ERIOIOOIOEOIRZOEII O O I OO OI ')
    // localStorage.setItem('fiche', 'lead');
    setTimeout(() => {
      this.route.navigate(['detail_agent',data])
    }, 500)
  }

  onGet_list_Agents(){
    this.serviceAdmin.onGet_liste_des_agents().then(async (res) => {

      let result = await res.json();
      this.datas = result;
      console.log(this.datas);

    }, function (error) {
      error.message //=> String
      console.log(error)
    })
  }

  onGetDeleteAgent(data){
    this.serviceAdmin.onDelete_Agent(data.id_agent).then(async (res) => {
       this.alert.onInfo('Supression réussit', 'Cette agent a été suprimé avec succès.')
       this.onGet_list_Agents()
       console.log(res.body);
       this.onReload();
     }, function (error) {
       error.message //=> String
       console.log(error)
     })
   }
   onAgent_delete(id){
    this.serviceAdmin.onDelete_Agent(id)
      .then(async (res: Response) => {
        //this.progresse = false;
        let result = await res.body.tee();
        this.onGet_list_Agents()
        //this.pha = result;
        //console.log(this.pha);
      //  console.log("***"+this.roles);

        //this.onCloseDialog();
        this.alert.onInfo('Supression réussit', 'Cette agent a été suprimé avec succès.')
        this.onReload();

      }, err => {
        //this.progresse = fa lse;
        console.log(err)
      })
  }
  




}



@Component({
  selector: 'app-ajout-agents',
  templateUrl: './ajout-agents/ajout-agents.component.html',
  styleUrls: ['./ajout-agents/ajout-agents.component.css']
})
export class AjoutAgentsComponent implements OnInit {

    id;
    nom;
    prenom;
    email;
    username;
    password;
    poste;
    equipe;
    adresse;
    telephone;
    fonction;
    roles = 'agent';
    role: string[];
    //role: string ='admin';
    progresse: boolean = false;

   pha: any;
   agentDatas: any[]
  login: any;
  id_responsable: any;
  mdp: any;

  constructor(public serviceAdmin: ApiAdministrationService, public alert: POPUPServiceService, public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  onAgent_Registration() {
    if(this.nom == null || this.prenom == null || this.adresse == null || this.email == null || this.telephone == null || this.username == null || this.password == null || this.roles == null  ){
      this.alert.onInfo('Erreur', 'Un ou plusieurs champs sont vides.');
      return null;
    }
    this.progresse = true; 
    this.role=[this.roles];
    console.log(this.role);
    this.serviceAdmin.onAgent_Registration( this.id,  this.nom,  this.prenom,  this.adresse,  this.username,  this.equipe,
      this.email,  this.password,  this.telephone,  this.poste,  this.fonction, this.role)
      .then(async (res: Response) => {
        this.progresse = false;
        let result = await res.body.tee();
        this.pha = result;
        console.log(this.pha);
      //  console.log("***"+this.roles);

        this.onCloseDialog();
        this.alert.onInfo('Opération réussit', 'Agent enregistré avec succès.')

      }, err => {
        this.progresse = false;
        console.log(err)
      })

  }
  
  
  onCloseDialog() { this.dialog.closeAll(); }

 

}
