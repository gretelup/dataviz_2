import sqlite3
import json

hospital_file = open('Hospitals.geojson')
hospital_json = json.load(hospital_file)
hospital_file.close()

conn = sqlite3.connect('nj_db.db')
c = conn.cursor()
c.execute('DROP TABLE IF EXISTS hospital;')
c.execute("""CREATE TABLE "hospital" (
    "NAME"      TEXT,
    "TYPE"      TEXT,
	"COUNTY"	TEXT,
	"CITY"	TEXT,
    "LATITUDE"  NUMERIC,
    "LONGITUDE" NUMERIC,
    "ADDRESS"   TEXT
)""")


rows = []
for f in hospital_json['features']:
    row = []
    row.append(f['properties']['NAME'])
    row.append(f['properties']['TYPE'])
    row.append(f['properties']['COUNTY'])
    row.append(f['properties']['CITY'])
    row.append(f['properties']['LATITUDE'])
    row.append(f['properties']['LONGITUDE'])
    row.append(f['properties']['ADDRESS'])

    rows.append(tuple(row)

c.executemany('INSERT INTO hospital VALUES (?,?,?,?,?,?,?)', rows)
conn.commit()
conn.close()