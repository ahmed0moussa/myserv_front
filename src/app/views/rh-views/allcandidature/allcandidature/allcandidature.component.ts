import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Candidature } from 'src/app/services/models/candidature';
import { Specialite } from 'src/app/services/models/specialite';
import { CandidatureService } from 'src/app/services/service/candidature.service';
import { SpecialiteService } from 'src/app/services/service/specialite.service';







@Component({
  selector: 'app-allcandidature',
  templateUrl: './allcandidature.component.html',
  styleUrls: ['./allcandidature.component.css']
})
export class AllcandidatureComponent {
  @ViewChild('newCandidaturesTable', { static: false }) newCandidaturesTable!: ElementRef;
  @ViewChild('candidaturesDejaVuTable', { static: false }) candidaturesDejaVuTable!: ElementRef;
  
  checkedCandidatures: Candidature[] = [];
  uncheckedCandidatures: Candidature[] = [];
  idcandidature!:string;
  submitted=false
  listeSpecialite: Array<Specialite> = []
  candidature:any;
  specialiteForm!:FormGroup;
  dtoptions:DataTables.Settings={};
  dtTrigger:Subject<any>=new Subject<any>();
  dtOptions2: DataTables.Settings = {}; 
  dtTrigger2: Subject<any> = new Subject<any>();
  constructor(private routing:Router,
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private specialiteService: SpecialiteService,
    private candidatureService: CandidatureService) {}
   

  ngOnInit(): void {
    this.findall();
    this.findListSpecialite();
    this.dtoptions={
      pagingType:'full_numbers'
      
    }
    this.dtOptions2 = {
      pagingType: 'full_numbers',
    };
    this.specialiteForm=this.formBuilder.group({
      post:['',Validators.required],
      

    })

    
  } 
  
 
  ngOnDestroy(): void {
    
    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();
  }
  
  
  

 
 
  setid(idcandidature:string ){
    this.idcandidature=idcandidature;
    
  }
  
  getCandidatureId(idcandidature:string) {
    this.setid(idcandidature);
    this.candidatureService.getCandidatureById(this.idcandidature).subscribe(
      (data)=>{
        this.candidature=data;
        console.log(this.candidature)
        
     
      },
      error => {
        console.error('Error deleting user:', error);
        
      }
    )
  }
  delete() {
    this.candidatureService.deleteCandidature(this.idcandidature).subscribe(
      async () => {
        console.log('User deleted successfully');
        this.findall()
        
      },
      error => {
        console.error('Error deleting user:', error);
        
      }
    );
    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();
  }
  findall(){
    
    this.candidatureService.findCheckedCandidatures().subscribe((data) => {
      this.checkedCandidatures = data;
      this.checkedCandidatures.reverse();
      this.dtTrigger.next(null);
    console.log(this.checkedCandidatures)
    });

    this.candidatureService.findUncheckedCandidatures().subscribe((data) => {
      this.uncheckedCandidatures = data;
      this.uncheckedCandidatures.reverse();
      this.dtTrigger2.next(null);
    });
  }
  findListSpecialite(): void {
    this.specialiteService.findall().subscribe(Specialite => {
      this.listeSpecialite = Specialite;
      console.log(this.listeSpecialite)
    });
  }
  onSubmit( ){
    this.submitted = true;
    if (this.specialiteForm.valid) {
    const formData = this.specialiteForm.value;
    console.log(this.candidature.id+","+formData.post)
    this.candidatureService.placeCandidate(this.candidature.id,formData.post).subscribe(
      (resp) => {
        console.log('candiadat updated successfully',resp);
        this.toastr.success('candidat enregistré avec succés!', 'Success');
        this.routing.navigate(['ajoutentretien/'+resp.id])
        this.findall();
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();
    
    
  
  }
}


}
