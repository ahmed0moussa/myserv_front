import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntretienService } from 'src/app/services/service/entretien.service';
import { Entretien } from 'src/app/services/models/entretien';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.css']
})

export class ListCandidateComponent implements OnInit,OnDestroy,OnChanges {
  dtoptions:DataTables.Settings={};
  listeEntretien: Array<Entretien> = []
  errorMsg = ''
  typePost = ''
  idPost=''
  dtTrigger:Subject<any>=new Subject<any>();
  dataTable: any;

  constructor(private route:ActivatedRoute,private entretienService: EntretienService){
    this.route.params.subscribe(data=>{
      console.log('constructor')
      this.typePost=data['type']
      this.idPost=data['idtype']
      this.findListEntretien(); // Call the method when idPost changes
      const newIdPost: string = data['idtype'];
      if (this.idPost !== newIdPost) {
        this.idPost = newIdPost;
        this.destroyDataTable(); // Destroy the DataTable before reinitializing
        this.findListEntretien(); // Call the method when idPost changes
        this.clearData();
      }
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.destroyDataTable();
    this.clearData();
    console.log('ngOnChanges')
  }
  ngOnDestroy(): void {
    this.destroyDataTable();
    this.clearData();
    console.log('ngOnDestroy')
    
    
  }
  ngOnInit(): void {
    this.dtoptions={
      pagingType:'simple_numbers'
    }
   
  }
  
  findListEntretien(): void {
    this.entretienService.findbyspecialite(this.idPost).subscribe(entretien => {
      this.listeEntretien = entretien ;
      console.log(entretien)
      this.dtTrigger.next(null);
      setTimeout(() => {
        this.initializeDataTable(); // Initialize DataTable after updating the data
      });
    });
  }
  initializeDataTable(): void {
    this.dataTable = $('#DataTables_Table_0').DataTable(this.dtoptions);
  }
  destroyDataTable(): void {
    if (this.dataTable) {
      this.dataTable.clear().destroy();
      this.dataTable.search('');
      $.fn.dataTable.ext.errMode = 'none';
      this.dataTable = null;
    }
  }
  clearData(): void {
    this.listeEntretien = []; // Clear the data array
  }
}
