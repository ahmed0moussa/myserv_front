import { Component } from '@angular/core';

@Component({
  selector: 'app-list-user-rh',
  templateUrl: './list-user-rh.component.html',
  styleUrls: ['./list-user-rh.component.css']
})
export class ListUserRhComponent {
  password!: string;
  showPassword: boolean = false;
  data = [
    { name: 'Sawssen HASSAYOUNE', email: 'Sawssen.hassayoune@myserv.com', password: 'azerty', isDisabled: true, showPassword: false },
    { name: 'Hanine BADRI', email: 'hanine.badri@myserv.com', password: '', isDisabled: true, showPassword: false }
  ];
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  edit(item: any) {
    item.isDisabled = false;
  }

  save(item: any) {
    item.isDisabled = true;
  }

  delete(item: any) {
    // Perform delete operation
  }
}
