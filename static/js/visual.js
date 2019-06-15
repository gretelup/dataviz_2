// Define four main functions that create our visualizations
// These functions will be called inside of logic.js 

function schoolCountyPlot(county, plot_id) {

  /**
  /* Builds chart for school data for given county
  /* @param {string}    county    Name of selected county
  */

  // Construct url for path to school data for selected county
  var url = `/school/counties/${county}`;

  // Fetch school data for the county
  d3.json(url).then(function (schoolData) {
    
    // unpack jSON
    var math_avg = schoolData[0].math_avg;
    var eng_avg = schoolData[0].eng_avg;
    var math_state_avg = schoolData[0].math_state_avg;
    var eng_state_avg = schoolData[0].eng_state_avg;

    //Group bar chart for SAT scores
    // Create trace
    var trace1 = {
      x: ["Math SAT", "English SAT"],
      y: [math_avg, eng_avg],
      name: `${county} County`,
      type: 'bar'
    };

    var trace2 = {
      x: ["Math SAT", "English SAT"],
      y: [math_state_avg, eng_state_avg],
      name: 'State',
      type: 'bar'
    };
    
    var data = [trace1, trace2];
  

  var layout = { barmode: 'group' };

  // Generate new plot
  Plotly.newPlot(plot_id, data, layout);
});
}

// TO TEST:
// CHANGE test to various counties (note all caps)
// var test = "MORRIS"
// schoolCountyPlot(test, "plot1");

// schoolCountyPlot(test, "plot3");
// schoolCountyPlot(test, "plot4");


// ARJUN/SMITA - WHOEVER IS WORKING ON THIS: WE MAY NEED TO
// ADD A COUNTY PARAMETER SO WE CAN HIGHLIGHT IT WHEN SELECTED
// ALSO NEED TO INCLUDE COUNTY IN SCHOOL STATE PATH
function schoolNJPlot(county) {

  /**
  /* Builds chart for school data for all of NJ
  */

  // Construct url for path to school data for state
  var url = `/school/state`;

  // Fetch school data for state
  d3.json(url).then(function (schoolData) {

    // Unpack and/or futz with data

    // NOTE - WE NEED TO ADD COUNTY TO PATH AND HIGHLIGHT SELECTED COUNTY
    // NOTE - THE INITIAL BUILD WILL HAVE NO COUNTY SO NEED IF STATEMENT
    // LIKE IF COUNTY = "NONSENSE", HIGHLIGHT NOTHING.
    // ELSE, HIGHLIGHT COUNTY

    // Create trace
    var trace = {
    };

    // Create data
    var data = [trace];
    // Create layout
    var layout = {
    };
    // Generate new plot
    Plotly.newPlot("state-school-plot", data, layout);
  });
}

// TO TEST:
// CHANGE test to various counties (note all caps)
var test = "MORRIS"
// schoolNJPlot(test);


function hospitalCountyPlot(county) {

  /**
  /* Builds chart for hospital data for given county
  /* @param {string}    county    Name of selected county
  */

  // Construct url for path to hospital data for selected county
  var url = `/hospital/counties/${county}`;
  rate_total=0
  counter=0
  // Fetch hospital data for the county
  d3.json(url).then(function (hospitalData) {
    hospitalData.forEach(function(d) {
      h_rate = +d.rate;
      counter=counter+1;
      rate_total=rate_total+h_rate
    });
  avg_h_rate=rate_total/counter;
  // Convert avg rate to ratio to be equivalent to degrees for gauge 
  console.log(avg_h_rate);
  var level=avg_h_rate * 180 / 5;
  // Trig to calculate meter point
  var degrees = 180 - level,
  radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);        // Create gauge arrow
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);

  // Construct gauge
  var data = [{ type: 'scatter',
  x: [0], y:[0],
      marker: {size: 28, color:'850000'},
      showlegend: false,
      name: 'ratings',
      text: avg_h_rate,
      hoverinfo: avg_h_rate},
  { values: [1, 1, 1, 1, 1,5],
  rotation: 90,
  text: ['5', '4', '3', '2', '1',"  "],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['#1db231','#5c3bc2',
                   '#51BCF7','#ffba00', 
                  '#e0455e','rgba(255, 255, 255, 0)']},
  labels: ['5', '4', '3', '2', '1',"  "],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
  }];

  var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
          color: '850000'
      }
      }],
  title: '<b>Based on county</b>',
  height: 400,
  width: 400,
  xaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]}
  };
  Plotly.newPlot("plot3", data, layout);

    // Unpack and/or futz with data

    // Create trace
    // var HospitalCountydata = [{
    //   values: [],
    //   labels: [, , ],
    //   type: 'pie'
    // }];
    
    // // Create layout
    // var layout = {
    //   height: x,
    //   width: y
    // };
    
    // // Generate new plot
    // Plotly.newPlot("plot3", data, layout);
  });
}

