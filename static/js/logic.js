// COMMENT THIS OUT UNTIL PLOTS ARE BUILT
// MIGHT NEED TO PASS IN PARAMETER FOR THESE OR CREATE A DIFFERENT FUNCTION FOR INITIAL BUILD
// Create school and hospital plots for NJ
// schoolNJPlot();
// hospitalNJPlot();

// GRETEL - VIOLATION ERROR:
/*Violation] Added non-passive event listener to a 
scroll-blocking 'wheel' event. Consider marking 
event handler as 'passive' to make the page more 
responsive. See https://www.chromestatus.com/feature/5745543795965952

// GRETEL - find where it's printing out all counties
*/
// GRETEL - MAKE THIS PLAY WELL WITH LEAFLET CODE
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

// Set style for layers
var stylelayer = {
  default: {
    color: "blue",
    opacity: 1,
    fillcolor:"blue",
    fillOpacity:0.1,
    weight: 0.5
  }
  ,
  reset:{
    color: "blue",
    opacity: 0.4,
    weight: 1
  }
  ,
  highlight:{
    weight: 5,
    color: "red",
    dashArray: '',
    fillOpacity: 0.7
  }
  ,
  selected:{
    color: "green",
    opacity: 0.3,
    weight: 0.5
  }

}

// Create map object and add layer
var map = L.map("map", {
    center: [40.0583, -74.4057],
    zoom: 8
  });

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

// Add county layers with default styling
var geojson = L.geoJson(countiesData, {
  style: stylelayer.default,
  // onEachFeature: onEachFeature
}).addTo(map);

// COMMENT FROM LINE 69 TO END FOR TESTING PURPOSES
// // Define mouse commands
// function onEachFeature(feature, layer) {
//   layer.on({
//       mouseover: highlightFeature,
//       mouseout: resetHighlight,
//       // GRETEL - FIX THIS
//       click:console.log(feature.properties.COUNTY),
//       click: zoomToFeature
//           //dblclick : selectFeature
//   });
// }


// // Adds highlighting styling to county
// function highlightFeature(e) {
//     var layer = e.target;
//     layer.setStyle(stylelayer.highlight);
// }

// // GRETEL - FIX THIS NOTE checkExistsLayers function
// // Removes highlight styling from county 
// function resetHighlight(e) {
//   var layer = e.target;
//   var feature = e.target.feature;
//   if (checkExistsLayers(feature)) {
//       setStyleLayer(layer, stylelayer.highlight)
//   } else {
//       setStyleLayer(layer, stylelayer.default)
//   }
// }


// // GRETEL - FIX THIS USING ZACH'S STUFF
// var featuresSelected = "nonsense"
// function zoomToFeature(e) {

//     var layer = e.target;
//     var feature = e.target.feature;

//     if (checkExistsLayers(feature)) {
//         removerlayers(feature, setStyleLayer, layer, stylelayer.default)
//         removeBounds(layer)

//     } else {
//         addLayers(feature, setStyleLayer, layer, stylelayer.highlight)
//         addBounds(layer)
//     }
//     map.fitBounds(arrayBounds);
//     // detailsselected.update(featuresSelected)
// }

// // GRETEL - I THINK THIS WAS THROWING ERRORS
// // Sets initial bounds for map view
// var corner1 = L.latLng(53.62, 2.931),
//     corner2 = L.latLng(50.763, 7.182)
// var initbounds = L.latLngBounds(corner1, corner2)
// var arrayBounds = [];

// // Adds boundaries to map view
// function addBounds(layer) {
//   arrayBounds.push(layer.getBounds())
// }

// // Remove boundaries from map view
// function removeBounds(layer) {
//   arrayBounds = arrayBounds.filter(bounds => bounds != layer.getBounds())
// }

// // Sets specified styling to selected layer
// function setStyleLayer(layer, styleSelected) {
//   layer.setStyle(styleSelected)
// }

// // GRETEL - FIX THIS
// // Remove styling and charts from selected county
// function removerlayers(feature, callback) {
//   featuresSelected = featuresSelected.filter(obj => obj.COUNTY != feature.properties.COUNTY)
//   callback(arguments[2], arguments[3])
// }


// // GRETEL - FIX THIS
// // Add styling and chart for selected county
// function addLayers(feature, callback) {
//   featuresSelected.push({
//       COUNTY: feature.properties.COUNTY,
//       feature: feature
//   })
//   callback(arguments[2], arguments[3])
// }

// // GRETEL - FIX THIS PER ZACH
// // Add/Remove layer styling and chart for selected county
// function checkExistsLayers(feature) {
//   var result = false
//   for (var i = 0; i < featuresSelected.length; i++) {
//       if (featuresSelected[i].COUNTY == feature.properties.COUNTY) {
//           result = true;
//           break;
//       }
//   };
//   return result
// }
