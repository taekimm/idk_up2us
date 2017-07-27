import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { YelpService } from '../yelp.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
	
	userid;
	
	newSearch = {
		radius: .5,
		lat: 0,
		long: 0
	}

	user = {
		email: '',
		password: ''
	}

	businessList: Array<any> = [];

	@Output() BiztoChild = new EventEmitter()

  constructor(private _yelpService: YelpService) { }

  ngOnInit() {
  }

	getLocation(coordinates){
		this.newSearch.lat = coordinates.coords.latitude;
		this.newSearch.long = coordinates.coords.longitude;
	}

	search(){
		this.newSearch.radius = Math.floor(this.newSearch.radius * 1609.34)
		this._yelpService.getRestaurants(this.newSearch)
			.then( response => {
				for (let i = 0; i < response.jsonBody.businesses.length; i++){
					this.businessList.push(response.jsonBody.businesses[i])
				}
				console.log('emitting to child')
				this.BiztoChild.emit(this.businessList)
				console.log('emitted to child')
			})
			.catch( err => {
	  			console.log(err);
			})
	}
}
