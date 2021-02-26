import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIServiceService } from 'src/app/Services/api/api-service.service';
import { ApiAgentService } from 'src/app/Services/api_agent/api-agent.service';

@Component({
  selector: 'app-statut-installation',
  templateUrl: './statut-installation.component.html',
  styleUrls: ['./statut-installation.component.css']
})
export class StatutInstallationComponent implements OnInit {
  
  //Datable avec td début
  dtOptions;
  
  
  //sleep fin
  ngOnInit(){
    this.onGetClients_installation();
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
  actionControl = localStorage.getItem('username')

  constructor(public http: APIServiceService, 
      public route: Router,
      public routeCon: ActivatedRoute,
      public agentService: ApiAgentService,  ) { }
     
     
    

  


  onFechtDatas() {
    this.http.onJSONplaceHolder().subscribe((res: any) => {
      this.datas = res;
    }, (error: any) => {
    })
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(AjoutClientComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

    onSuprimmer(){
      alert('Fiche client suprimmée.')
    }
    onEditFiche(data){
      localStorage.setItem('fiche', 'installation');
      setTimeout(()=>{
        this.route.navigate(['modifier_fiche_client', data])
      },500)
    }

    onGetClients_installation() {
      this.agentService.onGet_liste_des_clientsParticulier_installation(localStorage.getItem('user_id')).then(async (res) => {
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
}
