import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { ActivatedRoute } from '@angular/router';
import { EntretienService } from 'src/app/services/service/entretien.service';
import { Entretien } from 'src/app/services/models/entretien';

@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.css']
})

export class ListCandidateComponent implements AfterViewInit,OnInit {
  listeEntretien: Array<Entretien> = []
  errorMsg = ''
  typePoste = ''
  
  constructor(private route:ActivatedRoute,private entretienService: EntretienService){
    this.route.params.subscribe(data=>{
      this.typePoste=data['type']
    })
  }
  ngOnInit(): void {
    this.findListEntretien();
  }
  ngAfterViewInit(): void {
    
    $(document).ready(function () {
      $('#dataTable').DataTable();
    });
  }
  findListEntretien(): void {
    this.entretienService.findall().subscribe(entretien => {
      this.listeEntretien = entretien;
    });
  }
}
