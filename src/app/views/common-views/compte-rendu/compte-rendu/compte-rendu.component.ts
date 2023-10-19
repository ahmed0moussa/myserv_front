import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { error } from 'jquery';
import { CandidateService } from 'src/app/services/service/candidate.service';
import { InfocandidateService } from 'src/app/services/service/infocandidate.service';
import { QuestionRHService } from 'src/app/services/service/question-rh.service';

@Component({
  selector: 'app-compte-rendu',
  templateUrl: './compte-rendu.component.html',
  styleUrls: ['./compte-rendu.component.css'],
})
export class CompteRenduComponent {
  ImageUrl: string | ArrayBuffer | null = null;
  @ViewChild('imageInput', { static: true })
  imageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cvInput', { static: true })
  cvInput!: ElementRef<HTMLInputElement>;
  @ViewChild('crInput', { static: true })
  crInput!: ElementRef<HTMLInputElement>;
  selectedFileName!: string ;
  selectedcvName: string | undefined;
  selectedcrName: string | undefined;
  captionText: string | undefined;
  listequestionRH:any;
  listequestionTECH: any;
  listequestionRH1:any;
  listequestionTECH1: any;
  @ViewChild('myModal') modalRef!: ElementRef;
  idcanditate!: string;
  candidate:any;
  listeFeedBack: Array<Feedback> = [];
  listeEntretien:Array<Entretien> = [];
  compteRenduForm!: FormGroup;
  compteRendu:CompteRendu= new CompteRendu();
  entretien:Entretien= new Entretien()
  infocandidate:any;
  rhResponses: string[] = [];
  techResponses: string[] = [];
  listrepTECH: RepenseQTECH[] = [];
  listrepRH: RepenseQRH[] = [];
  idInlistEntretien!:number;
  
