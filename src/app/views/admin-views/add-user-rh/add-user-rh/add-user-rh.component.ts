import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loggedin } from 'src/app/services/models/loggedin';
import { RegisterService } from 'src/app/services/service/register.service';

@Component({
  selector: 'app-add-user-rh',
  templateUrl: './add-user-rh.component.html',
  styleUrls: ['./add-user-rh.component.css']
})
export class AddUserRhComponent {
  registrationForm!: FormGroup ;
  submitted=false;
  constructor(private formBuilder: FormBuilder,
    private registerService:RegisterService,
     private toastr:ToastrService,
     private router :Router 
     ){}
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      cpassword: ['', Validators.required]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      if (this.registrationForm.value.password !== this.registrationForm.value.cpassword) {
        
        this.registrationForm.get('cpassword')?.setErrors({ passwordMismatch: true });
        return; 
      }
      const formData: loggedin = this.registrationForm.value;
      this.registerService.registerRh(formData).subscribe( 
        (response) => {
        console.log('Data saved successfully!',response);
        this.toastr.success('Data saved successfully!', 'Success');
        this.router.navigate(['/admin/listuserrh']);
      },
      (error) => {
        console.error('register error', error);
        this.toastr.error('email deja exist', 'Error');
      }
      );
    }
  }
}
