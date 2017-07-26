import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../maps.service'

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
coordinates;
test = [
  {name: 'Wild Carvery',
  position: {lat: 34.180654 , lng: -118.308667 },
  },
  {name: 'Flavor of India',
  position: {lat: 34.1813745 , lng: -118.3104111 },
  },
  {name: "Ike's",
  position: {lat: 34.1826232 , lng: -118.3107433 },
  },
  {name: "Kabuki",
  position: {lat: 34.181598 , lng: -118.309924 },
  },
  {name: "PizzaRev",
  position: {lat: 34.182149 , lng: -118.311350 },
  },
  {name: "Chipotle",
  position: {lat: 34.181891 , lng: -118.311340 },
  },
  {name: "CPK",
  position: {lat: 34.184474 , lng: -118.314097 },
  },
]

  constructor(private _mapsService: MapsService) { 
  }


  ngOnInit() {
    this._mapsService.getCoordinates()
    .then( position => { 
      this.coordinates = position;
      var map;

      var mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

      var geolocate = new google.maps.LatLng(this.coordinates.coords.latitude, this.coordinates.coords.longitude)

      var marker = new google.maps.Marker({
        map: map,
        position: geolocate,
        icon: '../assets/static/images/person_icon.png',
        animation: google.maps.Animation.BOUNCE
      });

      let markerarray = [];

      for (let i = 0; i < this.test.length; i++){
        var testmarker = new google.maps.Marker({
          map: map,
          title: this.test[i].name,
          position: this.test[i].position,
          icon: '../assets/static/images/restaurant_logo.png',
          animation: google.maps.Animation.BOUNCE
        });
        markerarray.push(testmarker)
      }

      markerarray = shuffle(markerarray)

      var pick = markerarray[markerarray.length-1]

      var infowindow = new google.maps.InfoWindow({
        content: pick.title
      })

      for (let j = 0; j < markerarray.length; j++) {
        if( j < markerarray.length-1){
          setTimeout( () => {
            markerarray[j].setMap(null)
          }, 3000 + (j * 1000));
        }
        else {
          setTimeout( () => {
            infowindow.open(map, pick);
          }, 3000 + ((j-1) * 1000));
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

      map.setCenter(geolocate)

    })

    .catch(err => document.getElementById('googleMap').innerHTML = "Mamma mia! We can't access your current location! This website requires your location to run properly.")


  }

}
