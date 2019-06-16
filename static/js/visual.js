function schoolCountyPlot(county) {

  /**
  /* Builds chart for school data for given county
  /* @param {string}    county    Name of selected county
  */

  // Construct url for path to school data for selected county
  var url = `/school/counties/${county}`;

  // Fetch school data for the county
  d3.json(url).then(function (schoolData) {

    // Unpack data
    var math_avg = schoolData[0].math_avg;
    var eng_avg = schoolData[0].eng_avg;
    var math_state_avg = schoolData[0].math_state_avg;
    var eng_state_avg = schoolData[0].eng_state_avg;

    // Create plot parameterse for bar chart
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

    // Generate bar chart
    Plotly.newPlot("plot1", data, layout);
  });
}


function schoolNJPlotInit() {

  /**
  /* Builds initial chart for school data for whole state
  */

  // Define SVG area dimensions
  var svgWidth = 600;
  var svgHeight = 400;

  // Define margins and dimensions of chart area
  var chartMargin = {
    top: 30,
    right: 30,
    bottom: 70,
    left: 40
  };
  var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
  var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

  // Create svg object and append a group
  var svg = d3.select("#plot2")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  // Creat a tolltip object
  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-10, 0])
    .html(function (d) {
      return (`<strong>${d.county}</strong><br>${d.sat_avg}`);
    })

  // Construct url for path to school data for state
  var url = `/school/state`;

  // Fetch school data for all counties in the state
  d3.json(url).then(function (schoolData) {

    // Round SAT averages
    schoolData.forEach(function (d) {
      d.sat_avg = Math.round(+d.sat_avg);
    });

    // Configure x and y scales
    var xBandScale = d3.scaleBand()
      .domain(schoolData.map(d => d.county))
      .range([0, chartWidth])
      .padding(0.2);
    var yLinearScale = d3.scaleLinear()
      .domain([0, 1600])
      .range([chartHeight, 0]);

    // Define functions to create axes
    var bottomAxis = d3.axisBottom(xBandScale);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

    // Append axes to chart
    chartGroup.append("g")
      .call(leftAxis);
    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    //Create bars for chart
    chartGroup.selectAll("rect")
      .data(schoolData)
      .enter()
      .append("rect")
      .attr("width", xBandScale.bandwidth())
      .attr("height", d => chartHeight - yLinearScale(d.sat_avg))
      .attr("x", d => xBandScale(d.county))
      .attr("y", d => yLinearScale(d.sat_avg))
      .attr("fill", "blue")
      .on("mouseover", toolTip.show)
      .on("mouseout", toolTip.hide)

    // Add tooltips for chart
    chartGroup.call(toolTip);
  });
}


function schoolNJPlot(county) {

  /**
  /* Updates state school bar chart for selected given county
  /* @param {string}    county    Name of selected county
  */

  // Create svg object
  var svg = d3.select("#plot2")

  // Construct url for path to school data for state
  var url = `/school/state`;

  // Fetch school data for all counties in the state
  d3.json(url).then(function (schoolData) {

    // Create object for all bars in chart
    var bars = svg.selectAll("rect")
      .data(schoolData)

    // Update color of bar for selected copy
    bars.enter()
      .append("rect")
      .merge(bars)
      .transition()
      .duration(100)
      .attr("fill", function (d) {
        if (d.county == county) {
          return ("red");
        }
        else {
          return ("blue");
        }
      });
  });
}

function schoolNJPlotReset() {

  /**
  /* Resets colors of state school bar chart
  */

  // Create svg object
  var svg = d3.select("#plot2")

  // Construct url for path to school data for state
  var url = `/school/state`;

  // Fetch school data for all counties in the state
  d3.json(url).then(function (schoolData) {

    // Create object for all bars in chart
    var bars = svg.selectAll("rect")
      .data(schoolData)

    // Update color of bar for selected copy
    bars.enter()
      .append("rect")
      .merge(bars)
      .transition()
      .duration(100)
      .attr("fill", "blue");
  });
}


function hospitalCountyPlot(county) {

  /**
  /* Builds chart for hospital data for given county
  /* @param {string}    county    Name of selected county
  */

  // Construct url for path to hospital data for selected county
  var url = `/hospital/counties/${county}`;
  
  // Initialize counters variables
  var rate_total = 0;
  var counter = 0;

  // Fetch hospital data for the county
  d3.json(url).then(function (hospitalData) {
    
    // Calculate average hospital rate for county
    hospitalData.forEach(function (d) {
      h_rate = +d.rate;
      counter += 1;
      rate_total += h_rate
    });
    avg_h_rate = rate_total / counter;
    
    // Convert rate to ratio to be equivalent to degrees for gauge 
    var level = avg_h_rate * 180 / 5;

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
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    // Construct gauge
    var data = [{
      type: 'scatter',
      x: [0], y: [0],
      marker: { size: 28, color: '850000' },
      showlegend: false,
      name: 'ratings',
      text: avg_h_rate,
      hoverinfo: avg_h_rate
    },
    {
      values: [1, 1, 1, 1, 1, 5],
      rotation: 90,
      text: ['5', '4', '3', '2', '1', "  "],
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: ['#1db231', '#5c3bc2',
          '#51BCF7', '#ffba00',
          '#e0455e', 'rgba(255, 255, 255, 0)']
      },
      labels: ['Wicked Awesome', 'Pretty Good', 'Ok', 'Meh', 'Sucks', "  "],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var layout = {
      shapes: [{
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
      xaxis: {
        zeroline: false, showticklabels: false,
        showgrid: false, range: [-1, 1]
      },
      yaxis: {
        zeroline: false, showticklabels: false,
        showgrid: false, range: [-1, 1]
      }
    };
    Plotly.newPlot("plot3", data, layout);
  });
}


function hospitalNJPlot() {

  /**
  /* Builds chart for hospital data for all of NJ
  */

  // Construct url for path to hospital data for state
  var url = `/hospital/state`;

  // Initialize counters variables
  var rate_total = 0;
  var counter = 0;

  // Fetch hospital data for the NJ
  d3.json(url).then(function (hospitalData) {
    
    // Calculate average hospital rate for state
    hospitalData.forEach(function (d) {
      h_rate = +d.avg_rate;
      counter = counter + 1;
      rate_total = rate_total + h_rate
    });
    avg_h_rate = rate_total / counter;
    
    // Convert avg rate to ratio to be equivalent to degrees for gauge 
    var level = avg_h_rate * 180 / 5;
    
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
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    // Construct gauge
    var data = [{
      type: 'scatter',
      x: [0], y: [0],
      marker: { size: 28, color: '850000' },
      showlegend: false,
      name: 'ratings',
      text: avg_h_rate,
      hoverinfo: avg_h_rate
    },
    {
      values: [1, 1, 1, 1, 1, 5],
      rotation: 90,
      text: ['5', '4', '3', '2', '1', "  "],
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: ['#1db231', '#5c3bc2',
          '#51BCF7', '#ffba00',
          '#e0455e', 'rgba(255, 255, 255, 0)']
      },
      labels: ['Wicked Awesome', 'Pretty Good', 'Ok', 'Meh', 'Sucks', "  "],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var layout = {
      shapes: [{
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
      xaxis: {
        zeroline: false, showticklabels: false,
        showgrid: false, range: [-1, 1]
      },
      yaxis: {
        zeroline: false, showticklabels: false,
        showgrid: false, range: [-1, 1]
      }
    };
    Plotly.newPlot("plot4", data, layout);
  });
}


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



