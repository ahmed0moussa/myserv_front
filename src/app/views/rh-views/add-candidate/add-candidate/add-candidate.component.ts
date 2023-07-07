import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent {
  candidate = {
    name: '',
    lastname: '',
    date: '',
    time: '',
    file: null
  };

 
  
    
  addCandidate(f:NgForm){
    console.log(f)
    if (f.valid) {
      // Perform form submission logic here
      console.log('Form submitted:', this.candidate);
      // You can use services or HTTP requests to handle the form submission
    }
  }
  uploadedFiles: File[] = [];

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadedFiles.push(file);
  }
}