// TO TEST:
// CHANGE test to various counties (note all caps)
var test = "MORRIS"
hospitalCountyPlot(test);


function hospitalNJPlot() {

  /**
  /* Builds chart for hospital data for all of NJ
  */

  // Construct url for path to hospital data for state
  var url = `/hospital/state`;

  // Fetch hospital data for the county
  d3.json(url).then(function (hospitalData) {
    hospitalData.forEach(function(d) {
      h_rate = +d.avg_rate;
      counter=counter+1;
      rate_total=rate_total+h_rate
    });
  avg_h_rate=rate_total/counter;
  // Convert avg rate to ratio to be equivalent to degrees for gauge 
  console.log(avg_h_rate);
  var level=avg_h_rate * 180 / 5;
  // Trig to calculate meter point
  var degrees = 180 - level,
  radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);        // Create gauge arrow
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);

  // Construct gauge
  var data = [{ type: 'scatter',
  x: [0], y:[0],
      marker: {size: 28, color:'850000'},
      showlegend: false,
      name: 'ratings',
      text: avg_h_rate,
      hoverinfo: avg_h_rate},
  { values: [1, 1, 1, 1, 1,5],
  rotation: 90,
  text: ['5', '4', '3', '2', '1',"  "],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['#1db231','#5c3bc2',
                   '#51BCF7','#ffba00', 
                  '#e0455e','rgba(255, 255, 255, 0)']},
  labels: ['5', '4', '3', '2', '1',"  "],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
  }];

  var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
          color: '850000'
      }
      }],
  title: '<b>Based on state</b>',
  height: 400,
  width: 400,
  xaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]}
  };
  Plotly.newPlot("plot4", data, layout);
    // Unpack and/or futz with data

    // // Create trace
    // var trace = {
    // };

    // // Create data
    // var data = [trace];
    // // Create layout
    // var layout = {
    // };
    // // Generate new plot
    // Plotly.newPlot("plot4", data, layout);
  });
}

// TO TEST:
// Note - no parameter
hospitalNJPlot();


// TO DO: THIS IS VERY ROUGH

function reportCard(county) {

  /**
  /* Builds report card for given county
  /* @param {string}    county    Name of selected county
  */

  // Construct url for path to school data for selected school
  var url_school = `/school/counties/${county}`;

  // Clear existing report card
  d3.select("#report-card").html("");

  // Fetch school data for the county
  d3.json(url_school).then(function (schoolData) {

    // Unpack and/or futz with data

    // Do some sort of mathematical something to create numbers and grade
    // Maybe find the median math and english SAT score
    // If it falls within a certain range, it gets an A, etc.
    // We could also find other metrics

    //  var mathMed = math using stuff from schoolData;
    //  var engMed = math using stuff from schoolData;
    //  var schoolGrade = math using stuff from schoolData;

    // Create the fields and fill in the data
    // Something like:
    // p is probably not right for append
    // you can jam html directly into this OR change css file by class
    d3.select("#report-card")
      .append("p")
      .classed("", true)
      .text(`Median Math SAT: ${mathMed}`)
      .append("p")
      .classed("", true)
      .text(`Median English SAT: ${engMed}`)
      .append("p")
      .classed("", true)
      .text(`School Grade: ${schoolGrade}`);
  });

  // Construct url for path to hospital data for selected county
  var url_hospital = `/hospital/counties/${county}`;

  // Fetch hospital data for the county
  d3.json(url_hospital).then(function (hospitalData) {
    // Unpack and/or futz with data
    d3.select("#report-card")
      .append("p")
      .classed("", true)
      .text(`Median Hospital Score: ${hospMed}`)
      .append("p")
      .classed("", true)
      .text(`Hospital Grade: ${hospGrade}`);
  });

  // Do Math
  //    var countyGrade = math...;

  d3.select("#report-card")
    .append("p")
    .classed("", true)
    .text(`County Grade: ${countyGrade}`)
}



