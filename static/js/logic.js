// Set style for layers
var styleLayer = {
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
    style: styleLayer.default,
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
    selectedFeature = "nonsense";
    setstyleLayer(layer, styleLayer.default);
    map.setView([40.0583, -74.4057], 8); 
    resetPlots();
  }
  else {
    setstyleLayer(layer, styleLayer.highlight);
    map.fitBounds(layer.getBounds());
    selectedFeature = feature;
    createPlots(county);
  }
}

// Adds highlighting styling to county
function highlightFeature(tile) {
  var layer = tile.target;
  layer.setStyle(styleLayer.highlight);
}


// Removes highlight styling from county 
function resetHighlight(tile) {
  var layer = tile.target;
  if (layer.style == styleLayer.default) {
    setstyleLayer(layer, styleLayer.highlight);
  }
  else {
    setstyleLayer(layer, styleLayer.default);
  }
}

// Sets specified styling to selected layer
function setstyleLayer(layer, styleSelected) {
  layer.setStyle(styleSelected)
}

// Initialize global variable with nonsense
var selectedFeature = "nonsense";



