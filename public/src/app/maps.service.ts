import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'

declare var google: any;

@Injectable()
export class MapsService {

  constructor() { }
 //  createMap() {
 //  	var map;

	// var mapOptions = {
	// 	zoom: 15,
	// 	mapTypeId: google.maps.MapTypeId.ROADMAP
	// };

	// map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

	// navigator.geolocation.getCurrentPosition(function(position) {
	// 	var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	// 	var marker = new google.maps.Marker({
	// 		map: map,
	// 		position: geolocate
	// 	})

	// map.setCenter(geolocate)

	// // });
	// // return this
	// // 	.map(data => data.json())
	// // 	.toPromise()
 //  }

}
