import L from 'leaflet';
// const L = require('leaflet');
import "leaflet/dist/leaflet.css";
import '/node_modules/leaflet-geosearch/dist/geosearch.css';
const axios = require('axios');

// TODO Gary, Indiana as first map location in DB
// TODO Create starting function to get last location data from DB
// TODO After getting location data build map with marker
// TODO Get Search data and save to DB

function buildMap(data) {
  const lat = data[0].lat;
  const lon = data[0].lon;
  const city = data[0].city;
  const state = data[0].state;
  const timestamp = data[0].createdAt;
  const datetime = new Date(timestamp).toLocaleString();
   

  // Creating map object
  const map = L.map('truckingmap').setView([lat, lon], 7);
  
  // Creating attribution and tiles for map
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, {attribution});
  tiles.addTo(map);

  // Custome Marker Icon
  const truck = new Image();
  const myIcon = L.icon({
    iconUrl: truck.src = require("../img/truck_200px.png"),
    iconSize: [75, 47],
    iconAnchor: [37, 23]
  });
  // Setting Marker with custom Icon
  const marker = L.marker([lat, lon], {icon: myIcon}).addTo(map);

  // popup information for marker
  const popupContent = `${city},${state}<br>${lat},${lon}<br>${datetime}`
  marker.bindPopup(popupContent);

};

async function getLocation(){
  const url = process.env.SERVER_URL;
  try {
        const response = await axios.get(`${url}/locations`);
        buildMap(response.data);
  } catch (error) {
        console.error(error);
  }
}


getLocation();
