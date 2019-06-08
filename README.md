# The Lovely Garden State: Interactive Web Dashboard

Create an interactive dashboard targetting people looking for homes in NJ who want to know:

* The School Performance Information
* Hospital Rankings and availability
* Transportation Data

## Group Members

* Arjun Subramaniam
* Smita Sharma
* Mike Lygas
* Gretel Uptegrove

## Datasets used

* [Hospital Rating Data](https://data.medicare.gov/Hospital-Compare/Hospital-General-Information/xubh-q36u)
* [Hospital Location Data](https://njogis-newjersey.opendata.arcgis.com/datasets/hospitals)
* [New Jersey School Performance Reports](https://rc.doe.state.nj.us/ReportsDatabase.aspx)
* [School Location Data](https://njogis-newjersey.opendata.arcgis.com/datasets/d8223610010a4c3887cfb88b904545ff_4)
* [Railroad Station Location](http://njogis-newjersey.opendata.arcgis.com/datasets/new-jersey-railroad-stations)
* [Bus Stop Location](http://njogis-newjersey.opendata.arcgis.com/datasets/new-jersey-bus-stops)

## Inspiration

A friend is looking for a place to live in New Jersey and would find it useful to have access to a tool that provides information important to families about possible locations to move to.

## Visualization Examples for Inspiration

![New Jersey Information](images/NJ_info.png)
![Diversity Information](images/Diversity.png)
![Transportation Report Card](images/Score_card.png)

## Workflow

### Step 1: Extract Data

### Step 2: Clean Data

### Step 3: Render Data

## Project composition

* Python Files:
  * app.py: (see petpals exercise) Primary python script that sets up database and renders index via flask.
    * Mongo/SQL
    * Flask
    * Requests
  * clean.py: File containing functions for cleaning school and hospital data; these functions will be called within app.py.
    * Pandas
    * Numpy
* Javascript Files:
  * logic.js: (see citybike exercise) File that extracts geojson data and maps it; also somehow integrates data from the other sources and maps them as well.
    * Mapbox
    * Leaflet
    * d3
  * app.js: File composed of functions that build the visualizations; for development purposes, I think we should create multiple js files for clusters of functions, allowing us to work at the same time.
    * Plotly
    * d3
* HTML & CSS Files
  * index.html: Page where data will be rendered; use bootstrap
    * REMEMBER NEW JAVASCRIPT TO INCLUDE
  * Additional html pages???
  * style.css: our css file
  * additional css files as we see fit
