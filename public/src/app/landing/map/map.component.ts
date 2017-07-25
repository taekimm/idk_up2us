import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

	currPosition = {
		Lat: 34.054322,
		Long: -118.259327
	}

	testPosition = {
		Lat: 0,
		Long: 0
	}


  constructor() { }

  ngOnInit() {

  	this.test();
  	console.log(this.currPosition)
  	console.log(this.testPosition)

  	var mapProp = {
  		center: new google.maps.LatLng(this.currPosition.Lat, this.currPosition.Long),
  		zoom: 15,
  		mapTypeId: google.maps.MapTypeId.ROADMAP
  	};
  	var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  }


	c(pos){
		console.log(pos.coords.latitude)
		console.log(pos.coords.longitude)
		this.testPosition.Lat = pos.coords.latitude;
		this.testPosition.Long = pos.coords.longitude;
	}

  test(){
  	navigator.geolocation.getCurrentPosition(this.c)

  }

}
