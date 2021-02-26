import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAgentService } from 'src/app/Services/api_agent/api-agent.service';
import { POPUPServiceService } from 'src/app/Services/popup/popup-service.service';
import { AngualertService, AlertOptions } from 'angualert';

@Component({
  selector: 'app-formulaire-connexion',
  templateUrl: './formulaire-connexion.component.html',
  styleUrls: ['./formulaire-connexion.component.css']
})
export class FormulaireConnexionComponent {
  progresse;
  mail:string = localStorage.getItem('username');
  password:string ;
  
  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;

  
  constructor(private fb: FormBuilder, private route: Router,
     private agentService: ApiAgentService,
     public alert: POPUPServiceService,
      public angualertService: AngualertService) {}
 
 
  onConnexion(){
    this.progresse = true
    this.agentService.onConnexion(this.mail, this.password).subscribe((res:any)=>{
      console.log(res)
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('username', res.username);
      localStorage.setItem('user_id', res.id);
      localStorage.setItem('nom', res.nom);
      localStorage.setItem('prenom', res.prenom);

      if(res.authorities[0].authority == "ROLE_ADMIN"){
        localStorage.setItem('activeRoute', 'lead')
        this.route.navigate(['/administration']);
        return null;
      }
      if(res.authorities[0].authority == "ROLE_AGENT"){
        this.route.navigate(['/menuprincipal']);
        return null;
      }
      if(res.authorities[0].authority == "ROLE_COMMERCIAL"){
        this.route.navigate(['/menuprincipal']);
        return null;
      }
      
    },(error: HttpErrorResponse)=>{
        this.progresse = false;
        this.alert.onInfo('Erreur !', 'Mot de passe ou username invalide')   
    })
  }


}



