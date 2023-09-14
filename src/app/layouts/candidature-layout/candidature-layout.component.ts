import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidature-layout',
  templateUrl: './candidature-layout.component.html',
  styleUrls: ['./candidature-layout.component.css']
})
export class CandidatureLayoutComponent {
  submitted=false
  selectedCvName!: string ;
  selectedLettreName!:string;
  addcandidateurForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.addcandidateurForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      Phone: ['', Validators.required],
      Address: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Permit: ['', Validators.required],
      Age: ['', Validators.required],
      Status: ['', Validators.required],
      Diplome: ['', Validators.required],
      YearsOfExperience: ['', Validators.required],
      Salary: ['', Validators.required],
      Preavis: ['', Validators.required],
      mobilite: ['', Validators.required],
      AutredsBoites: ['', Validators.required],
      VISA: ['', Validators.required],
      Disponible: ['', Validators.required],
      domaine: [''],
      TypeDeMission: [''],
      technologies: [''],
      certifications: [''],
      contrat: ['', Validators.required],
      cv: ['',Validators.required],
      lettreDeMotivation: ['']
    });
  }
  onCvSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedCvName = fileInput.files[0].name;
    } else {
      this.selectedCvName = '';
    }
  }
  onLettreSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedLettreName = fileInput.files[0].name;
    } else {
      this.selectedLettreName = '';
    }
  }
  onSubmit() {
    this.submitted=true
    const formValues = this.addcandidateurForm.value;
    console.log(formValues)
  }
}
