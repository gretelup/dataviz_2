// Set style for layers
var styleLayer = {
  defaultLayer: {
    color: "blue",
    opacity: 1,
    fillcolor: "blue",
    fillOpacity: 0.1,
    weight: 0.5
  },
  highlightLayer: {
    weight: 5,
    color: "red",
    dashArray: '',
    fillOpacity: 0.7
  },
  chosenLayer: {
    weight: 5,
    color: "green",
    dashArray: '',
    fillOpacity: 0.7
  },
}
// Initialize global variable with nonsense
var selectedFeature = "nonsense";

// Create map object
map = L.map("map", {
  center: [40.042, -74.7],
  zoom: 8.5,
});

// Set street tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

// Add county data to map
queryUrl = "/counties/location"
$.get(queryUrl, function (data) {
  L.geoJson(data, {
    style: styleLayer.defaultLayer,
    onEachFeature: onEachFeature
  }).addTo(map);
});

// Initialize NJ wide school and income plots
incomeNJPlotInit();

// Create plots for selected county
function createPlots(county) {
  d3.select("#selectedCounty")
    .text(`${county} County!`);
  incomeNJPlot(county);
  schoolCountyPlot(county);
  hospitalCountyPlot(county);
  hospitalNJPlot(county);
  reportCard(county);
}

function resetPlots() {
  d3.select("#SAT-plot").html("");;
  d3.select("#hosp-county-plot").html("");
  d3.select("#hosp-NJ-plot").html("");
  incomeNJPlotReset();
  reportCardReset();
}

// Define mouse commands
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: selectCounty
  });
}

// Highlight, zoom, and create plots for selected county
function selectCounty(tile) {

  var layer = tile.target;
  var feature = tile.target.feature;
  var county = feature.properties.COUNTY;

  if (feature == selectedFeature) {
    layer.setStyle(styleLayer.defaultLayer);
    selectedFeature = "nonsense";
    map.setView([40.042, -74.7], 8.5); 
    resetPlots();
  }
  else {
    layer.setStyle(styleLayer.chosenLayer);
    map.fitBounds(layer.getBounds());
    selectedFeature = feature;
    createPlots(county);
  }
}

// Adds highlighting styling to county
function highlightFeature(tile) {
  var layer = tile.target;
  if (layer.style == layer.defaultLayer) {
    layer.setStyle(styleLayer.highlightLayer);
  }
}

// Removes highlight styling from county 
function resetHighlight(tile) {
  var layer = tile.target;
  if (layer.style ==layer.chosenLayer) {
    layer.setStyle(styleLayer.chosenLayer);
  }
  if (layer.style == layer.highlightLayer) {
    layer.setStyle(styleLayer.defaultLayer);
  } 
}

