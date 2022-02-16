import L from '/node_modules/leaflet';
import "leaflet/dist/leaflet.css";
import { GeoSearchControl,OpenStreetMapProvider } from 'leaflet-geosearch';
import '/node_modules/leaflet-geosearch/dist/geosearch.css';
const axios = require('axios');

// TODO Gary, Indiana as first map location in DB
// TODO Create starting function to get last location data from DB
// TODO After getting location data build map with marker
// TODO Get Search data and save to DB


// Creating map object
const map = new L.map('truckingmap').setView([39.381266, -97.922211], 5);
// Creating attribution and tiles for map
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(map);

// Creating map provider and search control
const provider = new OpenStreetMapProvider({
  params: {
    addressdetails: 1
  }
});
map.addControl(
  new GeoSearchControl({
    provider,
    style: 'bar',
    showMarker: false,
    autoClose: true
  }),
);
// Custome Marker Icon
const truck = new Image();
const myIcon = L.icon({
  iconUrl: truck.src = require("../img/truck_200px.png"),
  iconSize: [100, 45],
  iconAnchor: [50, 22]
});
// Setting Marker with custom Icon
const marker = L.marker([39.381266, -97.922211], {icon: myIcon}).addTo(map);

// Getting form and input elements
const form = document.querySelector('form');
const input = form.querySelector('input[type="text"]');

// Search input event handler
map.on('geosearch/showlocation', async () => {
  const results = await provider.search({ query: input.value });
  // Getting location data from search field
  const lon = results[0].x;
  const lat = results[0].y;
  const rawData = results[0].raw.address;
  const city = rawData[Object.keys(rawData)[0]];
  const state = rawData.state;

  console.log(`${lat},${lon},${city},${state}`);

  // Build data object to send to database
  const location = {
    city, state, lat, lon
  };
 
  // popup information for marker
  const popupContent = `${city},${state}<br>${lat},${lon}`
  marker.setLatLng([lat,lon]);
  marker.bindPopup(popupContent);
  
  postDB(location);
});

// Setup funciton to handle data being saved to database
async function postDB(location){
  // console.log(location);
  const url = process.env.SERVER_URL;
  try {
        const response = await axios.post(`${url}/add_location`, location);
        console.log(response);
  } catch (error) {
        console.error(error);
  }
}


