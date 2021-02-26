import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiAgentService {

 //  baseUrl = "https://prothermo.faseya-dev.com:8080/Crm_Prothermo-0.0.1-SNAPSHOT/prothermo/api/";
      baseUrl = "http://185.22.108.241:8080/Prothermo/prothermo/api/"
 //   baseUrl = "http://localhost:3000/freelancer/fichiers/uploaded"

  header = {
    "Content-Type": "application/json",
    'Authorization': "Bearer " + localStorage.getItem('token'),
    'Access-Control-Allow-Origin': '*',
  }

  constructor(private http: HttpClient) { }

  onHeader() {
    if (localStorage.getItem('token') != null) {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'token': localStorage.getItem('token')
        })
      };
      return httpOptions;
    } else {
      console.log('nuuuullllllll')
    }
  }



  onConnexion(username, password) {
    return this.http.post(this.baseUrl + 'agent/authsignin', { username, password }, this.onHeader())
  }

  onClientRegister(id_clientparticulier_lead, addresse, ballon_thermo, cp, created_time, domaine_activite, email, etape, etat_install, etat_Lead, etat_rdv, nbre_personne_foyer, nom, num_fisc, numero_dossier, precarite, prenom, proprietaire_ou_locataire, ref_avis_impot, statut_professionnel, systeme_chauffage_principal, telephone, type_de_logement, type_travaux, user_id_Install, user_id_Lead, user_id_Rdv, ville, vmc2, zone,  commentaire,  statut_dossier, date_traitement,  commentaire_confirmateur,
     projet,  type_client,  username_create,  id_affected
  ) {
    return fetch(this.baseUrl + 'clientParticulier/addClientParticulierLead', {
      method: "POST",
      body: JSON.stringify({ id_clientparticulier_lead, addresse, ballon_thermo, cp, created_time, domaine_activite, email, etape, etat_install, etat_Lead, etat_rdv, nbre_personne_foyer, nom, num_fisc, numero_dossier, precarite, prenom, proprietaire_ou_locataire, ref_avis_impot, statut_professionnel, systeme_chauffage_principal, telephone, type_de_logement, type_travaux, user_id_Install, user_id_Lead, user_id_Rdv, ville, vmc2, zone, commentaire,  statut_dossier, date_traitement,  commentaire_confirmateur,
        projet,  type_client,  username_create,  id_affected }),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onGet_liste_des_clients_X() {
    const headers = { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') };
    console.log(headers)
    return this.http.get(this.baseUrl + 'clientParticulier/allClientParticuliersLead', { headers });
  }

  onGet_liste_des_clients(user_id) {
    console.log(this.header.Authorization)
    return fetch(this.baseUrl + 'clientParticulier/allClientParticuliersLeadByUser/'+ user_id, {
      method: "POST",
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

  onGet_liste_des_clientsParticulier_commercial(user_id) {
    return fetch(this.baseUrl + 'clientParticulier/allClientParticuliersRdvByUser/'+user_id, {
      method: "POST",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }


  onClientUpdate(id_clientparticulier_lead, addresse, ballon_thermo, cp, created_time, domaine_activite, email, etape, etat_install, etat_Lead, etat_rdv, nbre_personne_foyer, nom, num_fisc, numero_dossier, precarite, prenom, proprietaire_ou_locataire, ref_avis_impot, statut_professionnel, systeme_chauffage_principal, telephone, type_de_logement, type_travaux, user_id_Install, user_id_Lead, user_id_Rdv, ville, vmc2, zone, date_rdv, heure_rdv, type_notification, revenue_fiscal_reference, statut_marital,  commentaire,  statut_dossier, date_traitement,  commentaire_confirmateur,  projet,  type_client,  username_create,  id_affected , username_affected, type_modele, ) {
    return fetch(this.baseUrl + 'clientParticulier/update/' + id_clientparticulier_lead, {
      method: "PUT",
      body: JSON.stringify({
        id_clientparticulier_lead,  addresse, ballon_thermo, cp, created_time, domaine_activite, email, etape, etat_install, etat_Lead, etat_rdv, nbre_personne_foyer, nom, num_fisc, numero_dossier, precarite, prenom, proprietaire_ou_locataire, ref_avis_impot, statut_professionnel, systeme_chauffage_principal, telephone, type_de_logement, type_travaux, user_id_Install, user_id_Lead, user_id_Rdv, ville, vmc2, zone, date_rdv, heure_rdv, type_notification, revenue_fiscal_reference, statut_marital, commentaire,  statut_dossier, date_traitement,  commentaire_confirmateur,  projet,  type_client,  username_create,  id_affected, username_affected, type_modele,       
      }),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onGet_liste_des_clientsParticulier_installation(user_id) {
    return fetch(this.baseUrl + 'clientParticulier/allClientParticuliersInstallByUser/'+user_id, {
      method: "POST",
      //body: JSON.stringify(data),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onUpdate_Fiche_Technique_Client(id_clientparticulierLead, annee_construction, altitude,
    si_renove_annee, surface_habitable, hateur_sous_plafond_moyenne,
    mble_perdu_non_chauffe, combles_amenage, toit_terasse, mitoyennete,
    facade, orientation_porte_sortie, orientation_porte_entree, murs,
    autre_matiere, epaisseur_mur, mur_isole, mur_epaisseur_isolant, type_sol,
    sol_isole, sol_epaisseur_isolant, type_toit, toit_isole,
    toit_epaisseur_isolant, menuiserie, occultation, mode_chauffage,
    chauffage_annee, chauffage_nbre_radiateur, facture_annuelle, si_poele_a_bois,
    chauffage_facture, eau_chaude, ventillation, chauffage_autre, travaux_prevus, type_fenetre,
    compteur,
    temperature_chaudiere,
    matiere_sous_sol,
    qualite_sous_sol,
    distribution_chauffage,
    forme_generale,
    annee_vmc,
    nature_vmc,) {
    return fetch(this.baseUrl + 'clientParticulier/addformClientParticulierLead', {
      method: "POST",
      body: JSON.stringify({
        id_clientparticulierLead, annee_construction, altitude,
        si_renove_annee, surface_habitable, hateur_sous_plafond_moyenne,
        mble_perdu_non_chauffe, combles_amenage, toit_terasse, mitoyennete,
        facade, orientation_porte_sortie, orientation_porte_entree, murs,
        autre_matiere, epaisseur_mur, mur_isole, mur_epaisseur_isolant, type_sol,
        sol_isole, sol_epaisseur_isolant, type_toit, toit_isole,
        toit_epaisseur_isolant, menuiserie, occultation, mode_chauffage,
        chauffage_annee, chauffage_nbre_radiateur, facture_annuelle, si_poele_a_bois,
        chauffage_facture, eau_chaude, ventillation, chauffage_autre, travaux_prevus, type_fenetre, compteur, temperature_chaudiere,
        matiere_sous_sol,
        qualite_sous_sol,
        distribution_chauffage,
        forme_generale,
        annee_vmc,
        nature_vmc,
      }),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onGet_FicheTechnique_des_clients(id_clientparticulierLead) {
    return fetch(this.baseUrl + 'clientParticulier/formClientParticulierLead/' + id_clientparticulierLead, {
      // mode: 'no-cors', // 'cors' by default
      method: "GET",
      // body: JSON.stringify(id_clientparticulierLead),
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onHistorique_Register(commentaire, date, action, id_client, user_id,) {
    return fetch(this.baseUrl + 'historique/addHistorique', {
      // mode: 'no-cors', // 'cors' by default
      method: "POST",
      body: JSON.stringify({ commentaire, date, action, id_client, user_id, }),
      headers: this.header,
      credentials: "same-origin",
    })
  }

  onHistorique_Get_List(id) {
    return fetch(this.baseUrl + 'historique/findByClient/'+id, {
      body: JSON.stringify({}),
      method: "POST",
      headers: this.header,
      credentials: "same-origin"
    })
  }


  onDocument_Download(formData) {
    return fetch(this.baseUrl + 'documentPart/downloadFile', {
      body: JSON.stringify({ formData }),
      method: "POST",
      headers: this.header,
      credentials: "same-origin"
    })
  }


  onDocument_Upload_X(formData) {
       return this.http.post(this.baseUrl + 'documentPart/uploadFile', formData)
    // return this.http.post(this.baseUrl, formData)
  }


  onDocument_Download_X(file_id) {
    return this.http.get(this.baseUrl + 'documentPart/downloadFile/'+ file_id, {responseType: 'blob'} )
  }

  onDocument_Download_ALL_DOCS(id_client) {
    return fetch(this.baseUrl + 'documentPart/findByClient/'+ id_client, {
      // body: JSON.stringify({ formData }),
      method: "GET",
      headers: this.header,
      credentials: "same-origin"
    })  
   // return this.http.get(this.baseUrl + 'documentPart/findByClient/'+ id_client)
  }



  onMail_SendTo_Client(dest, message) {
    return fetch(this.baseUrl + 'clientParticulier/sendmailClientParticulierLead', {
      body: JSON.stringify({ dest, message }),
      method: "POST",
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onZone_Search(id) {
    return fetch(this.baseUrl + 'clientParticulier/zoneByCodeClientParticulierLead/' + id, {
      // mode: 'no-cors', // 'cors' by default
      method: "GET",
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onRende_vous_post( date_rdv,  heure_rdv,  commentaire,  lieu,  username,  id_client,
     prenom,  nom,  email,  nom_client) {
    return fetch(this.baseUrl + 'clientParticulier/addRdv', {
      body: JSON.stringify({ date_rdv,  heure_rdv,  commentaire,  lieu,  username,  id_client, prenom,  nom,  email,  nom_client}),
      method: "POST",
      headers: this.header,
      credentials: "same-origin"
    })
  }

  

  onGet_Etape_Traitement_valeur(id) {
    return fetch(this.baseUrl + 'clientParticulier/formEtapeClientParticulierLead/' + id, {
      // mode: 'no-cors', // 'cors' by default
      method: "GET",
      headers: this.header,
      credentials: "same-origin"
    })
  }

  onEtape_Traitement( id_clientparticulierLead,  mail,  identifiant_action_logement,
     ref_dossier_CEE,  retour_rdv,  type_livraison,  commentaire_livraison,
     ref_virement_accompte,  designation,  ref_virement_logement,  ref_payement,
     ref_produit,  commentaire_finacement,  var1,  var2,  var3,  var4,
     var5,  var6,  var7,  var8,  var9,  var10,  info1,  info2,
      info3,  info4,  info5,  info6,  info7,  info8,  info9,
      info10,  info11,  info12,  info13,  info14,  info15,  info16,
      info17,  info18,  info19,  info20,  info21 ) {
    return fetch(this.baseUrl + 'clientParticulier/addformEtapeClientParticulier', {
      method: "POST",
      body: JSON.stringify({
        id_clientparticulierLead,  mail,  identifiant_action_logement,
     ref_dossier_CEE,  retour_rdv,  type_livraison,  commentaire_livraison,
     ref_virement_accompte,  designation,  ref_virement_logement,  ref_payement,
     ref_produit,  commentaire_finacement,  var1,  var2,  var3,  var4,
     var5,  var6,  var7,  var8,  var9,  var10,  info1,  info2,
     info3,  info4,  info5,  info6,  info7,  info8,  info9,
     info10,  info11,  info12,  info13,  info14,  info15,  info16,
     info17,  info18,  info19,  info20,  info21      
      }),
      headers: this.header,
      credentials: "same-origin"
    })
  }



  onRegister_Infos_fiscalles(num_fisc, ref, avis, intitule, description,id_client){
  
    //http://185.22.108.241:8080/Prothermo/prothermo/api/info_fiscale/addInfo_fiscale
    return fetch(this.baseUrl + 'info_fiscale/addInfo_fiscale', {
      // mode: 'no-cors', // 'cors' by default
      method: "POST",
      body: JSON.stringify({ num_fisc, ref, avis, intitule, description,id_client }),
      headers: this.header,
      credentials: "same-origin",
    })
  }
    onGet_Infos_Fiscales(id_clientparticulierLead){
      //http://185.22.108.241:8080/Prothermo/prothermo/api/info_fiscale/findByClient/{id}
      return fetch(this.baseUrl + 'info_fiscale/findByClient/' + id_clientparticulierLead, {
        // mode: 'no-cors', // 'cors' by default
        method: "POST",
        // body: JSON.stringify(id_clientparticulierLead),
        headers: this.header,
        credentials: "same-origin"
      })
    }


    onDelete_Infos_Fiscal(id){
      //http://185.22.108.241:8080/Prothermo/prothermo/api/info_fiscale/delete/id
      return fetch(this.baseUrl + 'info_fiscale/delete/' + id, {
        method: "DELETE",
        //body: JSON.stringify(data),
        headers: this.header,
        credentials: "same-origin"
      })
    }


    onUpdate_Fiche_Chantier_Client(id_clientparticulierLead,  categorie_sociale,  mode_chauffage,
      surface_chauffee,  revenu_fiscal,  nbre_foyers,  nature_occupation,
      type_bien,  salarie_prive,  consommation_annuelle,  credit_impot,
      credit_en_cours,  adresse_chantier,  complement_adresse,  code_postal,
      type_systeme,  type_mat_demonte,  hauteur_plafond,  altitude,
      temp_moyenne_chauffage,  combles_isoles,  sous_sol_isole,  annee_construction,
      vmc,  nbre_chauffage,  taille_chauffages,  type_pompe,
      temp_sortie_chaudiere,  epais_isolation_mur_ext,  vitrage,  tableau_electrique,
      paiement_comptant,  montant_acompte,  infos_paiement,  mail,
      identifiant_action_logement,  ref_dossier_CEE,  retour_rdv,  type_livraison,
      ref_virement_accompte,  designation,  ref_virement_logement,  ref_payement,
      ref_produit,  commentaire_finacement) {
      return fetch(this.baseUrl + 'clientParticulier/addformClientParticulierLead', {
        method: "POST",
        body: JSON.stringify({
          id_clientparticulierLead,categorie_sociale,mode_chauffage,surface_chauffee,revenu_fiscal,
          nbre_foyers,nature_occupation, type_bien, salarie_prive, consommation_annuelle,
          credit_impot, credit_en_cours,adresse_chantier,complement_adresse,code_postal,    
          type_systeme,type_mat_demonte,hauteur_plafond,altitude,temp_moyenne_chauffage,
          combles_isoles,sous_sol_isole,annee_construction,vmc,nbre_chauffage,taille_chauffages,
          type_pompe,temp_sortie_chaudiere,epais_isolation_mur_ext,vitrage,tableau_electrique,
          paiement_comptant,montant_acompte, infos_paiement ,mail,
          identifiant_action_logement,  ref_dossier_CEE,  retour_rdv,  type_livraison,
          ref_virement_accompte,  designation,  ref_virement_logement,  ref_payement,
          ref_produit,  commentaire_finacement
        }),
        headers: this.header,
        credentials: "same-origin"
      })
    }


    onGet_liste_des_RendezVous_Calendrier(id) {
      return fetch(this.baseUrl + 'clientParticulier/allRdvByUser/'+ id, {
        method: "POST",
        //body: JSON.stringify(data),
        headers: this.header,
        credentials: "same-origin"
      })
    }




}
