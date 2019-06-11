# This script sets up the database and renders index via flask
# It calls functions from clean.py to import and clean data
# import necessary libraries
import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

#### INSERT CODE TO SET UP THE DATABASE ####

@app.route("/")
def index():
    """Render the homepage."""

    ### THE CODE HERE SHOULD CREATE THE INITIAL SCREEN WE SEE
    ### IT SHOULD CALL CLEANING FUNCTIONS -> INCLUDES PUTTING INTO DB
    ### DO WE WANT GEOJSON DATA IN DATABSE HERE? PUT IN IT'S OWN FUNCTION IN CLEANING SCRIPT?
    ### OR DO WE GET THE GEOJSON DATA IN JS?

    return render_template("index.html")

#### DO WE REALLY NEED ANY ADDITIONAL ROUTES?


__name__ == '__main__':
    app.run(debug=False, port=8000, host='0.0.0.0', threaded=True)
