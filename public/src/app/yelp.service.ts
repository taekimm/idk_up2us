import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'

@Injectable()
export class YelpService {

  constructor(private _http: Http) { }
  
  getRestaurants(search){
  	return this._http.post('/api/yelpPOST', search)
  		.map( data => data.json())
  		.toPromise();
  }
}
