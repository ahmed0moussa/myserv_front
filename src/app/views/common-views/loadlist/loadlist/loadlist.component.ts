import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loadlist',
  templateUrl: './loadlist.component.html',
  styleUrls: ['./loadlist.component.css']
})
export class LoadlistComponent {
typePost='';
  idPost='';
constructor(private route:ActivatedRoute,private routing:Router){
  this.route.params.subscribe(data=>{
    this.typePost=data['type']
    this.idPost=data['idtype']
    
    
  })
  setTimeout(() => {
  this.routing.navigate(['listcandidate/'+this.typePost+"/"+this.idPost])
}, 200);
}

}
