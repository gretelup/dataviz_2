// Set style for layers
var stylelayer = {
  default: {
    color: "blue",
    opacity: 1,
    fillcolor: "blue",
    fillOpacity: 0.1,
    weight: 0.5
  },
  highlight: {
    weight: 5,
    color: "red",
    dashArray: '',
    fillOpacity: 0.7
  }
}
// GRETEL - LINK SELECTOR?
// NOTHING SHOULD BE SELECTED AT FIRST
// Create dropdown menu
// var selector = d3.select("#selCounty");
// d3.json("/counties").then((countyNames) => {
//   countyNames.forEach((county) => {
//     selector
//       .append("option")
//       .text(county)
//       .property("value", county);
//   });
// });

// Create map object
map = L.map("map", {
  center: [40.0583, -74.4057],
  zoom: 8,
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
    style: stylelayer.default,
    onEachFeature: onEachFeature
  }).addTo(map);
});

// GRETEL - UPDATE THIS AS NECESSARY
// ADD TITLE TO MAPS - CREATE AN ID AND POPULATE IT W/ COUNTY NAME
// Create plots for selected county
function createPlots(county) {
  d3.select("#selectedCounty")
    .html(`You have selected scenic <strong>${county} County!`);
  schoolCountyPlot(county)
  hospitalCountyPlot(county);
  hospitalNJPlot();
  // reportCard(county);
}

function resetPlots() {
  d3.select("#plot1").html("");
  d3.select("#plot2").html("");
  d3.select("#plot3").html("");
  d3.select("#plot4").html("");
}

// Define mouse commands
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

// Highlight, zoom, and create plots for selected county
function zoomToFeature(e) {

  var layer = e.target;
  var feature = e.target.feature;
  var county = feature.properties.COUNTY

  if (feature == selectedFeature) {
    selectedFeature = "nonsense";
    setStyleLayer(layer, stylelayer.default);
    map.setView([40.0583, -74.4057], 8); 
    resetPlots();
  }
  else {
    setStyleLayer(layer, stylelayer.highlight);
    map.fitBounds(layer.getBounds());
    selectedFeature = feature;
    createPlots(county);
  }
}

// Adds highlighting styling to county
function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle(stylelayer.highlight);
}


// Removes highlight styling from county 
function resetHighlight(e) {
  var layer = e.target;
  if (layer.style == stylelayer.default) {
    setStyleLayer(layer, stylelayer.highlight);
  }
  else {
    setStyleLayer(layer, stylelayer.default);
  }
}

// Sets specified styling to selected layer
function setStyleLayer(layer, styleSelected) {
  layer.setStyle(styleSelected)
}

// Initialize global variable with nonsense
var selectedFeature = "nonsense";



