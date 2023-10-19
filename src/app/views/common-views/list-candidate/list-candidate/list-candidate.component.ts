import {  Component, Renderer2, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntretienService } from 'src/app/services/service/entretien.service';
import { Entretien } from 'src/app/services/models/entretien';
import { CandidateService } from 'src/app/services/service/candidate.service';
import { Candidate } from 'src/app/services/models/candidate';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';





@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.css']
})

export class ListCandidateComponent implements OnInit {

  
  listeCandidate: Candidate[] = [];
  filteredListeEntretien: Array<Entretien> = [];
  dtoptions:DataTables.Settings={};
  dtTrigger:Subject<any>=new Subject<any>();
  errorMsg = ''
  typePost = ''
  idPost=''
  valueSearch=''

  constructor(private routing:Router,private route:ActivatedRoute,private entretienService: EntretienService,private candidateService:CandidateService){
    
    this.route.params.subscribe(data=>{
      this.typePost=data['type']
      this.idPost=data['idtype']
      
      this.dtTrigger=new Subject<any>();
      this.findListcandidate();
       this.dtoptions={
      pagingType:'full_numbers'
      
    }
       
    })
    
  }
  ngOnInit(): void {
    
   
    
   
  }
  ngOnDestroy(): void {
    
    this.dtTrigger.unsubscribe();
    
  }
 
  data = JSON.parse(localStorage.getItem('token')!!);
 
  
  
  findListcandidate(): void {
 
    this.candidateService.findbyspecialite(this.idPost).subscribe(data => {
      this.listeCandidate = data ;
      
      this.listeCandidate.reverse();
      this.dtTrigger.next(null);
      console.log(data)
      
      
    });
  }
  
  
  
 
  
}
