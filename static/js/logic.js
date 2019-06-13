// ARJUN TO DO: NEED TO ADD PLACES TO CSS CODE SOMWHERE


// Create school and hospital plots for NJ
// schoolNJPlot();
// hospitalNJPlot();

// ADD COUNTY DROPDOWN MENU
// NOT SURE IF THIS SHOULD BE A SEPARATE FUNCTION
// NEED TO CHECK THE VARIABLES
// NEED TO MAKE SURE THAT WE HAVE AN INITIAL VALUE OF NOTHING

// // Grab a reference to the dropdown select county
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

// GRETEL - MAKE SURE THERE IS CODE FOR UNSELECTING
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
// TO DO: ADD ADDITIONAL LAYERS???
// INCOME LAYER - CHLOROPLETH??
// HOSPITAL MARKERS
// NEED TO MAKE SURE TO ADD WHATEVER PLUGINS WE NEED TO INDEX (E.G., )
// ABILITY TO TURN OFF/ON
// MAYBE WAIT TO ADD THE LAYERS?
// Add income layer

// TO DO: FIGURE OUT FORMATTING AND ZOOM OF MAP OBJECT
// THIS NEEDS TO BE TAKEN CARE OF IN STYLE.CSS AND INDEX.HTML

// Create map object and add layer
var myMap = L.map("map", {
    center: [40.0583, -74.4057],
    zoom: 8
  });

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);



// TO DO: NEED TO CONNECT INFORMATION FROM COUNTY GEOJSON
// SO WHEN WE CLICK ON A COUNTY, ALL THE STUFF WILL HAPPEN
// STUFF INCLUDES CREATING THE CHARTS, HIGHLIGHTING THE COUNTY IN STATE CHARTS
// POPULATING THE REPORT CARD AND ZOOMING IN ON THE COUNTY
// I BELIEVE ZOOMING ON THE COUNTY WILL REQUIRE CALCULATING THE CENTER OF THE COUNTY AND 
// MAKING THE CENTER OF THE MAP OBJECT TO BE THOSE COORDINATES AND INCRESING THE ZOOM
// THE DROPDOWN MENU SHOUDL ALSO CHANGE TO SELECTED COUNTY
// ALL OF THIS SHOULD ALSO HAPPEN WHEN YOU SELECT COUNTY FROM DROPDOWN

// Add counties
var link = "https://opendata.arcgis.com/datasets/5f45e1ece6e14ef5866974a7b57d3b95_1.geojson";

// DO ALL THE STUFF HERE! - FOR THE POPUP, just the name of the county
// ALSO NEED TO ADD THE OTHER STUFF THAT HAPPENS WITH THE CLICK EVENT
// https://github.com/olanaso/Leaflet-Select-Polygons/blob/master/Leaflet-Select-Polygons.js

// Declare global variables
var countyNames = [];
var countyDisplayName = {};

// Get geojson file for NJ counties

// IS THIS THE CORRECT SYNTAX???
var countyData = d3.json(link);

var countyGJson = L.geoJson(countyData, {
  style: stylelayer.default,
  onEachFeature: onEachFeature
}).addTo(map);


d3.json(link, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data).addTo(myMap)

  // Create a list of counties and associated display name
  $.each(data.features, function(index,feature){
		var county = feature.properties.COUNTY
		countyNames.push(county);
		countyDisplayName[countyName] = feature.properties.GNIS_Name;
  });


  


   // GET VALUE FOR COUNTY AND ATTACH IT TO MAP AREA
  // COUNTY IS "FEATURES" --> "properties" --> "COUNTY" (e.g. ATLANTIC)
  // County Label is "FEATURES" --> "properties" --> "GNIS_Name" (e.g. Atlantic County)

});
