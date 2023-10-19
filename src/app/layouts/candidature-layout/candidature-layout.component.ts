import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/services/models/candidate';
import { Candidature } from 'src/app/services/models/candidature';
import { Infocandidate } from 'src/app/services/models/infocandidate';
import { CandidatureService } from 'src/app/services/service/candidature.service';

@Component({
  selector: 'app-candidature-layout',
  templateUrl: './candidature-layout.component.html',
  styleUrls: ['./candidature-layout.component.css']
})
export class CandidatureLayoutComponent {
  submitted=false
  @ViewChild('fileInput', { static: true })
  fileInput!: ElementRef<HTMLInputElement>;

  @ViewChild('lettreDeMotivationInput', { static: true })
  lettreDeMotivationInput!: ElementRef<HTMLInputElement>;
  selectedCvName!: string ;
  selectedLettreName!:string;
  addcandidateurForm!: FormGroup;
  candidateur: Candidature= new Candidature();
  infocandidate:Infocandidate=new Infocandidate();
  candidate:Candidate=new Candidate();
  successMessage!:string;


  
  constructor( private toastr:ToastrService,
    private formBuilder: FormBuilder ,
    private candidatureService :CandidatureService,
    private router: Router) {
    this.addcandidateurForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      cv: ['',Validators.required],
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
      Mobilite: ['', Validators.required],
      AutredsBoites: ['', Validators.required],
      VISA: ['', Validators.required],
      disponible: ['', Validators.required],
      domaine: ['', Validators.required],
      typeDeMission: [''],
      technologies: [''],
      certifications: [''],
      contrat: ['', Validators.required], 
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
  
  onSubmit(f :any) {
    this.submitted=true
    const formValues = this.addcandidateurForm.value;
    console.log(formValues)
    
    if (this.addcandidateurForm.valid) {
    
      // map infocandidate
      this.candidate.lastName=formValues.lastName;
      this.candidate.firstName=formValues.firstName
      this.candidate.phone=formValues.Phone;
      this.candidate.email=formValues.Email;

      this.infocandidate.address=formValues.Address;
      
      this.infocandidate.permit=formValues.Permit;
      this.infocandidate.age=formValues.Age;
      this.infocandidate.status=formValues.Status;
      this.infocandidate.diplome=formValues.Diplome;
      this.infocandidate.yearsOfExperience=formValues.YearsOfExperience;
      this.infocandidate.salary=formValues.Salary;
      this.infocandidate.preavis=formValues.Preavis;
      this.infocandidate.mobilite=formValues.Mobilite;
      this.infocandidate.autredsBoites=formValues.AutredsBoites;
      this.infocandidate.visa=formValues.VISA;

      
      this.candidateur.disponible=formValues.disponible;
      this.candidateur.domaine=formValues.domaine;
      this.candidateur.typeDeMission=formValues.typeDeMission;
      this.candidateur.technologies=formValues.technologies;
      this.candidateur.certifications=formValues.certifications;
      this.candidateur.contrat=formValues.contrat; 
      this.candidateur.infocandidate=this.infocandidate;
      this.candidateur.infocandidate.candidate=this.candidate;
      const fileInputElement = this.fileInput.nativeElement;
      const lettreDeMotivationInputElement = this.lettreDeMotivationInput.nativeElement;
      const selectedFile = fileInputElement.files && fileInputElement.files[0];
      const selectedLettreDeMotivationFile = lettreDeMotivationInputElement.files && lettreDeMotivationInputElement.files[0];
      if (selectedFile && selectedFile instanceof File ) {
        this.candidatureService.save(this.candidateur).subscribe(
          (response) => {
            console.log('data save successful', response);
            this.candidatureService.uploadFile(response.id, selectedFile).subscribe(
              (cvUploadResponse) => {
                console.log('CV Upload successful', cvUploadResponse);
                if ( selectedLettreDeMotivationFile instanceof File) {
                  this.candidatureService.uploadLettre(response.id, selectedLettreDeMotivationFile).subscribe(
                    (lettreUploadResponse) => {
                      console.log('Lettre de Motivation Upload successful', lettreUploadResponse);
                      this.toastr.success('Votre candidature enregistrée avec succès!', 'Success');
                      this.addcandidateurForm.reset();
                      this.fileInput.nativeElement.value = '';
                      this.lettreDeMotivationInput.nativeElement.value = '';
                      this.selectedCvName = '';
                      this.selectedLettreName = '';
                    },
                    (lettreUploadError) => {
                      console.error('Lettre de Motivation Upload error', lettreUploadError);
                      
                    }
                  );
              }else{
                this.toastr.success('Votre candidature enregistrée avec succès!', 'Success');
                      this.addcandidateurForm.reset();
                      this.fileInput.nativeElement.value = '';
                    this.lettreDeMotivationInput.nativeElement.value = '';
                    this.selectedCvName = '';
                    this.selectedLettreName = '';
              }
              },
              (cvUploadError) => {
                console.error('CV Upload error', cvUploadError);
              }
            );
            
          },
          (error) => {
            console.error('save error', error);
          }
        );
      }
    }
  }
}
