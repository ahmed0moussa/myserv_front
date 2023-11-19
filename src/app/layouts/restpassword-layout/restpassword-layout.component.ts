import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PasswordRequestUtil } from 'src/app/services/models/PasswordRequestUtil';
import { RegisterService } from 'src/app/services/service/register.service';

@Component({
  selector: 'app-restpassword-layout',
  templateUrl: './restpassword-layout.component.html',
  styleUrls: ['./restpassword-layout.component.css']
})
export class RestpasswordLayoutComponent {
  email: string = '';
  showPassword: boolean = false;
  showcPassword: boolean = false;
  token!: string;
  restpassForm!: FormGroup;
  submitted!: boolean;
  errorMessage!: string;
  
  passwordRequestUtil:PasswordRequestUtil= new PasswordRequestUtil()
  constructor(private router: Router,private toastr:ToastrService,private formBuilder: FormBuilder,private route:ActivatedRoute,private registerService: RegisterService) {
    this.route.params.subscribe(data=>{
      this.token=data['token']
      this.passwordRequestUtil.codeemail=this.token;
    })
  }
  ngOnInit(): void {
    this.restpassForm = this.formBuilder.group({
      
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      cpassword: ['', Validators.required]
    });
  }
  
  submit() {
    this.submitted = true;
    if (this.restpassForm.valid) {
      if (this.restpassForm.value.password !== this.restpassForm.value.cpassword) {
        
        this.restpassForm.get('cpassword')?.setErrors({ passwordMismatch: true });
        return; 
      }
    const formData = this.restpassForm.value;
    this.passwordRequestUtil.newPassword=formData.password;
    console.log(this.passwordRequestUtil);

    this.registerService.resetPasswordWithToken( this.passwordRequestUtil).subscribe(
      (response) => {
       this.handleSuccessResponse(response);
        
      },
      error => {
        this.handleErrorResponse(error)
      }
    );
    
    
  
  }

  }
  private handleSuccessResponse(response:any) {
     console.log('User updated successfully'+response);
        this.toastr.success('mot de passe modifier avec succés!', 'Success');
        this.router.navigate(['/login']);
    
  }

  private handleErrorResponse(error: any) {
    if (error.error.text == 'Password has been reset successfully') {
      this.toastr.success('mot de passe modifier avec succés!', 'Success');
      this.router.navigate(['/login']);
      
    } else  {
      this.errorMessage="réinitialisation de mot de passe invalide"
      
    }

    console.error('Error while sending password reset request', error);
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  togglecPasswordVisibility() {
    this.showcPassword = !this.showcPassword;
  }

}
