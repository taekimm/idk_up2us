import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
	
	userid;
	
	newSearch = {
		radius: ''
	}

	user = {
		email: '',
		password: ''
	}
  constructor() { }

  ngOnInit() {
  }

}
