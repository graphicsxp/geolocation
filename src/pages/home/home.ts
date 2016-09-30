import { Component } from '@angular/core';

import { LocationTracker } from '../../providers/location-tracker';

@Component({
  templateUrl: 'home.html',
  providers: [LocationTracker]
})
export class HomePage {

  public  myPosition: null;
  static get parameters() {
    return [[LocationTracker]];
  }

  constructor(private _tracker: LocationTracker) {
  }

  start() {
    this._tracker.startTracking().subscribe((position) => {
      console.log(JSON.stringify(position));
      this.myPosition = position;
    });
  }

  stop() {
    this._tracker.stopTracking();
  }
}
