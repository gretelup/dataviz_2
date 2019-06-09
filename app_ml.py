import json

from flask import Flask
from flask import request
from flask import make_response
app = Flask(__name__)
    
@app.route('/hospital_data')
def hospital_data():
    hospital_file = open('Hospitals.geojson')
    hospital_json = json.load(hospital_file)

    r = make_response(json.dumps(hospital_json))
    r.headers['Content-Type'] = 'application/json'
    return r

@app.route('/rail_data')
def rail_data():
    rail_file = open('rail.geojson')
    rail_json = json.load(rail_file)
    r = make_response(json.dumps(rail_json))
    r.headers['Content-Type'] = 'application/json'
    return r

@app.route('/school_data')
def school_data():
    school_file = open('school.geojson')
    school_json = json.load(school_file)
    r = make_response(json.dumps(school_json))
    r.headers['Content-Type'] = 'application/json'
    return r

if __name__ == '__main__':
    app.run(debug=False, port=8000, host='0.0.0.0', threaded=True)