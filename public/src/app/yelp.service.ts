import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import 'rxjs'

@Injectable()
export class YelpService {
	listObservable = new BehaviorSubject(null);

  constructor(private _http: Http) { }
  
  getRestaurants(search){
  	return this._http.post('/api/yelpPOST', search)
  		.map( data => data.json())
  		.toPromise();
  }

  updateList(list) {
  	this.listObservable.next(list);
  }
}
