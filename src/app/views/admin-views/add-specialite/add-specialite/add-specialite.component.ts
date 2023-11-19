import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Specialite } from 'src/app/services/models/specialite';
import { QuestionTECHService } from 'src/app/services/service/question-tech.service';
import { SpecialiteService } from 'src/app/services/service/specialite.service';

@Component({
  selector: 'app-add-specialite',
  templateUrl: './add-specialite.component.html',
  styleUrls: ['./add-specialite.component.css']
})
export class AddSpecialiteComponent {
  registrationForm!: FormGroup ;
  idrowdelete!:number
  myForm:any;
  submitted=false;
  listeSpecialite: Array<Specialite> = []
  posteSelected:any;
  listequestionTECH:any;
  idQuestion!:string;
constructor(private questionTECHService: QuestionTECHService,private toastr:ToastrService,private specialiteService: SpecialiteService,private formBuilder:FormBuilder){
  this.myForm=this.formBuilder.group({
    rows:this.formBuilder.array([
      
      
    ])
  })
}

ngOnInit(): void {
  this.findListSpecialite();
  this.registrationForm = this.formBuilder.group({
    nom: ['', Validators.required],
    
  });
}
findListQuestionRh(){
  this.questionTECHService.findBySpecialite(this.posteSelected).subscribe(
    (datta)=>{
      this.listequestionTECH=datta;
      this.initializeRows();
      console.log('tech',datta)
      
    })
}
initializeRows() {
  // Clear existing rows
  const rows = this.myForm.get('rows') as FormArray;
  while (rows.length) {
    rows.removeAt(0);
  }

  // Populate rows from listequestionRH
  for (const question of this.listequestionTECH) {
    const newRow = this.formBuilder.group({
      id:question.id,
      textQuestion: question.textQuestion
    });
    rows.push(newRow);
  }
}
findListSpecialite(): void {
  this.specialiteService.findall().subscribe(Specialite => {
    this.listeSpecialite = Specialite;
    console.log(this.listeSpecialite)
  });
}
get items(){
  return this.myForm.get('rows')as FormArray

}
addnew(){
  let newrow=this.formBuilder.group({
    textQuestion:''
  })
  this.items.push(newrow);
}
setiddelete(i:number,idQuestion:string){
  this.idrowdelete=i;
  this.idQuestion=idQuestion;
}
deleteRow(){
  if (this.idQuestion) {
    this.questionTECHService.deleteQuestion(this.idQuestion).subscribe(
      () => {
        console.log('Question deleted successfully');
        this.items.removeAt(this.idrowdelete); 
        this.toastr.success('Question deleted successfully!', 'Success');
      },
      (error) => {
        console.error('Error deleting question', error);
        this.toastr.error('Question not deleted', 'Error');
        
      }
    );
    
  }
}
onSubmit(){
  console.log(this.myForm.value);
  const questions: any[] = this.myForm.value.rows.map((row: any) => {
    return { textQuestion: row.textQuestion,id:row.id,specialite:row.specialite};
  });

  // Save all the questions
  this.questionTECHService.saveAll(questions,this.posteSelected).subscribe(
    (response) => {
      console.log('Questions saved successfully', response);
      this.findListQuestionRh();
      this.initializeRows();
      this.toastr.success('Questions saved successfully!', 'Success');
    },
    (error) => {
      console.error('Error saving questions', error);
      this.toastr.error('Questions not saved', 'Error');
      
    }
  );

}

selectPoste(selectedValue: any){
  this.posteSelected=selectedValue;
  this.findListQuestionRh();
}
addSpecialte(){
  this.submitted=true;
  if (this.registrationForm.valid) {
    const formData: Specialite = this.registrationForm.value;
      this.specialiteService.save(formData).subscribe( 
        (response) => {
        console.log('Data saved successfully!',response);
        this.toastr.success('Specialte saved successfully!', 'Success');
        this.findListSpecialite()
        this.submitted=false;
        this.registrationForm.reset();
      },
      (error) => {
        console.error('register error', error);
        this.toastr.error('data not saved', 'Error');
      }
      );
  }
}

}
