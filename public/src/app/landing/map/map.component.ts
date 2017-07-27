import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MapsService } from '../../maps.service'

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
coordinates;
// userzipcode;
// test = [

// ]

  @Output() LocationtoParent = new EventEmitter()

  constructor(private _mapsService: MapsService) { 
  }


  ngOnInit() {
    
    this._mapsService.getCoordinates()
    .then( position => { 
      this.coordinates = position;

      this.LocationtoParent.emit(position);
      
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

      // //code for post-business find
      // let businessMarkers = [];

      // for (let i = 0; i < this.buisness_List.length; i++){
      //   var testmarker = new google.maps.Marker({
      //     map: map,
      //     title: this.buisness_List[i].name,
      //     position: this.buisness_List[i].position,
      //     icon: '../assets/static/images/restaurant_logo.png',
      //     animation: google.maps.Animation.BOUNCE
      //   });
      //   businessMarkers.push(testmarker)
      // }

      // businessMarkers = shuffle(businessMarkers)

      // var pick = businessMarkers[businessMarkers.length-1]

      // var infowindow = new google.maps.InfoWindow({
      //   content: pick.title
      // })

      // for (let j = 0; j < businessMarkers.length; j++) {
      //   if( j < businessMarkers.length-1){
      //     setTimeout( () => {
      //       businessMarkers[j].setMap(null)
      //     }, 3000 + (j * 1000));
      //   }
      //   else {
      //     setTimeout( () => {
      //       infowindow.open(map, pick);
      //     }, 3000 + ((j-1) * 1000));
      //   }
      // }

      // function shuffle(arr) {
      //   var m = arr.length, t, i;
      //   while (m) {
      //     i = Math.floor(Math.random() * m--);
      //     t = arr[m];
      //     arr[m] = arr[i];
      //     arr[i] = t
      //   }
      //   return arr
      // }
      // //code for post-buisness find

      map.setCenter(geolocate)

      //code for finding zipcode (no longer needed)
      // this._mapsService.getCity(this.coordinates.coords.latitude, this.coordinates.coords.longitude)
      //   .then( data => {
      //     var address = data.results[0].address_components
      //     var zipcode = address[address.length - 1].long_name
      //     this.userzipcode = zipcode          
      //   })
      //   .catch( err => console.log(err))

    })

    .catch(err => document.getElementById('googleMap').innerHTML = "Mamma mia! We can't access your current location! This website requires your location to run properly.")

  }
  test(businesslist){
    console.log('received from parent')
  }

  MakeBuisnessMap(businessList){
      console.log('received from parent')
      let business_List = businessList;
      console.log(business_List)

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

      // //code for post-business find
      let businessMarkers = [];

      for (let i = 0; i < business_List.length; i++){
        var testmarker = new google.maps.Marker({
          map: map,
          title: business_List[i].name,
          position: business_List[i].position,
          icon: '../assets/static/images/restaurant_logo.png',
          animation: google.maps.Animation.BOUNCE
        });
        businessMarkers.push(testmarker)
      }

      businessMarkers = shuffle(businessMarkers)
      console.log(businessMarkers)

      var pick = businessMarkers[businessMarkers.length-1]

      var infowindow = new google.maps.InfoWindow({
        content: pick.title
      })

      for (let j = 0; j < businessMarkers.length; j++) {
        if( j < businessMarkers.length-1){
          setTimeout( () => {
            businessMarkers[j].setMap(null)
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
      // //code for post-buisness find

      map.setCenter(geolocate)
  }

}
