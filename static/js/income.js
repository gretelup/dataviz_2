function incomeNJPlotInit() {

    /**
    /* Builds initial chart for income data for whole state
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
    var svg = d3.select("#plot5")
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
            return (`<strong>${d.county}</strong><br>${d.income}`);
        })

    // Construct url for path to income data for state
    var url = `/income/state`;

    // Fetch income data for all counties in the state
    d3.json(url).then(function (incomeData) {

        // Round SAT averages
        incomeData.forEach(function (d) {
            d.income = +d.income;
        });

        // Configure x and y scales
        var xBandScale = d3.scaleBand()
            .domain(incomeData.map(d => d.county))
            .range([0, chartWidth])
            .padding(0.2);
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(incomeData, d => d.income)])
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
            .data(incomeData)
            .enter()
            .append("rect")
            .attr("width", xBandScale.bandwidth())
            .attr("height", d => chartHeight - yLinearScale(d.income))
            .attr("x", d => xBandScale(d.county))
            .attr("y", d => yLinearScale(d.income))
            .attr("fill", "blue")
            .on("mouseover", toolTip.show)
            .on("mouseout", toolTip.hide);

        // Add tooltips for chart
        chartGroup.call(toolTip);
    });
}

function incomeNJPlot(county) {

    /**
    /* Updates state income bar chart for selected given county
    /* @param {string}    county    Name of selected county
    */

    // Create svg object
    var svg = d3.select("#plot5");

    // Construct url for path to income data for state
    var url = `/income/state`;

    console.log(county);

    // Fetch income data for all counties in the state
    d3.json(url).then(function (incomeData) {

        // Create object for all bars in chart
        var bars = svg.selectAll("rect")
            .data(incomeData);

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

function incomeNJPlotReset() {

    /**
    /* Resets colors of state income bar chart
    */
  
    // Create svg object
    var svg = d3.select("#plot5");
  
    // Construct url for path to income data for state
    var url = `/income/state`;
  
    // Fetch income data for all counties in the state
    d3.json(url).then(function (incomeData) {
  
      // Create object for all bars in chart
      var bars = svg.selectAll("rect")
        .data(incomeData);
  
      // Update color of bar for selected copy
      bars.enter()
        .append("rect")
        .merge(bars)
        .transition()
        .duration(100)
        .attr("fill", "blue");
    });
  }
  