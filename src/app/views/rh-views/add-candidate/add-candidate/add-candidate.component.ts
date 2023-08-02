import { Component } from '@angular/core';

import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Specialite } from 'src/app/services/models/specialite';
import { SpecialiteService  } from 'src/app/services/service/specialite.service';
import { EntretienService } from 'src/app/services/service/entretien.service';
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
      date:['',[Validators.required, this.minDateValidator()]],
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
    console.log(f.form.value)
    const entretienData = {
      ...f.value,
      feedbackId: '64b1af43128f38495981525a',
      specialite: f.form.value.post,
      // ... add other properties as needed
    };
    
    if (f.valid) {
      // Call your service to save the candidate
      this.entretienService.save(entretienData).subscribe(
        (data) => {
          // Handle success, e.g., show a success message or redirect.
          console.log('Candidate saved successfully', data);
        },
        (error) => {
          // Handle error, e.g., display an error message.
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
