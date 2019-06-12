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

// TO DO: FIGURE OUT FORMATTING AND ZOOM OF MAP OBJECT
// THIS NEEDS TO BE TAKEN CARE OF IN STYLE.CSS AND INDEX.HTML

// Create map object
var myMap = L.map("map", {
    center: [40.0583, -74.4057],
    zoom: 8
  });


// TO DO: FIGURE OUT WHICH TILE LAYER WE WANT
// LOOK AT MAPBOX DOCUMENTATION FOR THIS

// Add tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// TO DO: ADD ADDITIONAL LAYERS???
// INCOME LAYER - CHLOROPLETH??
// HOSPITAL MARKERS
// NEED TO MAKE SURE TO ADD WHATEVER PLUGINS WE NEED TO INDEX (E.G., )
// ABILITY TO TURN OFF/ON
// MAYBE WAIT TO ADD THE LAYERS?
// Add income layer

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

d3.json(link, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data).addTo(myMap)

});
