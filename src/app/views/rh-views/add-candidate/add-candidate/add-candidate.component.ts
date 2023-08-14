import { Component } from '@angular/core';

import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Specialite } from 'src/app/services/models/specialite';
import { SpecialiteService  } from 'src/app/services/service/specialite.service';
import { EntretienService } from 'src/app/services/service/entretien.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Entretien } from 'src/app/services/models/entretien';
@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent {
  
  
  constructor(private formBuilder:FormBuilder,private entretienService: EntretienService,private specialiteService: SpecialiteService ){
  }
    
  addcandidateForm!:FormGroup
  submitted=false
  selectedFileName: string | undefined;
  listeSpecialite: Array<Specialite> = []

  ngOnInit(){
    
    this.findListSpecialite();
    this.addcandidateForm=this.formBuilder.group({
      lastName:['',Validators.required],
      firstName:['',Validators.required],
      datecreation:['',[Validators.required, this.minDateValidator()]],
      time:['',Validators.required],
      post:['', Validators.required],
      file:['', Validators.required]

    })
    
  }
  
  
  minDateValidator() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00
    return (control: { value: string | number | Date; }) => {
      const selectedDate = new Date(control.value);
      return selectedDate >= today ? null : { minDate: true };
    };
  }
  onSubmit(f:any) {
    
    this.submitted = true;
    const entretiendata: Entretien = f.form.value;
    const specialite: any = f.form.value.post;

    if (f.valid) {
      
      this.entretienService.save(entretiendata,specialite).subscribe(
        (data) => {
          console.log('Candidate saved successfully', data);
        },
        (error) => {
          console.error('Error while saving candidate', error);
        }
      );
    }
  }
    
  findListSpecialite(): void {
    this.specialiteService.findall().subscribe(Specialite => {
      this.listeSpecialite = Specialite;
      console.log(this.listeSpecialite)
    });
  }
 
    
  
    onFileSelected(event: Event) {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        this.selectedFileName = fileInput.files[0].name;
      } else {
        this.selectedFileName = '';
      }
    }
}
