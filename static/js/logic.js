/* !!!!!!!!GRETEL ERRORS

  Violation] Added non-passive event listener to a 
  scroll-blocking 'wheel' event. Consider marking 
  event handler as 'passive' to make the page more 
  responsive. See https://www.chromestatus.com/feature/5745543795965952

  2leaflet.js:5 Uncaught Error: Bounds are not valid.
      at e.fitBounds (leaflet.js:5)
      at e.zoomToFeature (logic.js:144)
      at e.fire (leaflet.js:5)
      at e._fireDOMEvent (leaflet.js:5)
      at e._handleDOMEvent (leaflet.js:5)
      at HTMLDivElement.r (leaflet.js:5)
      
  // GRETEL - FIX ZOOM
    
*/

// COMMENT THIS OUT UNTIL PLOTS ARE BUILT
// MIGHT NEED TO PASS IN PARAMETER FOR THESE OR CREATE A DIFFERENT FUNCTION FOR INITIAL BUILD
// Create school and hospital plots for NJ
// schoolNJPlot();
// hospitalNJPlot();

// Set style for layers
var stylelayer = {
  default: {
    color: "blue",
    opacity: 1,
    fillcolor: "blue",
    fillOpacity: 0.1,
    weight: 0.5
  }
  ,
  reset: {
    color: "blue",
    opacity: 0.4,
    weight: 1
  }
  ,
  highlight: {
    weight: 5,
    color: "red",
    dashArray: '',
    fillOpacity: 0.7
  }
  ,
  selected: {
    color: "green",
    opacity: 0.3,
    weight: 0.5
  }

}

// GRETEL - NOTHING SHOULD BE SELECTED AT FIRST
// Use the list of sample names to populate the select options
var selector = d3.select("#selCounty");

d3.json("/counties").then((countyNames) => {
  countyNames.forEach((county) => {
    selector
      .append("option")
      .text(county)
      .property("value", county);
  });
});

map = L.map("map", {
  center: [40.0583, -74.4057],
  zoom: 8,
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

queryUrl = "/counties/location"
$.get(queryUrl, function (data) {
  L.geoJson(data, {
    style: stylelayer.default,
    onEachFeature: onEachFeature
  }).addTo(map);
});

// function optionChanged(county) {
//   console.log(`I changed the option to ${county}`);
//   $.get(queryUrl, function (response) {
//     console.log("in the query")
//     for (var i = 0; i < response.length; i++) {
//       var d_county = response[i].properties.COUNTY;
//       console.log(d_county);
//       if (d_county == county) {
//         feature = response[i];
//       }
//     }
//   }, "json");
  // if (dataCounty == county) {
  //   feature = data;
  // }
  // console.log(feature);
  // zoomToFeature(feature);
// }


// $.get(queryUrl, function(data){
//   L.geoJson(data, {
//   })
// })
// Fetch new data each time a new sample is selected
// find hte json object with feature.properties.COUNTY = county
// e is the highest level of json I think
// zoomToFeature(e)

// Define mouse commands
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
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

// GRETEL - CONSIDER UNZOOMING WHEN UNSELECTING
var selectedFeature = "nonsense";
var selectedLayer = "nonsense";
var selectedCounty = "nonsense";
function zoomToFeature(e) {

  var layer = e.target;
  var feature = e.target.feature;
  var county = feature.properties.COUNTY

  if (feature == selectedFeature) {
    selectedFeature = "nonsense";
    selectedLayer = "nonsense";
    selectedCounty = "nonsense"
    // Gretel: consider adding code here to get rid of plot & CHANGE SELECTOR
    setStyleLayer(layer, stylelayer.default);
    // GRETEL: CONSIDER DOING A CHANGE BOUNDS TO ORIGINAL HERE
    removeBounds(layer);
  }
  else {
    if (selectedFeature != "nonsense") {
      setStyleLayer(selectedLayer, stylelayer.default);
      removeBounds(selectedLayer);
    }
    setStyleLayer(layer, stylelayer.highlight);
    addBounds(layer)
    selectedFeature = feature;
    selectedLayer = layer;
    selectedCounty = county;
    console.log(county);
    schoolCountyPlot(county, "plot1")
    // schoolNJPlot(county, "plot2");
    // hospitalCountyPlot(county, "plot3");
    // hospitalStatePlot(county, "plot4");
    // reportCard(county);
    // CHANGE SELECTOR TO COUNTY;
  }
  // GRETEL - THIS IS THROWING AN ERROR
  map.fitBounds(arrayBounds);
}

// GRETEL - I THINK THIS WAS THROWING ERRORS
// Sets initial bounds for map view
var corner1 = L.latLng(53.62, 2.931),
  corner2 = L.latLng(50.763, 7.182)
var initbounds = L.latLngBounds(corner1, corner2)
var arrayBounds = [];

// Adds boundaries to map view
function addBounds(layer) {
  arrayBounds.push(layer.getBounds())
}

// Remove boundaries from map view
function removeBounds(layer) {
  arrayBounds = arrayBounds.filter(bounds => bounds != layer.getBounds())
}

// Sets specified styling to selected layer
function setStyleLayer(layer, styleSelected) {
  layer.setStyle(styleSelected)
}
