import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { isThursday } from 'date-fns';
import { APIServiceService } from 'src/app/Services/api/api-service.service';
import { ApiAdministrationService } from 'src/app/Services/api_administration/api-administration.service';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  
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



  @ViewChild(MatPaginator) paginator: MatPaginator;
  datas: any[];

  constructor(public http: APIServiceService, public alert: POPUPServiceService, public serviceAdmin: ApiAdministrationService, public dialog: MatDialog, public route: Router, public routeCon: ActivatedRoute) {
    this.onGet_list_produits()
  }

  ngAfterViewInit() {
  }

  onFechtDatas() {
    this.http.onJSONplaceHolder().subscribe((res: any) => {
      this.datas = res;
    }, (error: any) => {
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AjoutProduitsComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.onGet_list_produits();
      console.log(`Dialog result: ${result}`);
      this.onReload();
    });
  }

  onSuprimmer() {
    alert('Fiche client suprimmée.')
  }

  onEditFiche() {
    // setTimeout(() => {
    //   this.route.navigateByUrl('modifier_fiche_client', { relativeTo: this.routeCon })
    // }, 500)
  }

  onGet_list_produits() {
    this.serviceAdmin.onGet_liste_des_produits().then(async (res) => {

      let result = await res.json();
      this.datas = result;
      console.log(this.datas);

    }, function (error) {
      error.message //=> 
      console.log(error)
    })
  }

  onGet_Delete_Produit(data){
    this.serviceAdmin.onDelete_Produit(data.id_produit).then(async (res) => {
       this.alert.onInfo('Supression réussit', 'Le produit a été suprimé avec succès.')
       this.onGet_list_produits();
       console.log(res.body);
       this.onReload();
     }, function (error) {
       error.message //=> String
       this.alert.onInfo('Echec', 'Une erreur c\'est produit durant l\opération.')
       console.log(error)
     })
   }



   onDetail_Produit(data) {
     setTimeout(() => {
      this.route.navigate(['detail_produit', data])
     }, 500);
   
  }




}



//////////////////   DIALOG AJOUT DE PRODUITS  ///////////////////////////////////////

@Component({
  selector: 'app-ajout-produits',
  templateUrl: './ajout-produits/ajout-produits.component.html',
  styleUrls: ['./ajout-produits/ajout-produits.component.css']
})
export class AjoutProduitsComponent implements OnInit {

  id_produit
  nom
  description
  reference
  marque
  categorie
  commentaire
  prix_achat
  prix_vente_ref
  piece_jointe
  id_client_pro
  id_client_part
  prix_ttc
  tva
  progresse: boolean;
  pha: [ReadableStream<Uint8Array>, ReadableStream<Uint8Array>];
  documents_Data: any[];

  constructor(public serviceAdmin: ApiAdministrationService, public alert: POPUPServiceService, public dialog: MatDialog,) { }


  ngOnInit(): void {
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


  onProduit_Registration() {
    if(this.nom == null || this.description == null || this.reference == null || this.marque == null || this.prix_achat == null || this.prix_vente_ref == null || this.tva == null ){
      this.alert.onInfo('Erreur', 'Un ou plusieurs champs sont vides.');
      return null;
    }
    if (this.files.length > 1) {
      this.alert.onInfo('Erreur !', 'Vous ne pouvez pas uploader plus de un document à la fois.')
      return null;
    }

   // this.onDocuments_Upload();

    this.progresse = true;
    this.serviceAdmin.onProduit_Register(
      this.nom,
      this.description,
      this.reference,
      this.marque,
      this.categorie,
      this.commentaire,
      this.prix_achat,
      this.prix_vente_ref,
      this.id_client_part,
      this.tva,
      this.prix_ttc
      
     )
      .then(async (res: Response) => {
        this.progresse = false;
        let result = await res.body;
        // this.pha = result;
        console.log(res.body);
        this.onCloseDialog();
        this.alert.onInfo('Opération réussit', 'Produit enregistré avec succès.')

      }, err => {
        this.progresse = false;
        this.alert.onInfo('Echec', 'Une erreur c\'est produite durant l\'opération.')
        console.log(err)
      })

  }

  onCloseDialog() { this.dialog.closeAll(); }

  onDocuments_Upload() {
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
      formData.append('id_produit', this.id_produit.toString());
        // formData.append('categorie', categorie)
      console.log(formData)
      this.progresse = true;   
      this.serviceAdmin.onDocument_Upload_X(formData)
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
           // this.onDocument_Download_ALL();
            this.progresse = false;
          }

        }, function (error) {
          this.progresse = false;
          error.message //=> String
          this.alert.onInfo('Echec !', 'Une erreur c\'est produite, veuillez recommencer.')
        })
    }
  }


  // onDocument_Download(data) {
  //   this.agentService.onDocument_Download_X(data.id).subscribe((res: Blob) => {
  //     let blob: any = new Blob([res], { type: data.fileType + '; charset=utf-8' });
  //     const url = window.URL.createObjectURL(blob);
  //     // window.open(url);
  //     window.location.href = url;
  //     // fileSaver.saveAs(blob, 'Capturejjjkkn.PNG');
  //     console.log(url)
  //   }, function (error) {
  //     error.message //=> String
  //     console.log('document téléchargé');
  //     console.log(error);
  //   })
  // }

  



}
