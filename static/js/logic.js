// ARJUN TO DO: NEED TO ADD PLACE

// GRETEL FINAL THOUGHTS:
/* this selects more than one feature at a time
look at everything that is like a list of features 
or a loop and make sure it's necessary
ALSO, need to connect clicking the county to creating the plots
so, yeah, that needs to happen.
ALSO need to make sure unselect works right*/

// Create school and hospital plots for NJ
// schoolNJPlot();
// hospitalNJPlot();

// NEED TO MAKE SURE THAT WE HAVE AN INITIAL VALUE OF NOTHING

// GRETEL - MAKE THIS PLAY WELL WITH LEAFLET CODE
// Grab a reference to the dropdown select county
// var selector = d3.select("#selCounty");

// // Use the list of sample names to populate the select options
// d3.json("/counties").then((countyNames) => {
//   countyNames.forEach((county) => {
//     selector
//       .append("option")
//       .text(county)
//       .property("value", county);
//   });
// });

/// THIS IS WHERE THE BIG MESS BEGINS:

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

//THERE'S A BUNCH OF CODE HERE THAT I THINK IT JUST FOR THE SEARCHBOX

// THIS LOOKS LIKE WE ARE ADDING THE COUNTIES LAYER WITH THE DEFAULT STYLING
// var geojson = L.geoJson(countiesData, {
//   style: stylelayer.default,
//   onEachFeature: onEachFeature
// }).addTo(map);

// // Defining mouse commands on each county feature
// function onEachFeature(feature, layer) {
//   layer.on({
//       mouseover: highlightFeature,
//       mouseout: resetHighlight,
//       click: zoomToFeature
//           //dblclick : selectFeature
//   });
// }
// // HERE WE WANT TO CHANGE THE THING WE DO W/ INFO
// // RIGHT NOW the info thing creates a little info box in bottom left corner
// // WE WANT A DIFFERENT EVENT - SELECTING COUNTY
// // Define what it means to highlight a feature
// // Called by onEachFeature
// function highlightFeature(e) {
//     var layer = e.target;
//     layer.setStyle(stylelayer.highlight);
//     info.update(layer.feature.properties);
// }

// // Takes away the highlight
// function resetHighlight(e) {
//   var layer = e.target;
//   var feature = e.target.feature;
//   if (checkExistsLayers(feature)) {
//       setStyleLayer(layer, stylelayer.highlight)
//   } else {
//       setStyleLayer(layer, stylelayer.default)
//   }
// }
// //THE WAY HIS CODE WORKS IS HE CAN SELECT MULTIPLE FEATURES AT THE SAME TIME - WE DON'T WANT TO DO THAT
// // Seems like this zooms in on the feature, but not sure how
// var featuresSelected = []
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
//     detailsselected.update(featuresSelected)
// }
// // ABSOLUTELY NO IDEA HOW THIS WORKS
// var corner1 = L.latLng(53.62, 2.931),
//     corner2 = L.latLng(50.763, 7.182)
// var initbounds = L.latLngBounds(corner1, corner2)
// var arrayBounds = [];

// function addBounds(layer) {
//   arrayBounds.push(layer.getBounds())
// }

// function removeBounds(layer) {
//   arrayBounds = arrayBounds.filter(bounds => bounds != layer.getBounds())
// }

// function setStyleLayer(layer, styleSelected) {
//   layer.setStyle(styleSelected)
// }

// // DO I NEED TO CHANGE THE ARGUMENT INDICES???
// /// CHANGED ZIP CODE TO COUNTY
// function removerlayers(feature, callback) {
//   featuresSelected = featuresSelected.filter(obj => obj.COUNTY != feature.properties.COUNTY)
//   callback(arguments[2], arguments[3])
// }

// // GRETEL DOESN'T UNDERSTAND THE NEXT TWO FUNCTIONS
// // DO I NEED TO CHANGE THE ARGUMENT INDICES???
// // CHANGED ZIP CODE TO COUNTY
// function addLayers(feature, callback) {
//   featuresSelected.push({
//       COUNTY: feature.properties.COUNTY,
//       feature: feature
//   })
//   callback(arguments[2], arguments[3])
// }

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

// /*show info layers*/
// var info = L.control({
//   position: 'bottomleft'
// });

// info.onAdd = function(map) {
//   this._div = L.DomUtil.create('div', 'info');
//   this.update();
//   return this._div;
// };

// // WE WANT TO DO SOMETHING ELSE WITH INFO HERE
// // GO BACK TO NOTES ABOVE 
// info.update = function(properties) {
//   this._div.innerHTML =`<h4>${properties.COUNTY_LABEL}</h4>` 
// };

// info.addTo(map);


