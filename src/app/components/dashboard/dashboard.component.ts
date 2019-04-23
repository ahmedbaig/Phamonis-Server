import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route: Router, private _auth: AuthServiceService) {}

  ngOnInit() {
    this._auth.isAuthenticated();

    this.sideNav(),
    this.sideNavToggle(),
    this.sidePanelToggle();
  }

  sideNav() {
    $('.side-nav .side-nav-menu li a').on('click', function(e) {
        $(this).parent().hasClass('open') ? $(this).parent().children('.dropdown-menu').slideUp(200, function() {
            $(this).parent().removeClass('open');
        }) : ($(this).parent().parent()
        .children('li.open')
        .children('.dropdown-menu').slideUp(200), $(this).parent().parent().children('li.open').children('a').removeClass('open'), $(this).parent().parent().children('li.open').removeClass('open'), $(this).parent().children('.dropdown-menu').slideDown(200, function() {
            $(this).parent().addClass('open');
        }));
      });
  }

  sideNavToggle() {
      $('.side-nav-toggle').on('click', function(e) {
          $('.app').toggleClass('is-collapsed'), e.preventDefault();
      });
  }

  sidePanelToggle() {
      $('.side-panel-toggle').on('click', function(e) {
          $('.side-panel').toggleClass('side-panel-open'), e.preventDefault();
      });
  }

}
