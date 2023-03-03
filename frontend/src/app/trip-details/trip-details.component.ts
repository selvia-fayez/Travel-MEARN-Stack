import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../services/tour.service';
import {} from 'googlemaps';
import { ReviewService } from '../services/review.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css'],
})
export class TripDetailsComponent {
  /**
   * @license
   * Copyright 2019 Google LLC. All Rights Reserved.
   * SPDX-License-Identifier: Apache-2.0
   */

  // @ts-nocheck TODO remove when fixed

  map: google.maps.Map | undefined;
  marker: google.maps.Marker | undefined;
  geocoder: google.maps.Geocoder | undefined;
  responseDiv: HTMLDivElement | undefined;
  response: HTMLPreElement | undefined;
  ngAfterViewInit(): void {
    // Load google maps script after view init
    const DSLScript = document.createElement('script');
    DSLScript.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBqimLnK8l3nS4EKjjm2oE5jG0kvOQjhVA&v=weekly'; // replace by your API key
    DSLScript.type = 'text/javascript';
    document.body.appendChild(DSLScript);
    // document.body.removeChild(DSLScript);
  }
  initMap(): void {
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 },
        mapTypeControl: false,
      }
    );
    this.geocoder = new google.maps.Geocoder();

    const inputText = document.createElement('input');

    inputText.type = 'text';
    inputText.placeholder = 'Enter a location';

    const submitButton = document.createElement('input');

    submitButton.type = 'button';
    submitButton.value = 'Geocode';
    submitButton.classList.add('button', 'button-primary');

    const clearButton = document.createElement('input');

    clearButton.type = 'button';
    clearButton.value = 'Clear';
    clearButton.classList.add('button', 'button-secondary');

    this.response = document.createElement('pre');
    this.response.id = 'response';
    this.response.innerText = '';

    this.responseDiv = document.createElement('div');
    this.responseDiv.id = 'response-container';
    this.responseDiv.appendChild(this.response);

    const instructionsElement = document.createElement('p');

    instructionsElement.id = 'instructions';

    instructionsElement.innerHTML =
      '<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.';

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(
      instructionsElement
    );
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(
      this.responseDiv
    );

    // this.marker = new google.maps.Marker({
    //   this.map.controls
    // });

    this.map.addListener('click', (e: google.maps.MapMouseEvent) => {
      this.geocode({ location: e.latLng });
    });

    submitButton.addEventListener('click', () =>
      this.geocode({ address: inputText.value })
    );

    // clearButton.addEventListener("click", () => {
    //   this.clear();
    // });

    //    this.clear();
  }

  //  clear() {
  //   this.marker.setMap(null);
  //   this.responseDiv.style.display = "none";
  // }

  geocode(request: google.maps.GeocoderRequest): void {
    // clear();

    this.geocoder?.geocode(request, (result) => {
      const { ...results } = result;

      this.map?.setCenter(results[0].geometry.location);
      this.marker?.setPosition(results[0].geometry.location);
      this.marker?.setMap(this.map!);
      this.responseDiv!.style.display = 'block';
      this.response!.innerText = JSON.stringify(result, null, 2);
      return results;
    });
    // .catch((e) => {
    //   alert("Geocode was not successful for the following reason: " + e);
    // });
  }

  // declare global {
  //   interface Window {
  //     initMap: () => void;
  //   }
  // }
  // window.initMap = this.initMap;
  // export {};
}
