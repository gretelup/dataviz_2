import json
import sqlite3

from flask import Flask, jsonify
from flask import request
from flask import make_response
app = Flask(__name__)

# Create database
conn = sqlite3.connect('nj_db.db')


# Create data files
rail_file = open('rail.geojson')
rail_json = json.load(rail_file)

hospital_file = open('Hospitals.geojson')
hospital_json = json.load(hospital_file)

school_file = open('school.geojson')
school_json = json.load(school_file)

# Create routes
@app.route('/hospital_data')
def hospital_data():
    r = make_response(json.dumps(hospital_json))
    r.headers['Content-Type'] = 'application/json'
    return r

@app.route('/rail_data')
def rail_data():
    r = make_response(json.dumps(rail_json))
    r.headers['Content-Type'] = 'application/json'
    return r

@app.route('/school_data')
def school_data():
    c = conn.cursor()
    r = make_response(json.dumps(school_json))
    r.headers['Content-Type'] = 'application/json'
    return r

@app.route('/info')
def info():
    city = request.args.get('city')
    county = request.args.get('county')
    conn = sqlite3.connect('nj_db.db')
    c = conn.cursor()
    data = c.execute('SELECT * FROM school WHERE CITY = ? OR COUNTY = ?',[city,county]).fetchall()
    conn.commit()
    conn.close()
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=False, port=8000, host='localhost', threaded=True)