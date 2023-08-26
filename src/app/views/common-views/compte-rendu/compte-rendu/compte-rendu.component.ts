import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entretien } from 'src/app/services/models/entretien';
import { Feedback } from 'src/app/services/models/feedback';
import { QuestionTECH } from 'src/app/services/models/question-tech.model';

import { CvFileService } from 'src/app/services/service/cv-file.service';
import { EntretienService } from 'src/app/services/service/entretien.service';
import { FeedBackService } from 'src/app/services/service/feedback.service';
import { QuestionTECHService } from 'src/app/services/service/question-tech.service';

@Component({
  selector: 'app-compte-rendu',
  templateUrl: './compte-rendu.component.html',
  styleUrls: ['./compte-rendu.component.css']
})
export class CompteRenduComponent {
  
  ImageUrl: string | ArrayBuffer | null = null;
  selectedFileName: string | undefined;
  selectedcvName: string | undefined;
  captionText: string | undefined;
  entretien: Entretien = {};
  listequestionTECH: any;
  @ViewChild('myModal') modalRef!: ElementRef;
  idcanditate!:string
  listeFeedBack: Array<Feedback> = []
  
  constructor(private route:ActivatedRoute,
    private entretienService: EntretienService,
     private cvFileService :CvFileService,
     private questionTECHService: QuestionTECHService,
     private feedBackService:FeedBackService
      ){
    this.route.params.subscribe(data=>{
      
      this.idcanditate=data['idcandidate']
      
      this.findListFeedback();
      this.findEntretienbyId(this.idcanditate);
       
       
    })
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
  findEntretienbyId(idCanditate:string){
    this.entretienService.findbyId(idCanditate).subscribe(entretien => {
      this.entretien = entretien || {};
      console.log(entretien)
      if (entretien.specialite && entretien.specialite.id) {
      const specialiteId =entretien.specialite.id
      
      this.questionTECHService.findBySpecialite(specialiteId).subscribe(questionTECH => {
      this.listequestionTECH = questionTECH ;
      
      for (let i = 0; i < this.listequestionTECH.length; i++) {
        this.listequestionTECH[i].textQuestion = `Q${i + 1} . ${this.listequestionTECH[i].textQuestion}`;
      }
    });
  }
    });
  }
  findListFeedback(): void {
    this.feedBackService.findall().subscribe(FeedBack => {
      this.listeFeedBack = FeedBack;
      
      
    });
  }
  closeModal() {
    const modal = this.modalRef.nativeElement as HTMLElement;
    modal.style.display = 'none';
  }

}

