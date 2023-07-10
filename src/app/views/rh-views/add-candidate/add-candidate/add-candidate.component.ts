import { Component } from '@angular/core';

import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent {
  
  constructor(private formBuilder:FormBuilder){}
  addconditateForm!:FormGroup
  submitted=false
  selectedFileName: string | undefined;
 
  ngOnInit(){
    this.addconditateForm=this.formBuilder.group({
      lastName:['',Validators.required],
      firstName:['',Validators.required],
      date:['',[Validators.required, this.minDateValidator()]],
      time:['',Validators.required],
      post:['', Validators.required],
      file:['', Validators.required]

    })
    
  }
  
  
  minDateValidator() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00
    return (control: { value: string | number | Date; }) => {
      const selectedDate = new Date(control.value);
      return selectedDate >= today ? null : { minDate: true };
    };
  }
  onSubmit() {
    this.submitted=true
    if(this.addconditateForm.invalid){
      return
    }
  }
    
 
 
    
  
    onFileSelected(event: Event) {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        this.selectedFileName = fileInput.files[0].name;
      } else {
        this.selectedFileName = '';
      }
    }
}
