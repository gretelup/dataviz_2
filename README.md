# The Lovely Garden State: Interactive Web Dashboard

## Summary

We have created a map with an interactive dashboard for families looking to move to or within NJ that provides the user important information about a county that is easy to understand. The information includes school performance information, hospital rankings and availability.

## Group Members

* Arjun Subramaniam
* Smita Sharma
* Mike Lygas
* Gretel Uptegrove

## Motivation

A friend is looking for a place to live in New Jersey and would find it useful to have access to a tool that provides important information to families about possible locations to move to.

## Sources

* Hospital Rating Data from [Medicare](https://data.medicare.gov/Hospital-Compare/Hospital-General-Information/xubh-q36u)
  * Hospital location and ratings data
  * Includes a list of all hospitals that have been registered with Medicare. The list includes addresses, phone numbers, hospital type, and overall hospital ratings

* New Jersey School Performance Reports from [New Jersey Department of Education](https://rc.doe.state.nj.us/ReportsDatabase.aspx)
  * Performance data for schools administered by NJ Department of Education. Metrics include:
    * Student to teacher ratio by school
    * Standardized test scores by school

* School Location Data from [State of New Jersey - GIS Open Data](https://njogis-newjersey.opendata.arcgis.com/datasets/d8223610010a4c3887cfb88b904545ff_4)
  * This data features information consisting of point locations of public, private, and charter schools including grades Kindergarten to Grade 12, adult and vocational schools in New Jersey, that are regulated by the New Jersey Department of Education.

* New Jersey Data for Counties [State of New Jersey - GIS Open Data](https://njogis-newjersey.opendata.arcgis.com/datasets/new-jersey-counties)
  * This data set is a spatial representation of counties in New Jersey developed by the New Jersey Office of Information Technology (OIT), Office of Geographic Information Systems (OGIS). (GEOJson data used)


## Visualization Examples for Inspiration

![New Jersey Information](images/NJ_info.png)
![Diversity Information](images/Diversity.png)
![Transportation Report Card](images/Score_card.png)

## Workflow

### Step 1: Extract Data
* New Jersey School Performance Reports:
  * Downloaded Excel file of 2017-18 Performance Reports Database by School: <https://rc.doe.state.nj.us/ReportsDatabase/PerformanceReports.xlsx>.
  * Extracted worksheet pages for desired metrics and exported as csv files.
  * We created a connection to the database using SQLlite to store data 
  * Using jupyter notebook, imported csv data and converted to dataframes using PANDAS library.


### Step 2: Clean Data
 * Cleaned data in jupyter notebook.
    * Verified metrics fell within reasonable range
      * Student to teacher ratio: As to not provide misleading data, we erred on the side of caution and removed student to teacher ratios greater than or equal to 50:1 as they had a high probability as being faulty  based on a report from the Department of Education for 2011-2012 <https://nces.ed.gov/pubs2013/2013441.pdf>, which identifies the highest student to teacher ratio by state to be 23.4 and lowest to be 10.7.
  * Exported notebook code as python script and integrated it into clean.py.

  * Exported data from dataframe into SQL database.
    * School location Data
    * SAT Percentile math, SAT Percentile englsih. score and Hospital rating in report card data

  * clean.py: File containing functions for cleaning school and hospital data; these functions will be called within app.py.
    * Pandas
    * Numpy

  * insert Scheme image here of SQL lite database

### Step 3: Render Data
* Python Files:
  * app.py: Primary python script that sets up database and renders index via flask.
    * SQL
    * Flask
    * Requests

* HTML & CSS Files
  * index.html: Used to setup the webpage where data will be rendered
  * style.css: css file used to style the webpage 

* Javascript Files:
  * logic.js: File that extracts geojson data and maps it; also integrates data from the other sources and maps them as well.
  * config.js: stores the API key
  * jQuery-3.4.1.mn.js: used to render the animated bar chart and for the NJ map interactions
  * Visial.js: is used to create our plots and display on the webpage 

  Javascript Packages used:
    * Mapbox
    * Leaflet
    * d3
    * jQuery
    * Plotly

## Project Setup

1. Run: pip install -r requirements.txt

2. Functions are imported into app.py so just run app.py in the terminal it will extract, clean, and put the data in the database and sets up the flask route so it may be displayed.

3. Copy the http://localhost:8000/ into your web browser click on a county and view the data! When you click on a county in NJ the map will zoom in on the county and display the Average SAT Across NJ, Average hospital rating for the county, average Hospital Rating for the county, and the Hospital rating for the State.. 





  


  
