import { Component, ElementRef, ViewChild } from '@angular/core';

import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Specialite } from 'src/app/services/models/specialite';
import { SpecialiteService  } from 'src/app/services/service/specialite.service';
import { EntretienService } from 'src/app/services/service/entretien.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Entretien } from 'src/app/services/models/entretien';
import { CvFileService } from 'src/app/services/service/cv-file.service';
import { ToastrService } from 'ngx-toastr';
import { trigger } from '@angular/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
  animations: [
    trigger('flyInOut', [
      // Animation configuration here
    ]),
  ],
})
export class AddCandidateComponent {
  @ViewChild('fileInput', { static: true })
  fileInput!: ElementRef<HTMLInputElement>;
  constructor(private formBuilder:FormBuilder,
    private entretienService: EntretienService,
    private specialiteService: SpecialiteService,
     private cvFileService :CvFileService,
     private toastr:ToastrService,
     private router :Router ){
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
      datecreation:['',Validators.required],
      time:['',Validators.required],
      post:['', Validators.required],
      cv:['', Validators.required]

    })
    
  }
  
  
  

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFileName = fileInput.files[0].name;
    } else {
      this.selectedFileName = '';
    }
  }
  onSubmit(f:any) {
    
    this.submitted = true;
    const entretiendata: Entretien = f.form.value;
    const specialite: any = f.form.value.post;
    const fileInputElement = this.fileInput.nativeElement;
    

    if (f.valid) {
      const selectedFile = fileInputElement.files && fileInputElement.files[0];
      if (selectedFile && selectedFile instanceof File) {
        this.entretienService.save(entretiendata, specialite).subscribe(
          (data) => {
            if (data && data.id) { // Make sure data and data.id are defined
              const entretienId = data.id;
              this.cvFileService.uploadFile(entretienId, selectedFile).subscribe(
                (response) => {
                  console.log('Upload successful', response);
                  
                },
                (error) => {
                  console.error('Upload error', error);
                }
              );
              console.log('Candidate saved successfully', data);
              this.toastr.success('Candidate saved successfully!', 'Success');
                this.router.navigate(['listcandidate/'+data.specialite?.nom+'/'+data.specialite?.id])
            } else {
              console.error('No valid entretienId in the response');
            }
          },
          (error) => {
            console.error('Error while saving candidate', error);
            this.toastr.error('Error saving data', 'Error');
          }
        );
      } else {
        console.error('No valid file selected');
        this.toastr.warning('No valid file selected', 'Warning');
      }
    }
  }
    
  findListSpecialite(): void {
    this.specialiteService.findall().subscribe(Specialite => {
      this.listeSpecialite = Specialite;
      console.log(this.listeSpecialite)
    });
  }
 
    
  
  
}

