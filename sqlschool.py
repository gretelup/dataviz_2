import sqlite3
import json
import os

school_file = open(os.path.join("Resources", "school.geojson"))
school_json = json.load(school_file)
school_file.close()

conn = sqlite3.connect('nj_db.db')
c = conn.cursor()
c.execute('DROP TABLE IF EXISTS school;')
c.execute('''CREATE TABLE "school" (
	"SCHOOLNAME"	TEXT,
	"ADDRESS1"	TEXT,
	"UTM_X"	INTEGER,
	"UTM_Y"	INTEGER,
    "COUNTY"	TEXT,
	"CITY"	TEXT,
	"STATE"	TEXT,
	"CATEGORY"	TEXT,
	"SCHOOLTYPE"	TEXT,
    "DIST_CODE"    TEXT,
    "SCHOOLCODE"    TEXT,
    "DS_CODE"       TEXT,
    "LATITUDE"      DECIMAL,
    "LONGITUDE"     DECIMAL,
    "ZIP"           TEXT
    

)''')

rows = []
for f in school_json['features']:
    row = []
    row.append(f['properties']['SCHOOLNAME'])
    row.append(f['properties']['ADDRESS1'])
    row.append((f['properties']['X']))
    row.append((f['properties']['Y']))
    row.append(f['properties']['COUNTY'])
    row.append(f['properties']['CITY'])
    row.append(f['properties']['STATE'])
    row.append(f['properties']['CATEGORY'])
    row.append(f['properties']['SCHOOLTYPE'])
    row.append(f['properties']['DIST_CODE'])
    row.append(f['properties']['SCHOOLCODE'])
    row.append(f['properties']['DIST_CODE']+"-"+(f['properties']['SCHOOLCODE']))
    row.append(f['geometry']['coordinates'][0])
    row.append(f['geometry']['coordinates'][1])
    row.append(f['properties']['ZIP_TRUNC'])
    rows.append(tuple(row))
    

c.executemany('INSERT INTO school VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', rows)
conn.commit()
conn.close()
