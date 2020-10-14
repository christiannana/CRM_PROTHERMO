import { Component, OnInit, } from '@angular/core';
import { Location } from '@angular/common';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
 

@Component({
  selector: 'app-modifier-fiche-client',
  templateUrl: './modifier-fiche-client.component.html',
  styleUrls: ['./modifier-fiche-client.component.css']
})
export class ModifierFicheClientComponent implements OnInit {

  constructor( private location: Location, private http: HttpClient) { }

  ngOnInit(): void {
  }
  goBack() {
    this.location.back();
  }




  title = 'dropzone';

  

  files: File[] = [];


  onSelect(event) {

      console.log(event);

      this.files.push(...event.addedFiles);



      const formData = new FormData();

  

      for (var i = 0; i < this.files.length; i++) { 

        formData.append("file[]", this.files[i]);

      }

 

      this.http.post('http://localhost:8001/upload.php', formData)

      .subscribe(res => {

         console.log(res);

         alert('Uploaded Successfully.');

      })

  }



  onRemove(event) {

      console.log(event);

      this.files.splice(this.files.indexOf(event), 1);

  }


  
}
