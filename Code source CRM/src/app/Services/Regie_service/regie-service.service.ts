import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegieServiceService {

  // baseUrl = "http://prothermo.faseya-dev.com:8080/Crm_Prothermo-0.0.1-SNAPSHOT/prothermo/api/";
     baseUrl = "https://185.22.108.241:8080/Prothermo/prothermo/api/"

  header = {
    "Content-Type": "application/json",
    'Authorization': "Bearer " + localStorage.getItem('token'),
  }

  constructor(private http: HttpClient) { }


  onGet_liste_des_ClientsRegie(id) {
    return fetch(this.baseUrl + 'clientParticulier/allClientRegieaffected', {
      method: "GET",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onGet_liste_des_ClientsRegie_byUser(id) {
    return fetch(this.baseUrl + 'clientParticulier/allClientRegieByUser/'+id, {
      method: "POST",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }


  onGet_liste_des_ClientsRegie_byRegie(id) {
    return fetch(this.baseUrl + 'clientParticulier/allClientRegiesByCreate/'+id, {
      method: "GET",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }


  onGet_liste_des_ClientsRegie_nonAffecte(id) {
    return fetch(this.baseUrl + 'clientParticulier/allClientRegienotaffected', {
      method: "GET",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }
   
  
  onClient_Registration(created_time, nom,  prenom, addresse, cp, ville, telephone, statut_professionnel, systeme_chauffage_principal, zone, precarite, projet, statut_marital, commentaire,etape, type_client,  username_create, etat_Lead, type_de_logement, vmc2) {
    return fetch(this.baseUrl + 'clientParticulier/addClientParticulierLead', {
      method: "POST",
      body: JSON.stringify({ created_time, nom,  prenom, addresse, cp, ville, telephone, statut_professionnel, systeme_chauffage_principal, zone, precarite, projet, statut_marital, commentaire,etape, type_client,  username_create, etat_Lead, type_de_logement, vmc2 }),
      headers: this.header,
      credentials: "same-origin"
    })
  }







}
