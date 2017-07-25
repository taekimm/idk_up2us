import { Component, OnInit } from '@angular/core';


declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {

  	if(!!navigator.geolocation){
  		var map;

  		var mapOptions = {
  			zoom: 15,
  			mapTypeId: google.maps.MapTypeId.ROADMAP
  		};

  		map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

  		navigator.geolocation.getCurrentPosition(function(position) {
  			var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  			var marker = new google.maps.Marker({
  				map: map,
  				position: geolocate
  			})

  		map.setCenter(geolocate)

  		});

  	} else {

  		var map;

  		var mapOptions = {
  			zoom: 15,
  			mapTypeId: google.maps.MapTypeId.ROADMAP
  		};

  		map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

  		navigator.geolocation.getCurrentPosition(function(position) {
  			var geolocate = new google.maps.LatLng(34.054322, -118.259327);

  			var infowindow = new google.maps.InfoWindow({
  				map: map,
  				position: geolocate,
  				content:
  					'<h1>Default location set to Downtown Los Angeles. Please allow website to access your location</h1>'
  			})

  		map.setCenter(geolocate)

  		});
  	}

  }

}
