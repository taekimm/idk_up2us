import { Component, OnInit } from '@angular/core';
import { MapsService } from '../maps.service';
import { YelpService } from '../yelp.service';

declare var google: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

	userid;

	radiusforsearch;

	map2;

	coordinates;

	YelpList: Array<any> = [];
	
	newSearch = {
		radius: .5,
		lat: 0,
		long: 0,
	}

	user = {
		email: '',
		password: ''
	}

	pick;

	businessList: Array<any> = [];

  constructor(
  	private _yelpService: YelpService,
  	private _mapsService: MapsService
  	) { }

  ngOnInit() {
  	this._mapsService.getCoordinates()
    .then( position => { 

      this.coordinates = position;
      this.newSearch.lat = this.coordinates.coords.latitude;
	  this.newSearch.long = this.coordinates.coords.longitude;
      
      var map;

      var mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

      this.map2 = map;

      var geolocate = new google.maps.LatLng(this.coordinates.coords.latitude, this.coordinates.coords.longitude)

      var marker = new google.maps.Marker({
        map: map,
        position: geolocate,
        icon: '../assets/static/images/person_icon.png',
        animation: google.maps.Animation.BOUNCE
      });

      map.setCenter(geolocate)
      })

    .catch(err => document.getElementById('googleMap').innerHTML = "Mamma mia! We can't access your current location! This website requires your location to run properly.")
  }

	search(){
		if (this.pick){
			this.pick.setMap(null)
		}

		this.newSearch.radius = Math.floor(this.radiusforsearch * 1609.34)
		
		if(this.newSearch.radius > 40000 ){
			this.newSearch.radius = 40000
		}
		
		this._yelpService.getRestaurants(this.newSearch)
			.then( response => {
				for (let i = 0; i < response.jsonBody.businesses.length; i++){
					this.YelpList.push(response.jsonBody.businesses[i])
				}
				this.YelpList = shuffle(this.YelpList)

				let businessMarkers = [];
			      
			    for (let i = 0; i < this.YelpList.length; i++){
			      	
			      	var LatLng = {lat: this.YelpList[i].coordinates.latitude, lng: this.YelpList[i].coordinates.longitude}
			        
			      	// var title = 
			      	// 	'<h3>' + this.YelpList[i].name + '</h3><br>' +
			      	// 	'<img style="width:150px;" src="' + this.YelpList[i].image_url + '"><br>' + 
			      	// 	'<p>Rating: ' + this.YelpList[i].rating + '</p>'

			        var testmarker = new google.maps.Marker({
			          map: this.map2,
			          // title: title,
			          position: LatLng,
			          icon: '../assets/static/images/restaurant_logo.png',
			          animation: google.maps.Animation.BOUNCE
			        });

			        businessMarkers.push(testmarker)
			      }

			    // businessMarkers = shuffle(businessMarkers)

			    this.pick = businessMarkers[businessMarkers.length-1]

			    // var infowindow = new google.maps.InfoWindow({
			    //     content: pick.title
			    // })

			    for (let j = 0; j < businessMarkers.length; j++) {
			    	if( j < businessMarkers.length-1){
			          setTimeout( () => {
			            businessMarkers[j].setMap(null)
			            this.YelpList.splice(this.YelpList[j], 1)
			          }, 3000 + (j * 500));
			        }
			        else {
			          setTimeout( () => {
			            // infowindow.open(this.map2, pick);
			            this.pick.setAnimation(null)
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

	pick_again(){
		this.search();
	}
	
}
