# BIG TO DO: ADD ROUTES FOR INCOME IF WE DECIDE TO INCLUDE THAT
# IF WE DO, NEED TO UPDATE BOTH JS AS WELL
# IF WE DO NOT, ADJUST CLEAN SCRIPT APPROPRIATELY
# IF WE DECIDE NOT TO INCLUDE CITIES, GET RID OF THAT CODE

# Import dependencies
import json
import sqlite3
import pandas as pd
import os

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    make_response)

from clean import (
    clean_school,
    clean_income_zip,
    clean_hospital)

app = Flask(__name__)

# Create database
conn = sqlite3.connect('nj_db.db')

# Add geojson data to database
school_file = open(os.path.join("Resources", "school.geojson"))
school_json = json.load(school_file)
hospital_file = open(os.path.join("Resources", "hospitals.geojson"))
hospital_json = json.load(hospital_file)

# Clean school, income, zip code, and hospital data into database
clean_school()
clean_income_zip()
clean_hospital()

#Create routes 

@app.route("/")
def index():
    """Render the homepage."""
    
    # PUT CODE HERE
    return render_template("index.html")


@app.route('/school/counties/<COUNTY>')
def school_county(COUNTY):
    """DESCRIBE WHAT THIS DOES"""

    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    data = c.execute('SELECT * FROM school WHERE COUNTY = ?',[COUNTY]).fetchall()
    conn.commit()
    conn.close()
    return jsonify(data)


@app.route('/hospital/counties/<COUNTY>')
def hospital_county(COUNTY):
    """DESCRIBE WHAT THIS DOES"""

    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    data = c.execute('SELECT * FROM hospital WHERE COUNTY = ?',[COUNTY]).fetchall()
    conn.commit()
    conn.close()
    return jsonify(data)


@app.route('/school/state')
def school_state():
    """DESCRIBE WHAT THIS DOES"""

    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    
    # HERE'S WHERE THE WORK GOERS
    # data = c.execute()
    
    conn.commit()
    conn.close()
    return jsonify(data)


@app.route('/hospital/state')
def hospital_state():
    """DESCRIBE WHAT THIS DOES"""

    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    
    # HERE'S WHERE THE WORK GOERS
    # data = c.execute()
    
    conn.commit()
    conn.close()
    return jsonify(data)

# REVISIT THIS LATER
# @app.route('/school/cities/<CITY>')
# def school_city(CITY):
#     """DESCRIBE WHAT THIS DOES"""
    
#     conn = sqlite3.connect('nj_db.db')
#     c = conn.cursor()
#     data = c.execute('SELECT * FROM school WHERE CITY = ?',[CITY]).fetchall()
#     conn.commit()
#     conn.close()
#     return jsonify(data)
   

# @app.route('/hospital/cities/<CITY>')
# def hospital_city(CITY):
#     """DESCRIBE WHAT THIS DOES"""
    
#     conn = sqlite3.connect('nj_db.db')
#     c = conn.cursor()
#     data = c.execute('SELECT * FROM hospital WHERE CITY = ?',[CITY]).fetchall()
#     conn.commit()
#     conn.close()
#     return jsonify(data)

if __name__ == '__main__':
    app.run(debug=False, port=8000, host='localhost', threaded=True)