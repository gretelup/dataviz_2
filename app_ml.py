import json
import sqlite3

from flask import Flask, jsonify
from flask import request
from flask import make_response
app = Flask(__name__)

# Create database
conn = sqlite3.connect('nj_db.db')

school_file = open('school.geojson')
school_json = json.load(school_file)

#Create routes 
@app.route('/HOSPITAL/COUNTIES/<COUNTY>')
def hospital_county(COUNTY):
    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    data = c.execute('SELECT * FROM hospital WHERE COUNTY = ?',[COUNTY]).fetchall()
    conn.commit()
    conn.close()
    return jsonify(data)

@app.route('/SCHOOL/COUNTIES/<COUNTY>')
def school_county(COUNTY):
    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    data = c.execute('SELECT * FROM school WHERE COUNTY = ?',[COUNTY]).fetchall()
    conn.commit()
    conn.close()
    return jsonify(data)
   
@app.route('/HOSPITAL/CITIES/<CITY>')
def hospital_city(CITY):
    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    data = c.execute('SELECT * FROM hospital WHERE CITY = ?',[CITY]).fetchall()
    conn.commit()
    conn.close()
    return jsonify(data)

@app.route('/SCHOOL/CITIES/<CITY>')
def school_city(CITY):
    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    data = c.execute('SELECT * FROM school WHERE CITY = ?',[CITY]).fetchall()
    conn.commit()
    conn.close()
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=False, port=8000, host='localhost', threaded=True)