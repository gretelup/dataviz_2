// "county":county,"sat_avg":sat_avg}

function schoolNJPlot() {

    /**
    /* Builds chart for school data for all of NJ
    */

    // Construct url for path to school data for state
    var url = `/school/state`;


    // Fetch school data for state
    d3.json(url).then(function (schoolData) {

        // testArray = [{county: county, sat_avg: sat_avg}]
        schoolData.forEach(function (d) {
            d.sat_avg = +d.sat_avg;
        });

        $('#plot2').animatedBarChart({
            data: schoolData,
            params: {
                name: 'County', // name for xaxis
                value: 'Average SAT Score' // value for yaxis
            },
            chart_height: 400,
            horizontal_bars: false,
            colors: null,
            show_legend: false,
            x_grid_lines: true,
            y_grid_lines: true,
            // speed for tranistions
            tweenDuration: 300,
            bars: {
                padding: 0.075, // padding between bars
                opacity: 0.7, // default bar opacity
                opacity_hover: 0.45, // default bar opacity on mouse hover
                disable_hover: false, // disable animation and legend on hover
                hover_name_text: 'county', // text for name column for label displayed on bar hover
                hover_value_text: 'sat_avg', // text for value column for label displayed on bar hover
            },
            // margins for chart rendering
            margin: {
                top: 0, // top margin
                right: 35, // right margin
                bottom: 20, // bottom margin
                left: 70 // left margin
            },
            // rotate xaxis label params
            rotate_x_axis_labels: {
                process: true, // process xaxis label rotation
                minimun_resolution: 720, // minimun_resolution for label rotating
                bottom_margin: 15, // bottom margin for label rotation
                rotating_angle: 90, // angle for rotation,
                x_position: 9, // label x position after rotation
                y_position: -3 // label y position after rotation
            }
        });
    });
}

var test = "MORRIS"
// schoolNJPlot(test);




    // // Define SVG area dimensions
    // var svgWidth = 500;
    // var svgHeight = 300;

    // // 
    // var svg = d3.select("#plot2x")
    //     .append("svg")
    //     .attr({
    //         "width": svgWidth,
    //         "height": svgHeight,
    //     });

    //         var barSpacing = 5;
    //         var scaleY = .001

    //         var barWidth = (svgWidth - (barSpacing * (schoolData.length - 1))) / schoolData.length;

    //         //Create bars
    //         var bars = svg.selectAll("rect")
    //             .data(testData)
    //             .enter()
    //             .append("rect")
    //             .attr("width", d => barWidth)
    //             .attr("height", d => d.sat_avg * scaleY)
    //             .attr("x", (d, i) => i * (barWidth + barSpacing))
    //             .attr("y", d => svg.svgHeight - d.sat_avg * scaleY)
    //             .attr("fill", "steelblue");

    //             .on("mouseover", function(d) {
    //                 d3.select(this)
    //                 .transition()
    //                 .duration(50)
    //                 .attr("fill", "#CC0000");

    //                 //Get this bar's x/y values, then augment for the tooltip
    //                 var xPosition = parseFloat(d3.select(this).attr("x")) + x.rangeBand() / 2;
    //                 var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + height / 2;

    //                 //Update the tooltip position and value
    //                 d3.select("#tooltip")
    //                 .style("left", xPosition + "px")
    //                 .style("top", yPosition + "px")
    //                 .select("#value")
    //                 .text(d.frequency);

    //         //Giving colour to bars
    //         bars.filter(function (d) {
    //             return d == max;
    //         }).attr("fill", "red");
    //     });
    // }


    // TO TEST:
    // CHANGE test to various counties (note all caps)
