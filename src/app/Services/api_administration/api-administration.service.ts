import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiAdministrationService {

  // baseUrl = "http://prothermo.faseya-dev.com:8080/Crm_Prothermo-0.0.1-SNAPSHOT/prothermo/api/";
     baseUrl = "http://185.22.108.241:8080/Prothermo/prothermo/api/"

  header = {
    "Content-Type": "application/json",
    'Authorization': "Bearer " + localStorage.getItem('token'),
  }

  constructor(private http: HttpClient) { }


  onGet_liste_des_agents() {
    return fetch(this.baseUrl + 'agent/allUsers', {
      method: "GET",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }
  
  onAgent_Registration( id,  nom,  prenom,  adresse,  username,  equipe,
     email,  password,  telephone,  poste,  fonction, role) {

    return fetch(this.baseUrl + 'agent/addUser', {
      method: "POST",
      body: JSON.stringify({ id, nom, prenom, adresse,  username, telephone,  poste, fonction, email, password,  equipe, role }),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onAgent_Update(id, nom,prenom,telephone,poste,adresse,fonction,username, email, password,  equipe,role) { 
    return fetch(this.baseUrl + 'agent/updateUser', {
      method: "POST",
      body: JSON.stringify({ id, nom,prenom,telephone,poste,adresse,fonction,username, email, password,  equipe,role }),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onDelete_Agent(id) {
    return fetch(this.baseUrl + 'agent/deleteuser/' + id, {
      method: "DELETE",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }


  onProduit_Register( nom,  description,  reference,  marque,  categorie,
     commentaire,  prix_achat,  prix_vente_ref,
     id_client_part,  tva,  prix_ttc) {
    return fetch(this.baseUrl + 'produit/addProduit', {
      method: "POST",
      body: JSON.stringify({
         nom, description, reference, marque, categorie,
        commentaire, prix_achat, prix_vente_ref, id_client_part, tva,  prix_ttc
      }),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onGet_liste_des_produits() {
    return fetch(this.baseUrl + 'produit/allProduits', {
      method: "GET",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }
  

    onGet_liste_des_RendezVous(id_client) {
      return fetch(this.baseUrl + 'clientParticulier/allRdvByClient/'+ id_client, {
        method: "POST",
        //body: JSON.stringify(data),
        headers: this.header,
        credentials: "same-origin"
      })
    }


    onGet_liste_des_RendezVous_All() {
      return fetch(this.baseUrl + 'clientParticulier/allRdvs/', {
        method: "GET",
        //body: JSON.stringify(data),
        headers: this.header,
        credentials: "same-origin"
      })
    }




  onGet_liste_des_aides() {
    return fetch(this.baseUrl + 'aide/allAides', {
      method: "GET",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onAide_Register(description, montant,  nom, type_aide) {
   return fetch(this.baseUrl + 'aide/addAide', {
     method: "POST",
     body: JSON.stringify({
      description, montant,  nom, type_aide
     }),
     headers: this.header,
     credentials: "same-origin"
   })
 }

 onDelete_Aide(id) {
  return fetch(this.baseUrl + 'aide/delete/' + id, {
    method: "DELETE",
    //body: JSON.stringify(data),
    headers: this.header,
    credentials: "same-origin"
  })
}

  onDelete_Produit(id) {
    return fetch(this.baseUrl + 'produit/delete/' + id, {
      method: "DELETE",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onDelete_Produit_Fiche(id) {
    return fetch(this.baseUrl + 'documentProduit/delete/' + id, {
      method: "DELETE",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onProduit_Update( id_produit,  nom,  description,  reference,  marque,  categorie,
     commentaire,  prix_achat,  prix_vente_ref,  piece_jointe,  id_client_pro,
     id_client_part) { 
    return fetch(this.baseUrl + 'produit/update/'+id_produit, {
      method: "PUT",
      body: JSON.stringify({ id_produit,  nom,  description,  reference,  marque,  categorie,
        commentaire,  prix_achat,  prix_vente_ref,  piece_jointe,  id_client_pro,
        id_client_part }),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  ////////////////////////////  GESTION DFES CLIENTS STATUT LEAD   /////////////////


  onGet_liste_des_clients_Lead() {
    return fetch(this.baseUrl + 'clientParticulier/allClientParticuliersLeadaffected', {
      method: "GET",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  

  onGet_liste_des_clients_RDV() {
    return fetch(this.baseUrl + 'clientParticulier/allClientParticuliersRdv', {
      method: "GET",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onGet_liste_des_clients_Install() {
    return fetch(this.baseUrl + 'clientParticulier/allClientParticuliersInstall', {
      method: "GET",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onDelete_clients_particulier(id) {
    return fetch(this.baseUrl + 'clientParticulier/delete/' + id, {
      method: "DELETE",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  /////////////////////  Gestion des affectation  ///////////////////////////////

  onGet_liste_des_clients_non_Affecter() {
    return fetch(this.baseUrl + 'clientParticulier/allClientParticuliersLeadnotaffected', {
      method: "GET",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onImportation_Cilent_particulier_Excel(created_time, proprietaire_ou_locataire, type_de_logement,
    statut_professionnel, systeme_chauffage_principal, nom, ville, cp, telephone, etape, etat_Lead, type_client, username_create) {
    return fetch(this.baseUrl + 'clientParticulier/addClientParticulierLead', {
      method: "POST",
      body: JSON.stringify({
        created_time, proprietaire_ou_locataire, type_de_logement,
        statut_professionnel, systeme_chauffage_principal, nom, ville, cp, telephone, etape, etat_Lead, type_client, username_create
      }),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onAffectation_client( id,  id_user,  username,  nom,  prenom,  email, id_client ) {
    return fetch(this.baseUrl + 'clientParticulier/affectationClientParticulier/', {
      method: "POST",
      body: JSON.stringify({id,  id_user,  username,  nom,  prenom,  email, id_client}),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onAffectation_etape( id,  id_user,  username,  etape ) {
    return fetch(this.baseUrl + 'clientParticulier/affectationEtape/', {
      method: "POST",
      body: JSON.stringify({ id,  id_user,  username,  etape}),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onDocument_Upload_X(formData) {
    return this.http.post(this.baseUrl + 'documentProduit/uploadFile', formData)
  }

  onDocument_Download_ALL_DOCS(id_produit) {
    return fetch(this.baseUrl +'documentProduit/findByProduit/'+ id_produit, {
      // body: JSON.stringify({ formData }),
      method: "GET",
      headers: this.header,
      credentials: "same-origin"
    })  
   // return this.http.get('http://prothermo.faseya-dev.com:8080/Crm_Prothermo-0.0.1-SNAPSHOT/prothermo/api/documentPart/findByClient/'+ id_client)
  }

  
  onDocument_Download_X(file_id) {
    return this.http.get(this.baseUrl + 'documentProduit/downloadFile/'+ file_id, {responseType: 'blob'} )
  }


  onGet_liste_des_agent_affecter(id_client) {
    return fetch(this.baseUrl + 'clientParticulier/allaffectationByClient/'+id_client, {
      method: "POST",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onDelete_clients_affecter(id) {
    return fetch(this.baseUrl + 'clientParticulier/deleteaffectation/' + id, {
      method: "DELETE",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onDelete_clients_RendezVous(id) {
    return fetch(this.baseUrl + 'clientParticulier/deleteRdv/' + id, {
      method: "DELETE",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onGet_liste_des_etapes_agent() {
    return fetch(this.baseUrl + 'agent/allUsers', {
      method: "GET",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onDelete_etape(id) {
    return fetch(this.baseUrl + 'clientParticulier/deleteetape/' + id, {
      method: "DELETE",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onGet_liste_des_etape(id) {
    return fetch(this.baseUrl + 'agent/allEtatapeByAgent/'+id, {
      method: "POST",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onGet_Data_Etape(id) {
    return fetch(this.baseUrl + 'clientParticulier/formEtapeClientParticulierLead/'+id, {
      method: "GET",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }



}
