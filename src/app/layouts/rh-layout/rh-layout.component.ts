import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-rh-layout',
  templateUrl: './rh-layout.component.html',
  styleUrls: ['./rh-layout.component.css']
})
export class RhLayoutComponent implements OnInit{
  ngOnInit(): void {
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
}
