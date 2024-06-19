import { Component, OnInit, ViewChild } from '@angular/core';
import { DxMapComponent } from 'devextreme-angular/ui/map';
import { LoadOptions } from 'devextreme/data';
import { VehiclesService } from 'src/app/shared/data/vehicles.service';
import { VEHICLE_STATUS } from 'src/app/shared/infrastructure/enums';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  constructor(private vehiclesService: VehiclesService) { }


  keys = {
    google: "AIzaSyC8rIDtStz4O9N7-2nFW8LyKiVGez2W3wE",
  };

  //mapMarkerUrl = "https://js.devexpress.com/Demos/RealtorApp/images/map-marker.png";
  mapMarkerRed = "/assets/img/map-marker-red.png";
  mapMarkerGreen = "/assets/img/map-marker-green.png";
  mapMarkerMe = "/assets/img/map-marker-me.png";
  centerPoint: any = "Baghdad";
  //centerPoint =  { lat: 33.3152, lng: 44.3661 };

  @ViewChild("map", { static: false }) map?: DxMapComponent;

  markers: any[] = [];
  vehicles: any[] = [];

  providerPopup: boolean = false;
  providerForm: any = {};

  ngOnInit() {
    this.getMyLocation();
    this.getData().then(() => {
      this.setMarkers();
    });
  }

  async getData() {
    var loadOptions: LoadOptions = {
      skip: 0,
      take: 1000,
    };

    var res: any = await this.vehiclesService.get(loadOptions);
    this.vehicles = res.data;
  }

  onContentReady(args: any) {
    var html = args.component.content();
    html.style.padding = "15px";
  }

  getMyLocation() {
    var that = this;
    navigator.geolocation.getCurrentPosition(
      function showPosition(position) {
        that.setMyMark(that, position.coords.latitude, position.coords.longitude);
      },
      function error(e) {
        console.log(e);
      },
      { maximumAge: 50000, timeout: 20000, enableHighAccuracy: true }
    );
  }

  setMarkers() {
    var that = this;
    this.vehicles.forEach(x => {
      if (x.location) {
        var lat = x.latitude;
        var lng = x.longitude;
        this.markers.push({
          id: x.id,
          iconSrc: x.status == VEHICLE_STATUS.active ? this.mapMarkerGreen : this.mapMarkerRed,
          location: [lat, lng],
          tooltip: {
            isShown: false,
            text: x.title
          },
          onClick: function () {
            if (x.type == 1) {
              that.showDetailsPopup(x);
            }
          }
        });
      }
    });
  }

  myMark: any;
  setMyMark(that: any, lat: number, lng: number) {
    console.log(lat + "," + lng);
    that.myMark = {
      lat: lat,
      lng: lng
    };
    that.markers.push({
      iconSrc: this.mapMarkerMe,
      location: [lat, lng],
      tooltip: {
        isShown: true,
        text: "My Location"
      },
      onClick: function () { }
    });
    that.centerPoint = that.myMark;
  }

  showDetailsPopup(x: any) {
  }

  onItemClick(e: any) {
    var marker = this.markers.find(x => x.id == e.itemData.id);
    if (marker) {
      this.centerPoint = {
        lat: marker.location[0],
        lng: marker.location[1]
      };
      marker.tooltip.isShown = true;
      // this.map.instance.option("markers", this.markers)
      this.map?.instance.option("zoom", 14)
      // this.showDetailsPopup(e.itemData);
    }
  }

  findMyLocation(e: any) {
    this.centerPoint = this.myMark;
    this.map?.instance.option("zoom", 14)
  }



}
