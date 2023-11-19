import { Component } from '@angular/core';

import { RegisterService } from 'src/app/services/service/register.service';

@Component({
  selector: 'app-auth-reset-request-layout',
  templateUrl: './auth-reset-request-layout.component.html',
  styleUrls: ['./auth-reset-request-layout.component.css']
})
export class AuthResetRequestLayoutComponent {
  constructor(private registerService: RegisterService) {}
  errorMessage!: string;
  okMessage!:string;
  email: string = '';
  isButtonDisabled: boolean = false;
  countdownTimer: any;
  countdown: number = 300;
  submit() {
    this.registerService.resetPasswordRequest(this.email).subscribe(
      (response:string) => {
        console.log('Password reset request sent successfully: ' + response);
        this.handleSuccessResponse();
        // Handle the response as needed
      },
      (error) => {
        this.handleErrorResponse(error);
        
      }
    );

  }
  private handleSuccessResponse() {
    this.okMessage = 'Demande de réinitialisation du mot de passe envoyée par e-mail';
    this.errorMessage = '';
    this.disableButtonFor5Minutes();
  }

  private handleErrorResponse(error: any) {
    if (error.error.text == 'Demande de réinitialisation du mot de passe envoyée par e-mail') {
      this.okMessage = 'Demande de réinitialisation du mot de passe envoyée par e-mail';
      this.errorMessage = '';
      this.disableButtonFor5Minutes();
    } else {
      this.errorMessage = 'Utilisateur introuvable';
      this.okMessage = '';
    }

    console.error('Error while sending password reset request', error);
  }

  private disableButtonFor5Minutes() {
    this.isButtonDisabled = true;
    this.countdownTimer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.isButtonDisabled = false;
        clearInterval(this.countdownTimer);
        this.countdown = 300; // Reset the countdown for future use
      }
    }, 1000);
  }

}
