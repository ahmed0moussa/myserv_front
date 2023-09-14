import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entretien } from 'src/app/services/models/entretien';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Feedback } from 'src/app/services/models/feedback';
import { QuestionTECH } from 'src/app/services/models/question-tech.model';

import { CvFileService } from 'src/app/services/service/cv-file.service';
import { EntretienService } from 'src/app/services/service/entretien.service';
import { FeedBackService } from 'src/app/services/service/feedback.service';
import { QuestionTECHService } from 'src/app/services/service/question-tech.service';
import { ToastrService } from 'ngx-toastr';
import { CompteRenduService } from 'src/app/services/service/compte-rendu.service';
import { CompteRendu } from 'src/app/services/models/compte-rendu';
import { RepenseQTECH } from 'src/app/services/models/repense-qtech';
import { Infocandidate } from 'src/app/services/models/infocandidate';
import { RepenseQRH } from 'src/app/services/models/repense-qrh';

@Component({
  selector: 'app-compte-rendu',
  templateUrl: './compte-rendu.component.html',
  styleUrls: ['./compte-rendu.component.css'],
})
export class CompteRenduComponent {
  ImageUrl: string | ArrayBuffer | null = null;
  selectedFileName!: string ;
  selectedcvName: string | undefined;
  captionText: string | undefined;
  
