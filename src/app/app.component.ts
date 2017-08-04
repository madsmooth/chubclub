import { Component, ViewChild}          from '@angular/core';
import { MdSidenav } from '@angular/material';
import { Router }            from '@angular/router';

import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'my-app',
  template: `
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
			<link href="deeppurple-amber.css" rel="stylesheet">
			<md-sidenav-container>
				<md-sidenav #sidenav mode="side" class="app-sidenav">
					<div class="my-sidebar">
						<div class="logo">
							<p class="my-sidebar-text">{{title}}</p>
						</div>
						<div class="login"><img src="{{userPicture}}" class="my-sidebar-image"><p class="loginText">{{userName}}</p><p class="loginText">{{userEmail}}</p></div>
						
						<div md-button  class="sidelink" (click)="leaderboard()">Leaderboard</div>
						<div md-button class="sidelink" (click)="measurements()">Measurements</div>
						<div md-button class="sidelink" (click)="add()">Add Measurement</div>
						<div md-button class="sidelink" (click)="rules()">Rules & Regulations</div>
						<div md-button class="sidelink" (click)="faq()">FAQ</div>


						<div md-button  *ngIf="isAdmin==true" class="sidelink"><a href="v.php?t=USER_ACCESS">User Access</a></div>
						<div md-button  *ngIf="isAdmin==true" class="sidelink"><a href="v.php?t=setting">Settings</a></div>
						<div md-button  *ngIf="isAdmin==true" class="sidelink"><a href="127.0.0.1">DB</a></div>
					
						<div md-button class="sidelink"></div>
						<div md-button class="login"><a href="http://thechub.club/oauth2callback/?reset=1">LOG OUT</a></div>
					</div>
				</md-sidenav>
				<md-toolbar color="primary" class="md2 md-toolbar md-primary paper-shadow"><div class="md-toolbar-layout">
					<md-toolbar-row>
						<button _ngcontent-yao-1 class="app-icon-button" (click)="sidenav.toggle()">
							<i _ngcontent-yao-1 class="material-icons app-toolbar-menu">menu</i>
						</button>
						{{title}}
						<span  class="app-toolbar-filler"></span>
					</md-toolbar-row></div>
				</md-toolbar>
				<div class="my-card-space">
					<router-outlet></router-outlet>
				</div>
				</md-sidenav-container>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	
  title = 'Chub Club';
  userEmail = 'user@email.com';
  userPicture = 'photo.jpg';
  userName = 'Chub User1';
  isAdmin = true;
  @ViewChild('sidenav') sidenav: MdSidenav;
  
  constructor(private router: Router,
			  private cookieService:CookieService){
			  
	var tempCookieValue = this.cookieService.get('e'); //Get Oauth2 authentication data from the PHP stored cookie
	if(tempCookieValue)
	{
		this.userEmail = tempCookieValue;
	}
	
	tempCookieValue = this.cookieService.get('n');
	if(tempCookieValue)
	{
		this.userName = tempCookieValue.replace('+',' ');
	}
	
	tempCookieValue = this.cookieService.get('u');
	if(tempCookieValue)
	{
		this.userPicture = tempCookieValue;
	}
	
	tempCookieValue = this.cookieService.get('a'); //elevated privledges assigned to an account
	if(tempCookieValue)
	{
		var trueString = 'TRUE';
		this.isAdmin = parseInt(tempCookieValue)==1;
	}
	
  }  
    
  add(): void {
	this.sidenav.close();
    this.router.navigate(['/add']);
  }
  
  leaderboard(): void {
	this.sidenav.close();
    this.router.navigate(['/leaderboard']);
  }
  
  measurements(): void {
	this.sidenav.close();
    this.router.navigate(['/measurements']);
  }
   
  rules(): void {
	this.sidenav.close();
    this.router.navigate(['/rules']);
  }
  
  faq(): void {
	this.sidenav.close();
    this.router.navigate(['/faq']);
  }
  
  graphs(): void {
	this.sidenav.close();
    this.router.navigate(['/graphs']);
  }
}
