import { Component, OnInit } from '@angular/core';
import { YelpService } from '../../yelp.service';
import { MapsService } from '../../maps.service';
import { UserService} from '../user.service';

@Component({
  selector: 'app-usermap',
  templateUrl: './usermap.component.html',
  styleUrls: ['./usermap.component.css']
})
export class MapComponent implements OnInit {
	userid;
	
	newSearch = {
		radius: .5,
		lat: 0,
		long: 0,
		categories: String,
		price: String,
		open: Boolean,	
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
					this.YelpList.push(response.jsonBody.businesses[i])
				}
				console.log(this.YelpList)
				let businessMarkers = [];
			      
			    for (let i = 0; i < this.YelpList.length; i++){
			      	
			      	var LatLng = {lat: this.YelpList[i].coordinates.latitude, lng: this.YelpList[i].coordinates.longitude}
			        
			        var testmarker = new google.maps.Marker({
			          map: this.map2,
			          title: this.YelpList[i].name,
			          position: LatLng,
			          icon: '../assets/static/images/restaurant_logo.png',
			          animation: google.maps.Animation.BOUNCE
			        });

			        businessMarkers.push(testmarker)
			      }

			    businessMarkers = shuffle(businessMarkers)

			    var pick = businessMarkers[businessMarkers.length-1]

			    var infowindow = new google.maps.InfoWindow({
			        content: pick.title
			    })

			    for (let j = 0; j < businessMarkers.length; j++) {
			    	if( j < businessMarkers.length-1){
			          setTimeout( () => {
			            businessMarkers[j].setMap(null)
			          }, 3000 + (j * 500));
			        }
			        else {
			          setTimeout( () => {
			            infowindow.open(this.map2, pick);
			          }, 3000 + ((j-1) * 500));
			        }
			    }

			    function shuffle(arr) {
			        var m = arr.length, t, i;
			        while (m) {
			          i = Math.floor(Math.random() * m--);
			          t = arr[m];
			          arr[m] = arr[i];
			          arr[i] = t
			        }
			        return arr
			    }
			})

			.catch( err => {
	  			console.log(err);
			})
	}

	applyFilter(){
		this.newSearch.radius = Math.floor(this.newSearch.radius * 1609.34)
		this.yelpService.getRestaurants(this.newSearch)
		.then(response =>{
			for (let i = 0; i < response.jsonBody.businesses.length; i++){
					this.YelpList.push(response.jsonBody.businesses[i])
				}
				console.log(this.YelpList)
				let businessMarkers = [];


			for (let j = 0; j < businessMarkers.length; j++) {
			    	if( j < businessMarkers.length-1){
			          setTimeout( () => {
			            businessMarkers[j].setMap(null)
			          }, 3000 + (j * 500));
			        }
			        else {
			          setTimeout( () => {
			            infowindow.open(this.map2, pick);
			          }, 3000 + ((j-1) * 500));
			        }
			    }

			    function shuffle(arr) {
			        var m = arr.length, t, i;
			        while (m) {
			          i = Math.floor(Math.random() * m--);
			          t = arr[m];
			          arr[m] = arr[i];
			          arr[i] = t
			        }
			        return arr
			    }
			})

			.catch( err => {
	  			console.log(err);
			})


	}
}