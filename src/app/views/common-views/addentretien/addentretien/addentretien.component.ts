import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidate } from 'src/app/services/models/candidate';
import { Feedback } from 'src/app/services/models/feedback';
import { CandidateService } from 'src/app/services/service/candidate.service';
import { EntretienService } from 'src/app/services/service/entretien.service';
import { FeedBackService } from 'src/app/services/service/feedback.service';

@Component({
  selector: 'app-addentretien',
  templateUrl: './addentretien.component.html',
  styleUrls: ['./addentretien.component.css']
})
export class AddentretienComponent {
  listeFeedBack: Array<Feedback> = [];
  idCandidate!: string;
  candidate!:any;
  entretienForm!: FormGroup;
  submitted=false
  constructor(
    private routing:Router,
    private toastr:ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private feedBackService: FeedBackService,
    private candidateService: CandidateService,
    private entretienService: EntretienService
    
  ) {
    this.route.params.subscribe((data) => {
      this.idCandidate = data['idcandidate'];

      this.findListFeedback();
      this.findCandidateById();
    });
  }
  ngOnInit() {
    this.entretienForm = this.formBuilder.group({
     
      date: ["", Validators.required],
      time: ['', Validators.required],
      feedback: ['', Validators.required],  
      commentaire: ['', ],  
      entretienType: ['', Validators.required],  
      
    });
  }
  findListFeedback(): void {
    this.feedBackService.findall().subscribe((FeedBack) => {
      this.listeFeedBack = FeedBack;
    });
  }
  findCandidateById( ){
    this.candidateService.getCandidateById(this.idCandidate)
      .subscribe(candidate => {
        this.candidate = candidate;
        console.log(this.candidate)
      });
  }
  onSubmit(f:any){
    this.submitted=true
    const formValues = this.entretienForm.value;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    formValues.datecreation = formattedDate;
    console.log(formValues)
    if (this.entretienForm.valid) {
      this.entretienService.save(formValues,this.candidate.id).subscribe(
        (data)=>{
          console.log('data save successful', data);
          this.toastr.success('entretien enregistré avec succés!', 'Success');
          this.routing.navigate(['compterendu/'+this.candidate.id])
        },(error)=>{
          console.log('data not save error', error);
        }
      )
      
    }


  }
}
