import {  Component, Renderer2, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntretienService } from 'src/app/services/service/entretien.service';
import { Entretien } from 'src/app/services/models/entretien';
import { get } from 'jquery';



@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.css']
})

export class ListCandidateComponent implements OnInit {
  
  listeEntretien: Array<Entretien> = []
  filteredListeEntretien: Array<Entretien> = [];
  errorMsg = ''
  typePost = ''
  idPost=''
  valueSearch=''

  constructor(private routing:Router,private route:ActivatedRoute,private entretienService: EntretienService,private renderer: Renderer2){
    this.route.params.subscribe(data=>{
      console.log('constructor')
      this.typePost=data['type']
      this.idPost=data['idtype']
      
      this.findListEntretien();
       // Call the method when idPost changes
       
    })
  }
  getIput(Input: string){
    this.valueSearch=Input;
    console.log(this.valueSearch)
    this.filterWithInput()
  }
  
  ngOnInit(): void {
   
   
  }
  
  findListEntretien(): void {
    this.entretienService.findbyspecialite(this.idPost).subscribe(entretien => {
      this.listeEntretien = entretien ;
      console.log(entretien)
      
      
      
    });
  }
  filterWithInput(){
    
    if(this.valueSearch===''){
      this.findListEntretien();
    }else{
      const searchValue =  this.valueSearch.trim().toLowerCase();
      this.filteredListeEntretien = this.listeEntretien.filter(entretien =>
        (entretien.nom && entretien.nom.toLowerCase().includes(searchValue)) ||
        (entretien.prenom && entretien.prenom.toLowerCase().includes(searchValue)) ||
        (entretien.feedback?.nom && entretien.feedback.nom.toLowerCase().includes(searchValue)) ||
        (entretien.commentaire && entretien.commentaire.toLowerCase().includes(searchValue))
      );
      console.log(this.filteredListeEntretien)
    }
  }
  goToCompterendu(_idcanditate : string){
    this.routing.navigate(['compterendu/'+_idcanditate])

  }
}
