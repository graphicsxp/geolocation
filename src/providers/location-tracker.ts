import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Geolocation, BackgroundGeolocation } from 'ionic-native';
/*
  Generated class for the LocationTracker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationTracker {

  private _positionObserver;
  private _position;
  private _watch;

  constructor(public http: Http) {
    this._positionObserver = null;
    this._position = Observable.create(observer => {
      this._positionObserver = observer;
    });
  }

  startTracking() {
    // In App Tracking

    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this._watch = Geolocation.watchPosition(options);

    this._watch.subscribe((data) => {
      console.log('coords: ' + data.coords);
      console.log('coords: ' + data.coords.latitude);
      this.notifyLocation(data.coords);
    });

    // Background Tracking

    let backgroundOptions = {
      desiredAccuracy: 10,
      stationaryRadius: 10,
      distanceFilter: 30
    };

    BackgroundGeolocation.configure((location) => {
      this.notifyLocation(location);
    }, (err) => {
      console.log(err);
    }, backgroundOptions);

    BackgroundGeolocation.start();

    return this._position;

  }

  stopTracking() {
    BackgroundGeolocation.finish();
    this._watch.unsubscribe();
  }

  notifyLocation(location) {
    this._positionObserver.next(location);
  }
}
