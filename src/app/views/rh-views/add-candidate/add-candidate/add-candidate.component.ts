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
  selectedFileName: string | undefined;
  isLastNameInvalid(): boolean {
    return this.candidate.lastname === '' || this.candidate.lastname == null;
  }
  
    
  addCandidate(f:NgForm){
    console.log(f)
    if (f.valid) {
      // Perform form submission logic here
      console.log('Form submitted:', this.candidate);
      // You can use services or HTTP requests to handle the form submission
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
