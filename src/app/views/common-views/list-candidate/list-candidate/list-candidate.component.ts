import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.css']
})

export class ListCandidateComponent implements AfterViewInit{
  typePoste=''
  constructor(private route:ActivatedRoute){
    this.route.params.subscribe(data=>{
      this.typePoste=data['type']
    })
  }
  ngAfterViewInit(): void {
    $(document).ready(function () {
      $('#dataTable').DataTable();
    });
  }

}
