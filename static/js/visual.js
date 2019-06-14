// Define four main functions that create our visualizations
// These functions will be called inside of logic.js 

function schoolCountyPlot(county) {

  /**
  /* Builds chart for school data for given county
  /* @param {string}    county    Name of selected county
  */

  // Construct url for path to school data for selected county
  var url = `/school/counties/${county}`;

  // Fetch school data for the county
  d3.json(url).then(function (schoolData) {

    //Group bar chart for SAT scores
    // Create trace
    var trace1 = {
      x: [math_avg,math_state_avg ],
      y: ['COUNTY'],
      name: 'School AVG MATHSAT Scores in Counties',
      type: 'bar'
    };

    var trace2 = {
      x: [eng_avg, eng_state_avg],
      y: ['COUNTY'],
      name: 'School AVG ENGLISH SAT Scores in Counties',
      type: 'bar'
    };
    
    var data = [trace1, trace2];
  

  var layout = { barmode: 'group' };

  // Create data
  var data = [trace];
  // Create layout
  var layout = {
  };
  // Generate new plot
  Plotly.newPlot("county-school-plot", data, layout);
});
}

// TO TEST:
// CHANGE test to various counties (note all caps)
var test = "MORRIS"
// schoolCountyPlot(test);


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

  // Fetch hospital data for the county
  d3.json(url).then(function (hospitalData) {

    // Unpack and/or futz with data

    // Create trace
    var HospitalCountydata = [{
      values: [],
      labels: [, , ],
      type: 'pie'
    }];
    
    // Create layout
    var layout = {
      height: x,
      width: y
    };
    
    // Generate new plot
    Plotly.newPlot("county-hospital-plot", data, layout);
  });
}

// TO TEST:
// CHANGE test to various counties (note all caps)
var test = "MORRIS"
// hospitalCountyPlot(test);


function hospitalNJPlot() {

  /**
  /* Builds chart for hospital data for all of NJ
  */

  // Construct url for path to hospital data for state
  var url = `/hospital/state`;

  // Fetch hospital data for the county
  d3.json(url).then(function (hospitalData) {

    // Unpack and/or futz with data

    // Create trace
    var trace = {
    };

    // Create data
    var data = [trace];
    // Create layout
    var layout = {
    };
    // Generate new plot
    Plotly.newPlot("state-hospital-plot", data, layout);
  });
}

// TO TEST:
// Note - no parameter
// hospitalNJPlot();


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

    // Do Math
    //  var hospMed = math...;
    //  var hospGrade = math..;

    // Fill in fields for hospital in report card

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



