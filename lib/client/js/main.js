'use strict';
require("../css/master.css");

import { GeolocationConverter } from './GeolocationConverter';

document.querySelector('#get-data').addEventListener('click', function(e) {
  this.innerHTML = `
      <div class='uil-ring-css' style='transform:scale(0.2);'><div></div></div>
  `;
  navigator.geolocation.getCurrentPosition(position => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let city = GeolocationConverter.convertCoordsToCity(latitude, longitude)
      .then(city => {
        this.innerText = `You are in ${city}`;
        console.info(`You are in ${city}`);
      }).catch(error => {
        console.error(error);
      });
  }, error => {
    this.innerText = "You must allow Geolocation for the service to work";
  });
});
