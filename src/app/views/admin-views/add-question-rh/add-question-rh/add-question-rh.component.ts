import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QuestionRHService } from 'src/app/services/service/question-rh.service';

@Component({
  selector: 'app-add-question-rh',
  templateUrl: './add-question-rh.component.html',
  styleUrls: ['./add-question-rh.component.css']
})
export class AddQuestionRhComponent {
idrowdelete!:number;
myForm:any;
listequestionRH:any;
idQuestion:any;
constructor(private questionRHService: QuestionRHService,private formBuilder:FormBuilder,private toastr:ToastrService){
  this.myForm=this.formBuilder.group({
    rows:this.formBuilder.array([
    ])
  })
  this.findListQuestionRh();
}
initializeRows() {
  // Clear existing rows
  const rows = this.myForm.get('rows') as FormArray;
  while (rows.length) {
    rows.removeAt(0);
  }

  // Populate rows from listequestionRH
  for (const question of this.listequestionRH) {
    const newRow = this.formBuilder.group({
      id:question.id,
      textQuestion: question.textQuestion
    });
    rows.push(newRow);
  }
}
findListQuestionRh(){
  this.questionRHService.findAll().subscribe(
    (datta)=>{
      this.listequestionRH=datta;
      this.initializeRows();
      console.log('rh',datta)
      
    })
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
    this.questionRHService.deleteQuestion(this.idQuestion).subscribe(
      () => {
        console.log('Question deleted successfully');
        this.items.removeAt(this.idrowdelete); 
        this.toastr.success('Question deleted successfully!', 'Success');
      },
      (error) => {
        console.error('Error deleting question', error);
        this.toastr.error('Question not deleted', 'Error');
        this.items.removeAt(this.idrowdelete);
      }
    );
  }
}
onSubmit(){
  const questions: any[] = this.myForm.value.rows.map((row: any) => {
    return { textQuestion: row.textQuestion,id:row.id };
  });

  // Save all the questions
  this.questionRHService.saveAllQuestions(questions).subscribe(
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


}