  listequestionTECH: any;
  @ViewChild('myModal') modalRef!: ElementRef;
  idcanditate!: string;
  listeFeedBack: Array<Feedback> = [];
  compteRenduForm!: FormGroup;
  compteRendu:CompteRendu= new CompteRendu();
  entretien:Entretien= new Entretien()
  infocandidate:Infocandidate=new Infocandidate();
  repenseQRH:RepenseQRH=new RepenseQRH();
  listrepTECH: RepenseQTECH[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private entretienService: EntretienService,
    private cvFileService: CvFileService,
    private questionTECHService: QuestionTECHService,
    private feedBackService: FeedBackService,
    private compteRenduService: CompteRenduService
  ) {
    this.route.params.subscribe((data) => {
      this.idcanditate = data['idcandidate'];

      this.findListFeedback();
      this.findEntretienbyId(this.idcanditate);
    });
  }
  ngOnInit() {
    this.compteRenduForm = this.formBuilder.group({
     
      lastName: [this.entretien.lastName, Validators.required],
      firstName: ['', Validators.required],
      datemodif: [''],  // You can add validation here if needed
      time: [''],
      feedback: [''],
      file: [''],
      commentaire:[],

      Phone: [''],
      Address: [''],
      Email: [''],
      Permit: [''],
      Age: [''],
      Status: [''],
      Diplome: [''],
      YearsOfExperience: [''],
      Salary: [''],
      Preavis: [''],
      VISA: [''],
      Mobilite: [''],
      AutredsBoites: [''],
      image:[''],

      frenchLevel: [''],
      englichLevel: [''],
      qualities: [''],
      Faults: [''],
      Q2: [''],
      Q3: [''],
      Q4: [''],
      Q5: [''],
    });
  }
  minDateValidator() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00
    return (control: { value: string | number | Date }) => {
      const selectedDate = new Date(control.value);
      return selectedDate >= today ? null : { minDate: true };
    };
  }

  readURL(input: any): void {
    const file = input.files[0];

    if (!file) {
      this.ImageUrl = null;
      this.selectedFileName = '';
      return;
    }

    // Check if the file is an image (JPG or PNG)
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      alert('Please select a JPG or PNG image.');
      this.ImageUrl = null;
      this.selectedFileName = '';
      return;
    }

    // Check if the file size is less than or equal to 5 MB (5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should not exceed 5 MB.');
      this.ImageUrl = null;
      this.selectedFileName = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      this.ImageUrl = e.target?.result as string | ArrayBuffer | null;
    };

    reader.readAsDataURL(file);
    this.selectedFileName = file.name;
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.readURL(fileInput);
  }
  oncvSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedcvName = fileInput.files[0].name;
    } else {
      this.selectedcvName = '';
    }
  }

  openModal() {
    const modal = this.modalRef.nativeElement as HTMLElement;
    const img = document.getElementById('myImg') as HTMLImageElement;

    this.ImageUrl = img.src;
    this.captionText = img.alt;
    modal.style.display = 'block';
  }
  findEntretienbyId(idCanditate: string) {
    this.entretienService.findbyId(idCanditate).subscribe((entretien) => {
      this.entretien = entretien || {};
      console.log(entretien);
      if (entretien.specialite && entretien.specialite.id) {
        const specialiteId = entretien.specialite.id;

        this.questionTECHService
          .findBySpecialite(specialiteId)
          .subscribe((questionTECH) => {
            this.listequestionTECH = questionTECH;

            for (let i = 0; i < this.listequestionTECH.length; i++) {
              this.listequestionTECH[i].textQuestion = `Q${i + 1} . ${
                this.listequestionTECH[i].textQuestion
              }`;
            }
          });
      }
    });
  }
  findListFeedback(): void {
    this.feedBackService.findall().subscribe((FeedBack) => {
      this.listeFeedBack = FeedBack;
    });
  }
  closeModal() {
    const modal = this.modalRef.nativeElement as HTMLElement;
    modal.style.display = 'none';
  }
  onSubmit() {
  
    const formValues = this.compteRenduForm.value;
    if(formValues.lastName){this.entretien.lastName = formValues.lastName;}
    if(formValues.firstName){this.entretien.firstName = formValues.firstName;}
      if(formValues.datemodif){ this.entretien.datemodif = formValues.datemodif;}
        if(formValues.time){this.entretien.time = formValues.time;}
        if(formValues.commentaire){this.entretien.commentaire = formValues.commentaire;}
        if(formValues.feedback){this.entretien.feedback = formValues.feedback;}
  // Map infocandidate properties
  this.infocandidate.Phone = formValues.Phone;
  this.infocandidate.Address = formValues.Address;
  this.infocandidate.Email = formValues.Email;
  this.infocandidate.Permit = formValues.Permit;
  this.infocandidate.Age = formValues.Age;
  this.infocandidate.Status = formValues.Status;
  this.infocandidate.Diplome = formValues.Diplome;
  this.infocandidate.YearsOfExperience = formValues.YearsOfExperience;
  this.infocandidate.Salary = formValues.Salary;
  this.infocandidate.Preavis = formValues.Preavis;
  this.infocandidate.VISA = formValues.VISA;
  this.infocandidate.Mobilite = formValues.Mobilite;
  this.infocandidate.AutredsBoites = formValues.AutredsBoites;
  // Map repenseQRH properties
  this.repenseQRH.frenchLevel = formValues.frenchLevel;
  this.repenseQRH.englishlevel = formValues.englichLevel;
  this.repenseQRH.qualities = formValues.qualities;
  this.repenseQRH.Faults = formValues.Faults;
  this.repenseQRH.Q2 = formValues.Q2;
  this.repenseQRH.Q3 = formValues.Q3;
  this.repenseQRH.Q4 = formValues.Q4;
  this.repenseQRH.Q5 = formValues.Q5;
  // Now, map the repenseQTECH array
  // Assuming listrepTECH contains the RepenseQTECH objects
  const repenseQTECH = this.listrepTECH;

  // Create the CompteRendu object and assign the mapped objects
  this.compteRendu.entretien=this.entretien;
  this.compteRendu.infocandidate=this.infocandidate;
  this.compteRendu.repenseQRH=this.repenseQRH;
  this.compteRendu.repenseQTECH=repenseQTECH;

  this.compteRenduService.createCompteRendu( this.entretien.id,this.compteRendu).subscribe(
    (data) => {
      console.log('Candidate saved successfully', data);
    },
    (error) => {
      console.error('No valid file selected');
      
    });
  console.log(this.compteRendu);
  }
  onchange(event: any, question: QuestionTECH) {
    const qr = new RepenseQTECH();
    qr.TextRepense = event.target.value;
    qr.Question = question;
    this.listrepTECH.push(qr);
  }
}
