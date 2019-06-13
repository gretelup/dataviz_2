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


@app.route('/counties')
def counties():
    """DESCRIBE WHAT THIS DOES"""

    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()

    # SMITA DO THIS - RETURN A SIMPLE LIST OF COUNTIES
    data = c.execute('SELECT DISTINCT COUNTY FROM hospitals').fetchall()
    #Returns 21 county
    conn.commit()
    conn.close()
    return jsonify(data)


@app.route('/school/counties/<COUNTY>')
def school_county(COUNTY):
    """DESCRIBE WHAT THIS DOES"""

    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()

    # SMITA THIS NEEDS TO BE FIXED B/C NO COUNTY IN SCHOOL; NEED TO DO FANCY MATCHING W/ DS_CODE
    # JOIN BETWEEN school table and the geojson school table by DS_CODE, find county

    query='''SELECT SCHOOL.COUNTY county, SCHOOL.CATEGORY category,
    ROUND(AVG(TEST.MATH_SCH_AVG), 2) math_avg, ROUND(AVG(TEST.ENG_SCH_AVG), 2) eng_avg,
    ROUND(AVG(TEST.MATH_STATE_AVG), 2) math_state_avg, ROUND(AVG(TEST.ENG_STATE_AVG), 2) eng_state_avg
    FROM SCHOOL
    JOIN TEST ON TEST.DS_CODE=SCHOOL.DS_CODE
    WHERE SCHOOL.COUNTY = ?
    GROUP BY SCHOOL.COUNTY, SCHOOL.CATEGORY'''

    data = c.execute(query,[COUNTY]).fetchall()
    conn.commit()
    conn.close()
    return jsonify(data)


@app.route('/hospital/counties/<COUNTY>')
def hospital_county(COUNTY):
    """DESCRIBE WHAT THIS DOES"""

    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    query2='''SELECT H.NAME,H.CITY,H.ZIP,H.COUNTY,H.RATE,H.CARE_EFF,Z.LAT,Z.LNG'\ 
    FROM hospitals H
    JOIN zip Z
    WHERE H.zip=Z.zip AND COUNTY = ?'''
    data = c.execute(query2,[COUNTY]).fetchall()
    conn.commit()
    conn.close()
    return jsonify(data)


@app.route('/school/state')
def school_state():
    """DESCRIBE WHAT THIS DOES"""

    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    
    # SMITA - DO THIS MATH_SCHOOL_AVG, MATH_STATE_AVG, ENG_SCHOOL_AVG, ENG_STATE_AVG- return 
    # data = c.execute()
    query_s='SELECT MATH_SCH_AVG,MATH_STATE_AVG,ENG_SCH_AVG,ENG_STATE_AVG,'\
    'FROM TEST T'
    data=c.execute(query_s)
    conn.commit()
    conn.close()
    return jsonify(data)


@app.route('/hospital/state')
def hospital_state():
    """DESCRIBE WHAT THIS DOES"""

    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    
    # HERE'S WHERE THE WORK GOERS
    # SMITA - RETURN ALL REQUIRED HOSPITAL DATA
    # data = c.execute()
    query_h='SELECT COUNTY, ROUND(AVG(RATE), 2) avg_rate'\
    'FROM HOSPITALS'\
    'GROUP BY COUNTY'
    data=c.execute(query_h)
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