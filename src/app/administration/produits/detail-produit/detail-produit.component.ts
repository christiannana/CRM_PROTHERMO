import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';
import { ApiAdministrationService } from 'src/app/Services/api_administration/api-administration.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {


  title = 'dropzone';
  // file: File

  files: File[] = [];

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

  progresse: boolean = false;
  documents_Data: any[];

  constructor( public route: Router,
     public activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public serviceAdmin: ApiAdministrationService,
    public alert: POPUPServiceService,
    private location: Location, ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((data) => {
     
      console.log(data)
 
      this.id_produit = data.id_produit;
      this.nom = data.nom;
      this.description = data.description;
      this.reference = data.reference;
      this.marque = data.marque;
      this.categorie = data.categorie;
      this.commentaire = data.commentaire
      this.prix_achat = data.prix_achat
      this.prix_vente_ref = data.prix_vente_ref
      this.piece_jointe = data.piece_jointe 
      

      this.onDocument_Download_ALL();
     });

  }

  goBack() {
    this.location.back();
  }


  onProduit_Update() {
    this.onDocuments_Upload();

    this.progresse = true;

    this.serviceAdmin.onProduit_Update(this.id_produit,
      this.nom,
      this.description,
      this.reference,
      this.marque,
      this.categorie,
      this.commentaire,
      this.prix_achat,
      this.prix_vente_ref,
      this.piece_jointe,
      this.id_client_pro,
      this.id_client_part,)
      .then(async (res: Response) => {
        this.progresse = false;
        let result = await res
        
        console.log(result);
      // console.log("***"+this.roles);
      // this.onCloseDialog();
        this.location.back();
        this.alert.onInfo('Opération réussit', 'la mise ajout du produit a été enregistré avec succès.')

      }, err => {
        this.progresse = false;
        console.log(err)
      })

  }

  
  onDocument_Download_ALL() {
    this.progresse = true;
    console.log('docume ioiio ioi io i o i o iooiooioooo');
    this.serviceAdmin.onDocument_Download_ALL_DOCS(this.id_produit).then(async (res: Response) => {
      this.progresse = false;
      let result = await res.json();
      this.documents_Data = result;
     
      console.log(this.documents_Data);
      console.log(res)
    }, function (error) {
      this.progresse = false;
      error.message //=> String
      console.log('document téléchargé');
      console.log(error);
    })

  }

  onDocument_Download_All(data) {
    this.progresse = true;
    this.serviceAdmin.onDocument_Download_X(data.id).subscribe((res: Blob) => {
      this.progresse = false;
      let blob: any = new Blob([res], { type: data.fileType + '; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      //  window.location.href = url;
      fileSaver.saveAs(blob, data.fileName);
      console.log(url)
    }, function (error) {
      this.progresse = false;
      error.message //=> String
      console.log('document téléchargé');
      console.log(error);
    })

  }


  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles)
  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


  onDocuments_Upload() {
    if (this.files.length == 0) {
     // this.alert.onInfo('Erreur !', 'Vous devez au moins un document à enregistrer.')
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


  onGet_Delete_Fiche(data){
    this.progresse = true; 
    this.serviceAdmin.onDelete_Produit_Fiche(data.id).then(async (res) => {
      this.progresse = false;
       this.alert.onInfo('Supression réussit', 'La fiche a été suprimé avec succès.')
       this.onDocument_Download_ALL();
       console.log(res.body);
     }, function (error) {
       this.progresse = false;
       error.message //=> String
       this.alert.onInfo('Echec', 'Une erreur c\'est produit durant l\opération.')
       console.log(error)
     })
   }




}
