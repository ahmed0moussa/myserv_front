import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { loggedin } from 'src/app/services/models/loggedin';
import { AuthService } from 'src/app/services/service/auth.service';
import { SpecialiteService  } from 'src/app/services/service/specialite.service';
import { Specialite } from 'src/app/services/models/specialite';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit{
  connectedUser: loggedin = {};
  listeSpecialite: Array<Specialite> = []

  constructor(private auth: AuthService,private specialiteService: SpecialiteService ) {}
  ngOnInit(): void {
    this.findListSpecialite()
    this.connectedUser = this.auth.getConnectedUser();
    $(document).ready(() => {
      $('#sidebarToggle, #sidebarToggleTop').on('click', function(e) {
        $('body').toggleClass('sidebar-toggled');
        $('.sidebar').toggleClass('toggled');
        if ($('.sidebar').hasClass('toggled')) {
          $('.sidebar .collapse').hide();
        }
      });

      $(window).resize(() => {
        if (window.innerWidth < 768) {
          $('.sidebar .collapse').hide();
        }
        if (window.innerWidth < 480 && !$('.sidebar').hasClass('toggled')) {
          $('body').addClass('sidebar-toggled');
          $('.sidebar').addClass('toggled');
          $('.sidebar .collapse').hide();
        }
      });

      $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
        if (window.innerWidth > 768) {
          const o = (e.originalEvent as WheelEvent)?.deltaY || -(e.originalEvent as WheelEvent)?.detail;
          this.scrollTop += 30 * (o < 0 ? 1 : -1);
          e.preventDefault();
        }
      });

      $(document).on('scroll', function() {
        if (window.pageYOffset > 100) {
          $('.scroll-to-top').fadeIn();
        } else {
          $('.scroll-to-top').fadeOut();
        }
      });

      
    });
  }
  data = JSON.parse(localStorage.getItem('token')!!);
  logout() {
    this.auth.logOut();
  }
  findListSpecialite(): void {
    this.specialiteService.findall().subscribe(Specialite => {
      this.listeSpecialite = Specialite;
      
      
    });
  }

}
