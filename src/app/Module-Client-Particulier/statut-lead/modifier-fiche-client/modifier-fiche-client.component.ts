import { Component, OnInit, } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modifier-fiche-client',
  templateUrl: './modifier-fiche-client.component.html',
  styleUrls: ['./modifier-fiche-client.component.css']
})
export class ModifierFicheClientComponent implements OnInit {

  constructor( private location: Location) { }

  ngOnInit(): void {
  }
  goBack() {
    this.location.back();
  }
}