  constructor(
    private routing:Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private entretienService: EntretienService,
    private cvFileService: CvFileService,
    private questionTECHService: QuestionTECHService,
    private questionRHService: QuestionRHService,
    private candidateService:CandidateService,
    private infocandidateService:InfocandidateService,
    private feedBackService: FeedBackService,
    private compteRenduService: CompteRenduService,
    private toastr:ToastrService,
  ) {
    this.route.params.subscribe((data) => {
      this.idcanditate = data['idcandidate'];

      this.findCanditate(this.idcanditate)
      this.findListEntretien(this.idcanditate);
      this.findInfocandidate(this.idcanditate);
      
      this.findListQuestionRh();
      this.findListFeedback();
      
      this.compteRenduForm = this.formBuilder.group({
        lastName: ["", Validators.required],
        firstName: ['', Validators.required],
        date: [''],  // You can add validation here if needed
        time: [''],
        feedback: [''],
        file: [''],
        commentaire:[''],
  
        phone: [''],
        address: [''],
        email: [''],
        permit: [''],
        age: [''],
        status: [''],
        diplome: [''],
        yearsOfExperience: [''],
        salary: [''],
        preavis: [''],
        visa: [''],
        mobilite: [''],
        autredsBoites: [''],
        image:[''], 
        cr:[''],
  
       
      });
      
      
      
    });
  }
  ngOnInit() {
    
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
  oncrSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedcrName = fileInput.files[0].name;
    } else {
      this.selectedcrName = '';
    }
  }

  openModal() {
    const modal = this.modalRef.nativeElement as HTMLElement;
    const img = document.getElementById('myImg') as HTMLImageElement;

    this.ImageUrl = img.src;
    this.captionText = img.alt;
    modal.style.display = 'block';
  }
  findListEntretien(idCanditate: string){
    this.entretienService.findall(idCanditate).subscribe((data) => {
      this.listeEntretien=data;
      console.log("entretien list ",data);
      const idEntretien =this.listeEntretien[0]?.id
      if (idEntretien) {
        this.findEntretienbyId(idEntretien,0);
      }
    },(error)=>{
      console.log("error entretien list ",error);
    });
  }
  findEntretienbyId(idEntretien: any,i:number) {
    this.idInlistEntretien=i
     this.entretienService.findbyId(idEntretien).subscribe((entretien) => {
       this.entretien = entretien || {};
       console.log(entretien);
      
     });
  }
  findCanditate(idCanditate: string){
    this.candidateService.getCandidateById(idCanditate).subscribe(
      (candidate)=>{
        this.candidate=candidate;
        console.log(" get candidate",this.candidate);
        if (candidate.specialite && candidate.specialite.id) {
        const specialiteId = candidate.specialite.id;
        this.questionTECHService.findBySpecialite(specialiteId).subscribe(
          (questionTECH) => {
            this.listequestionTECH = questionTECH;
            this.listequestionTECH1 = questionTECH;
            for (let i = 0; i < this.listequestionTECH.length; i++) {
              this.listequestionTECH[i].textQuestion = `${this.listequestionTECH[i].textQuestion}`;
            }
            this.initializeFormControls();
          });
      }
      },(error)=>{
        console.log("get candidate error",error);
      })
  }
  findInfocandidate(idCanditate: string){
    this.infocandidateService.getInfocandidateById(idCanditate).subscribe(
      (data)=>{
        this.infocandidate=data;
        if (this.infocandidate.activeCR==false) {
          this.compteRendu.infocandidate=this.infocandidate
        }else{
          this.compteRenduService.getCompteRendu(this.infocandidate?.id).subscribe(
            (data) => {
              
                this.compteRendu=data;
                
                console.log('CompteRendu ', data);
            
            },
            (error) => {
              console.error('error CompteRendu ',error);
              
            });
        }
        
        
        if (this.infocandidate.image!=null) {
          this.ImageUrl=this.infocandidate.image;
        }
        console.log(" get infocandidate",this.infocandidate);
      },(error)=>{
        console.log("get infocandidate error",error);
      })
  }
  findListQuestionRh(){
    this.questionRHService.findAll().subscribe(
      (datta)=>{
        this.listequestionRH=datta;
        this.listequestionRH1=datta;
        console.log('rh',datta)
        for (let i = 0; i < this.listequestionRH.length; i++) {
          this.listequestionRH[i].textQuestion = `${this.listequestionRH[i].textQuestion}`;
        }

        this.initializeFormControls();
      })
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
  initializeFormControls() {
    // Initialize form controls here
    for (let i = 0; i < this.listequestionRH?.length; i++) {
      const controlName = `rhResponse_${i}`;
      this.compteRenduForm.addControl(controlName, this.formBuilder.control(''));
    }
  
    for (let i = 0; i < this.listequestionTECH?.length; i++) {
      const controlName = `techResponse_${i}`;
      this.compteRenduForm.addControl(controlName, this.formBuilder.control(''));
    }
  }
  goToEntretie(){
    this.routing.navigate(['ajoutentretien/'+this.candidate.id])
  }
  
  delete(){
    if (this.entretien && this.entretien.id && this.candidate && this.candidate.id) {
      this.entretienService.deletebyId(this.entretien.id, this.candidate.id).subscribe(
          () => {
              console.log('Entretien deleted successfully');
              this.findCanditate(this.idcanditate)
              this.findListEntretien(this.idcanditate);
              this.findInfocandidate(this.idcanditate);
          },
          error => {
              console.error('Error deleting entretien:', error);
          }
      );
  } else {
      console.error('Entretien or candidate is not properly initialized');
  }
  }
  onSubmit() {
  
    const formValues = this.compteRenduForm.value;
    
    // map Entretien properties
    if (this.candidate && this.candidate.listEntretien && this.candidate.listEntretien.length > 0) {
      
      const updateEntretien = this.candidate.listEntretien[this.idInlistEntretien];

    if(formValues.date){updateEntretien.date = formValues.date;}
    if(formValues.time){updateEntretien.time = formValues.time;}
    if(formValues.commentaire){updateEntretien.commentaire = formValues.commentaire;}
    if(formValues.feedback){updateEntretien.feedback = formValues.feedback;}
    }
    // map candidate properties
    if(formValues.feedback){this.candidate.feedback = formValues.feedback;}
    if(formValues.lastName){this.candidate.lastName = formValues.lastName;}
    if(formValues.firstName){this.candidate.firstName = formValues.firstName;}
    if(formValues.email){this.candidate.email = formValues.email;}
    if(formValues.phone){this.candidate.phone = formValues.phone;}
    
    
  // Map infocandidate properties
  
  if(formValues.address){this.infocandidate.address = formValues.address; }
  
  if(formValues.permit){this.infocandidate.permit = formValues.permit;}
  if(formValues.age){this.infocandidate.age = formValues.age;}
  if(formValues.status){this.infocandidate.status = formValues.status;}
  if(formValues.diplome){this.infocandidate.diplome = formValues.diplome;}
  if(formValues.yearsOfExperience){this.infocandidate.yearsOfExperience = formValues.yearsOfExperience;}
  if(formValues.salary){this.infocandidate.salary = formValues.salary;}
  if(formValues.preavis){this.infocandidate.preavis = formValues.preavis;}
  if(formValues.visa){this.infocandidate.visa = formValues.visa;}
  if(formValues.mobilite){this.infocandidate.mobilite = formValues.mobilite;}
  if(formValues.autredsBoites){this.infocandidate.autredsBoites = formValues.autredsBoites;}
  if (this.compteRendu.repenseQTECHList==null) {
      // Create an array to store RepenseQTECH objects
    const listrepTECH: RepenseQTECH[] = [];
    let i=0;
    // Iterate through listequestionTECH and create RepenseQTECH objects
    for (const questionTECH of this.listequestionTECH1) {
    const techResponseControl = this.compteRenduForm.get(`techResponse_${i}`);
    const techResponseValue = techResponseControl?.value ; // Provide a default value if it's nul
    const repenseQTECH:RepenseQTECH=new RepenseQTECH();
    repenseQTECH.textRepense= techResponseValue;
    repenseQTECH.question= questionTECH;
    listrepTECH.push(repenseQTECH);
    i++;
    }
    // Create an array to store RepenseQRH objects
    const listrepRH: RepenseQRH[] = [];
    i=0
    // Iterate through listequestionRH and create RepenseQRH objects
    for (const questionRH of this.listequestionRH1) {
    const rhResponseControl = this.compteRenduForm.get(`rhResponse_${i}`);
    const rhResponseValue = rhResponseControl?.value ; // Provide a default value if it's null
    const repenseQRH: RepenseQRH = new RepenseQRH();
    repenseQRH.textRepense= rhResponseValue;
    repenseQRH.question= questionRH;
    listrepRH.push(repenseQRH);
    i++;
    }
    this.compteRendu.repenseQRHList=listrepRH;
    this.compteRendu.repenseQTECHList=listrepTECH;
  } else {
       let i=0;
       // Iterate through listequestionTECH and create RepenseQTECH objects
       for (const repenseTECH of this.compteRendu.repenseQTECHList) {
       const techResponseControl = this.compteRenduForm.get(`techResponse_${i}`);
       const techResponseValue = techResponseControl?.value ; // Provide a default value if it's nul
       if (techResponseValue) {
        this.compteRendu.repenseQTECHList[i].textRepense= techResponseValue;
       }
       i++;
       }

       i=0
       // Iterate through listequestionRH and create RepenseQRH objects
       for (const repenseRH of this.compteRendu.repenseQRHList) {
       const rhResponseControl = this.compteRenduForm.get(`rhResponse_${i}`);
       const rhResponseValue = rhResponseControl?.value ; // Provide a default value if it's null
       if (rhResponseValue) {
        this.compteRendu.repenseQRHList[i].textRepense= rhResponseValue;
       }
       
       
       i++;
       }
       
  }
   

  // Create the CompteRendu object and assign the mapped objects
  
  this.infocandidate.candidate=this.candidate;
  this.compteRendu.infocandidate=this.infocandidate;
  // get file image
  const fileInputElement = this.imageInput.nativeElement;
  const selectedImage = fileInputElement.files && fileInputElement.files[0];
  // get file cv
  const cvInputElement = this.cvInput.nativeElement;
  const selectedcv = cvInputElement.files && cvInputElement.files[0];
  // get file cr
  const crInputElement = this.crInput.nativeElement;
  const selectedcr = crInputElement.files && crInputElement.files[0];

  this.compteRenduService.createCompteRendu(this.compteRendu).subscribe(
    (data) => {
      this.compteRendu=data;
      console.log('CompteRendu saved successfully', data);
      if (selectedImage && selectedImage instanceof File) {
        this.compteRenduService.uplodImage(this.infocandidate.id,selectedImage).subscribe(
          (data) => {
            console.log('image uploded successfully', data);
              
            
          },
          (error) => {
            console.error(' image uploded error',error);
            
          });
      }
      if (selectedcv && selectedcv instanceof File) {
        this.cvFileService.uploadFile(this.infocandidate.candidate.id,selectedcv).subscribe(
          (data) => {
            console.log('cv uploded successfully', data);
              
            
          },
          (error) => {
            console.error(' cv uploded error',error);
            
          });
      }
      if (selectedcr && selectedcr instanceof File) {
        this.compteRenduService.uplode(this.compteRendu.id,selectedcr).subscribe(
          (data) => {
            console.log('compte renddu uploded successfully', data);
              
            
          },
          (error) => {
            console.error(' compte renddu uploded error',error);
            
          });
      }
      this.toastr.success('compte rendu enregistré avec succés!', 'Success');
      this.routing.navigate(['listcandidate/'+this.candidate.specialite.nom+"/"+this.candidate.specialite.id])
    },
    (error) => {
      console.error('CompteRendu saved error ',error);
      
    });
  console.log(this.compteRendu);
  }
 
}
