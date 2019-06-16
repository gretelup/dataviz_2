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
    # clean_geojson_hospital,
    clean_geojson_school,
    clean_school,
    clean_income,
    clean_hospital,
    clean_income_zip)


# Set up Flask
app = Flask(__name__)

# Create database
conn = sqlite3.connect('nj_db.db')

# Add geojson data to database
school_file = open(os.path.join("Resources", "school.geojson"))
school_json = json.load(school_file)
hospital_file = open(os.path.join("Resources", "hospitals.geojson"))
hospital_json = json.load(hospital_file)

# Set variable for county geojson to be passed in route
county_file = open(os.path.join("Resources", "counties.geojson"))
county_json = json.load(county_file)
# Clean data and import into database
# clean_geojson_hospital()
clean_geojson_school()
clean_school()
clean_income_zip()
clean_hospital()
clean_income()

#Create routes 

@app.route("/")
def index():
    """Render the homepage."""
    

    return render_template("index.html")


@app.route("/counties/location")
def counties_locations():
    """Returns geojson of countiesf for NJ"""
    
    return jsonify(county_json)


@app.route("/counties")
def counties():
    """Returns list of counties for NJ"""

    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    data = c.execute('SELECT DISTINCT COUNTY FROM hospitals').fetchall()
    
    return jsonify(data)


@app.route("/income/state")
def income():
    """Returns jsonified list of income for all counties in NJ"""

    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    data = c.execute('''SELECT COUNTY, INCOME
        FROM income''').fetchall()
    conn.commit()
    conn.close()

    income_dict=[]
    for d in data:
        dict={"county":d[0],"income":d[1],}
        income_dict.append(dict)
    
    return jsonify(income_dict)


@app.route('/school/counties/<COUNTY>')
def school_county(COUNTY):
    """Returns jsonified list of average SAT scores for county and state"""


    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()

    query='''SELECT SCHOOL.COUNTY county,
        ROUND(AVG(TEST.MATH_SCH_AVG), 2) math_avg, ROUND(AVG(TEST.ENG_SCH_AVG), 2) eng_avg,
        ROUND(AVG(TEST.MATH_STATE_AVG), 2) math_state_avg, ROUND(AVG(TEST.ENG_STATE_AVG), 2) eng_state_avg
        FROM SCHOOL
        JOIN TEST ON TEST.DS_CODE=SCHOOL.DS_CODE
        WHERE SCHOOL.COUNTY = ?
        GROUP BY SCHOOL.COUNTY'''

    data = c.execute(query,[COUNTY]).fetchall()
    school_dict=[]
    for d in data:
        dict={"county":d[0],"math_avg":d[1],"eng_avg":d[2],"math_state_avg":d[3],
        "eng_state_avg":d[4]}
        school_dict.append(dict)
    conn.commit()
    conn.close()
    return jsonify(school_dict)


@app.route('/hospital/counties/<COUNTY>')
def hospital_county(COUNTY):
    """Returns jsonified list of rating informatin for hospitals
    in specified county"""


    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    query2='''SELECT H.NAME,H.CITY,H.ZIP,H.COUNTY,H.RATE,H.CARE_EFF,Z.LAT,Z.LNG 
        FROM hospitals H
        JOIN zip Z
        WHERE H.zip=Z.zip AND COUNTY = ?'''
    data = c.execute(query2,[COUNTY]).fetchall()
    hospitals_dict=[]
    for d in data:
        dict={"name":d[0],"city":d[1],"zip":d[2],"county":d[3],"rate":d[4],"care_eff":d[5],"lat":d[6],"lng":d[7]}
        hospitals_dict.append(dict)
    conn.commit()
    conn.close()
    return jsonify(hospitals_dict)



@app.route('/school/state')
def school_state():
    """Returns jsonified list of average SAT scores for state """

    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    
    query_s='''SELECT SCHOOL.COUNTY county,
     (ROUND(AVG(TEST.MATH_SCH_AVG), 2)+ ROUND(AVG(TEST.ENG_SCH_AVG), 2))AS ENG_MATH_SUM
       FROM SCHOOL
       JOIN TEST ON TEST.DS_CODE=SCHOOL.DS_CODE
       GROUP BY SCHOOL.COUNTY'''

    data=c.execute(query_s).fetchall()
    test_dict=[]
    for d in data:
        dict={"county": d[0], "sat_avg":d[1]}
        test_dict.append(dict)
    
    conn.commit()
    conn.close()
    return jsonify(test_dict)


@app.route('/hospital/state')
def hospital_state():
    """Returned jsonified list of hospitals and ratings
    for state"""

    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    
    # data = c.execute()
    query_h='''SELECT COUNTY, ROUND(AVG(RATE), 2) avg_rate
        FROM hospitals
        GROUP BY COUNTY'''
    data=c.execute(query_h).fetchall()
    hosp_county_dict=[]
    for d in data:
        dict={"county":d[0],"avg_rate":d[1]}
        hosp_county_dict.append(dict)
    
    conn.commit()
    conn.close()
    return jsonify(hosp_county_dict)

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