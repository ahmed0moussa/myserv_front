import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
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
constructor(private questionRHService: QuestionRHService,private formBuilder:FormBuilder){
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
setiddelete(i:number){
  this.idrowdelete=i;
}
deleteRow(){
  this.items.removeAt(this.idrowdelete)
}
onSubmit(){
  console.log(this.myForm.value);
}
}
