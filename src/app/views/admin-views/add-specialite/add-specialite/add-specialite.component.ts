import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Specialite } from 'src/app/services/models/specialite';
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
constructor(private toastr:ToastrService,private specialiteService: SpecialiteService,private formBuilder:FormBuilder){
  this.myForm=this.formBuilder.group({
    rows:this.formBuilder.array([
      this.formBuilder.group({
        textQuestion:'aahd'
      }),
      this.formBuilder.group({
        textQuestion:'aadfh'
      }),
    ])
  })
}

ngOnInit(): void {
  this.findListSpecialite();
  this.registrationForm = this.formBuilder.group({
    nom: ['', Validators.required],
    
  });
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
setiddelete(i:number){
  this.idrowdelete=i;
}
deleteRow(){
  this.items.removeAt(this.idrowdelete)
}
onSubmit(){
  console.log(this.myForm.value);
}
selectPoste(selectedValue: any){
  console.log('Selected value:', selectedValue);
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
