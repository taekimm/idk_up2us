import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'

@Injectable()
export class MapsService {

  constructor(private _http: Http) { }
  getCity(lat, long) {
  	return this._http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&sensor=true")
  		.map(data => data.json())
  		.toPromise()
  }
  
  getCoordinates(){
  	return new Promise( (resolve, reject) => {
  		navigator.geolocation.getCurrentPosition( function (position) {
  			resolve(position)
  			reject(console.log('test'))
  		})
  	})
  }

}
