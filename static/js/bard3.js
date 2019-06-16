function schoolNJPlotInit() {

    /**
    /* Builds initial chart for school data for all of NJ with no 
    county selected
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
    /* Updates chart for school data for all of NJ
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

    // Create svg and object
    var svg = d3.select("#plot2")

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

        var bars = svg.selectAll("rect")
            .data(schoolData)

        bars.enter()
            .append("rect")
            .merge(bars)
            .transition()
            .duration(100)
            .attr("width", xBandScale.bandwidth())
            .attr("height", d => chartHeight - yLinearScale(d.sat_avg))
            .attr("x", d => xBandScale(d.county))
            .attr("y", d => yLinearScale(d.sat_avg))
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