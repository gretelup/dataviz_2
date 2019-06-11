# The Lovely Garden State: Interactive Web Dashboard

## Summary

We have created a map with an interactive dashboard for families looking to move to or within NJ that provides the user important information about a city in an easy to understand manner. The information includes school performance information, hospital rankings and availability, median household income, and transportation data.

## Group Members

* Arjun Subramaniam
* Smita Sharma
* Mike Lygas
* Gretel Uptegrove

## Motivation

A friend is looking for a place to live in New Jersey and would find it useful to have access to a tool that provides information important to families about possible locations to move to.

## Sources

* Hospital Rating Data from [Medicare](https://data.medicare.gov/Hospital-Compare/Hospital-General-Information/xubh-q36u)
  * Hospital location and ratings data
  * INSERT MORE INFO HERE ABOUT THE SPECIFIC DATA
* New Jersey School Performance Reports from [New Jersey Department of Education](https://rc.doe.state.nj.us/ReportsDatabase.aspx)
  * Performance data for schools administered by NJ Department of Education. Metrics include:
    * Student to teacher ratio by school
    * Per pupil expenditure by school district
    * Standardized test scores by school
* Median Income per School District from [Census American FactFinder](https://factfinder.census.gov/faces/tableservices/jsf/pages/productview.xhtml?pid=ACS_17_5YR_S1901&prodType=table)
  * Median household income by school district in NJ
* School Location Data from [State of New Jersey - GIS Open Data](https://njogis-newjersey.opendata.arcgis.com/datasets/d8223610010a4c3887cfb88b904545ff_4)
  * Location of schools administered by NJ Department of Education
* Railroad Station Location from [State of New Jersey - GIS Open Data](http://njogis-newjersey.opendata.arcgis.com/datasets/new-jersey-railroad-stations)
  * Location of all commuter train stations in NJ operated by:
    * NJ Transit
    * Port Authority Trans Hudson (PATH)
    * Port Authority Transit Corporation (PATCO)
    * Southeastern Pennsylvania Transportation Authority (SEPTA)

## Visualization Examples for Inspiration

![New Jersey Information](images/NJ_info.png)
![Diversity Information](images/Diversity.png)
![Transportation Report Card](images/Score_card.png)

## Workflow

### Step 1: Extract Data

* Hospital Ratings Data:

* New Jersey School Performance Reports:
  * Downloaded Excel file of 2017-18 Performance Reports Database by School: <https://rc.doe.state.nj.us/ReportsDatabase/PerformanceReports.xlsx>.
  * Extracted worksheet pages for desired metrics and exported as csv files.
  * Using jupyter notebook, imported csv data and converted to dataframes using PANDAS library.
  * Cleaned data in jupyter notebook.
    * Verified metrics fell within reasonable range
      * Student to teacher ratio: As to not provide misleading data, we erred on the side of caution and removed student to teacher ratios greater than or equal to 50:1 as they had a high probability as being faulty  based on a report from the Department of Education for 2011-2012 <https://nces.ed.gov/pubs2013/2013441.pdf>, which identifies the highest student to teacher ratio by state to be 23.4 and lowest to be 10.7.
  * Exported notebook code as python script and integrated it into clean.py.
  * Exported data from dataframe into SQL database.

* Median Income per School District:

* School and Railroad location Data:

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
