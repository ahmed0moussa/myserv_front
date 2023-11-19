import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Calendar, CalendarOptions, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ModalDirective } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

import { Candidate } from 'src/app/services/models/candidate';
import { CandidateService } from 'src/app/services/service/candidate.service';
import { Entretien } from 'src/app/services/models/entretien';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
// calendar
calendarEvents: EventInput[]=[  
];

  editEvent: any;
  newEventDate: any;
  formEditData!: UntypedFormGroup;
  submitted = false;
  formData!: UntypedFormGroup;
  listeCandidate: Candidate[] = [];
  

  @ViewChild('eventModal', { static: false }) eventModal?: ModalDirective;

  constructor(private formBuilder: UntypedFormBuilder,private candidateService:CandidateService,private router: Router) { 
    
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getallCandidate()
      
    }, 1000);
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: this.calendarEvents,
        
      };
    }, 1200);
    
   
    
    
  }
  generateColorForRecruiter(recruiterName: string): string {
    
    const colors = ['#FF5733', '#33FF57', '#3366FF', '#FF33CC', '#33CCFF'];
    const index = recruiterName.length % colors.length;
    return colors[index];
  }
  getallCandidate() {
    let idCount = 1;
    this.candidateService.getAllCandidates().subscribe((data: Candidate[]) => {
      this.listeCandidate = data;
      this.listeCandidate.reverse();
  
      for (let i = 0; i < data.length; i++) {
        const candidate = data[i];
        
        for (let j = 0; j < candidate.listEntretien.length; j++) {
          const interview = candidate.listEntretien[j];
          const recruiterName = candidate.recruteur.firstName + ' ' + candidate.recruteur.lastName;
          const color = this.generateColorForRecruiter(recruiterName);
          this.calendarEvents.push({
            title: ' entretien '+ interview.entretienType+'| '+candidate.recruteur.firstName+' '+candidate.recruteur.lastName,
            start: interview.date+"T"+interview.time, 
            
            backgroundColor: color,
            className: ['color'],
            allDay: false,
            extendedProps: {
              candidate: candidate,
              time:interview.time,
              fullnameCandidate:candidate.firstName+' '+candidate.lastName,
              fullnameRecuteur:candidate.recruteur.firstName+' '+candidate.recruteur.lastName,
              specialite:candidate.specialite.nom,
              email:candidate.email, 
              phone:candidate.phone,
              feedback:candidate.feedback.nom,
            }
          });
        }
      }
    });
  }
  
  /***
 * Calender Set
 */
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, listPlugin, interactionPlugin, timeGridPlugin],
    headerToolbar: {
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
      center: 'title',
      left: 'prev,next today'
    },
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Use 24-hour format
    },
    initialView: 'dayGridMonth',
   
    themeSystem: "bootstrap",
    timeZone: 'local',
    droppable: true,
    editable: false,
    selectable: true,
    navLinks: true,
    select: this.openModal.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventResizableFromStart: true,
  };
  currentEvents: EventApi[] = [];

  /**
   * Event add modal
   */
  openModal(events?: any) {
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement;
    (document.querySelector(".event-details") as HTMLElement).style.display = "none";
    this.newEventDate = events;
  }

  /**
   * Event click modal show
   */
  handleEventClick(clickInfo: EventClickArg) {
    
    this.editEvent = clickInfo.event;
    
    (document.querySelector(".event-details") as HTMLElement).style.display = "block";

    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modaltitle.innerHTML = this.editEvent.title

    var startdate = document.getElementById('event-start-date-tag') as HTMLAreaElement;
    startdate.innerHTML = this.editEvent.start

    var fullnameCandidate = document.getElementById('event-fullnamecandidate-tag') as HTMLAreaElement;
    fullnameCandidate.innerHTML = this.editEvent.extendedProps['fullnameCandidate']

    var email = document.getElementById('event-email-tag') as HTMLAreaElement;
    email.innerHTML = this.editEvent.extendedProps['email']
    var phone = document.getElementById('event-phone-tag') as HTMLAreaElement;
    phone.innerHTML = this.editEvent.extendedProps['phone']
    var fullnameRecuteur = document.getElementById('event-fullnameRecuteur-tag') as HTMLAreaElement;
    fullnameRecuteur.innerHTML = this.editEvent.extendedProps['fullnameRecuteur']
    var specialite = document.getElementById('event-specialite-tag') as HTMLAreaElement;
    specialite.innerHTML = this.editEvent.extendedProps['specialite']
    var feedback = document.getElementById('event-feedback-tag') as HTMLAreaElement;
    feedback.innerHTML = this.editEvent.extendedProps['feedback']
  

   
    this.eventModal?.show();
  }
  /**
   * Events bind in calander
   * @param events events
   */
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  /**
  * Close event modal
  */
  closeEventModal() {
    this.formData = this.formBuilder.group({
      title: '',
      category: '',
      location: '',
      description: '',
      date: '',
      start: '',
      end: ''
    });
    this.eventModal?.hide();
  }
   data = JSON.parse(localStorage.getItem('token')!!);
  navigateToPage( editEvent:any) {
   
    const candidateId = editEvent.extendedProps['candidate'].id;
    const isAdmin = this.data.roles.includes('ROLE_ADMIN');
  
    // Define the route based on the condition
    const route = isAdmin ? ['/admin/compterendu', candidateId] : ['/compterendu', candidateId];
  
    // Use the Router to navigate to the specified route
    this.router.navigate(route);
  }
  

  getCountsByFeedbackType(feedbackType: string): number {
    return this.listeCandidate.filter(candidate => candidate.feedback.nom === feedbackType).length;
  }

}
