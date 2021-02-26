import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';
import { ApiAdministrationService } from 'src/app/Services/api_administration/api-administration.service';

@Component({
  selector: 'app-detail-agent',
  templateUrl: './detail-agent.component.html',
  styleUrls: ['./detail-agent.component.css']
})
export class DetailAgentComponent implements OnInit {


  data_etape = [
    {id:1, nom:"Prise de Rendez-vous"},
    {id:2, nom:"Envoyer le dossier à AMO"},
    {id:3, nom:"Etat du rendez-vous"},
    {id:4, nom:"Livraison pompe à chaleur"},
    {id:5, nom:"Etat du dossier"},
    {id:6, nom:"Accompte action logement"},
    {id:7, nom:"Commande fournisseur"},
    {id:8, nom:"Choix installateur"},
    {id:9, nom:"En attente d'installation"},
    {id:10, nom:"Dossier CEE validé"},
    {id:11, nom:"Installation"},
    {id:12, nom:"Mise en service effectuée "},
    {id:13, nom:"Action paiement final "},
    {id:14, nom:"Dossier CEE payé"},


    {id:15, nom:"Validation du lead en reste à charge"},
    {id:16, nom:"Financement "},
    
  ]

  
  id;
  nom;
  prenom;
  email;
  //login;
  password;
  poste
  adresse
  telephone
  //id_responsable;
  equipe;
  fonction
  username;
  progresse: boolean = false;
  role: string[];
  pha: any;
  agentDatas: any;
  roles: string = "agent";
  datas_affectation: any[];


  constructor(public serviceAdmin: ApiAdministrationService, public route: Router, public activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public alert: POPUPServiceService,
    private location: Location, ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      //this.agentDatas = data;
      console.log(data);
    this.id =data.id;
    this.nom=data.nom
    this.prenom=data.prenom ;
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.poste=data.poste;
    this.equipe = data.equipe;
    this.adresse = data.adresse;
    this.telephone = data.telephone;
    this.fonction = data.fonction;
    this.username= data.username;
    this.role = data.roles[0].name;


    this.onGet_list_Etape();
    });
    
   
  }
  


  goBack() {
    this.location.back();
  }


  onAgent_Update() {
    this.progresse = true;
    this.role = [this.roles]
    console.log(this.role);
    this.serviceAdmin.onAgent_Update(this.id, this.nom,this.prenom,this.telephone,this.poste,this.adresse,this.fonction,this.username, this.email, this.password,  this.equipe,this.role)
      .then(async (res: Response) => {
        this.progresse = false;
        let result = await res
        
        console.log(result);
      // console.log("***"+this.roles);
      // this.onCloseDialog();
        this.location.back();
        this.alert.onInfo('Opération réussit', 'Agent enregistré avec succès.')

      }, err => {
        this.progresse = false;
        console.log(err)
      })

  }

  //onCloseDialog() { this.dialog.closeAll(); }

  onEditInfo(){
    this.alert.onInfo('Opération réussit', 'Agent enregistrer avec succès.')
  }


  onGet_list_Etape(){
    this.serviceAdmin.onGet_liste_des_etape(this.id).then(async (res) => {
      let result = await res.json();
      this.datas_affectation = result;
      console.log(this.datas_affectation);
    }, function (error) {
      error.message //=> String
      console.log(error)
    })
  }

  onGetDeleteEtape(data){
    this.serviceAdmin.onDelete_Agent(data.id).then(async (res) => {
       this.alert.onInfo('Supression réussit', 'Cette etape a été suprimé avec succès.')
       this.onGet_list_Etape();
       console.log(res.body);
     }, function (error) {
       error.message //=> String
       console.log(error)
     })
   }


   onAffectation_etape(data) {
    this.progresse = true;
     let id ='prothermo'; 
     this.serviceAdmin.onAffectation_etape(  id,  this.id,  this.username,  data.nom)
       .then(async (res: Response) => {
           this.progresse = false;
           let result = res;
           this.onGet_list_Etape();
           console.log(result); 
           this.alert.onInfo('Opération réussit', 'L\'affectation de l\'etape à cet agent à été faite avec succès.')
       }, err => {
         this.progresse = false;
         console.log(err)
         return;
       })
   }


   
}




