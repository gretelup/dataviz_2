import sqlite3
import json

rail_file = open('rail.geojson')
rail_json = json.load(rail_file)
rail_file.close()

conn = sqlite3.connect('nj_db.db')
c = conn.cursor()
c.execute('DROP TABLE IF EXISTS rail;')
c.execute("""CREATE TABLE "rail" (
	"COUNTY"	TEXT,
	"MUN_LABEL"	TEXT,
    "LATITUDE"  NUMERIC,
    "LONGITUDE" NUMERIC
)""")

rows = []
for f in rail_json['features']:
    row = []
    row.append(f['properties']['COUNTY'])
    row.append(f['properties']['MUN_LABEL'])
    row.append((f['properties']['LATITUDE']))
    row.append((f['properties']['LONGITUDE']))
    rows.append(tuple(row))
    
c.executemany('INSERT INTO rail VALUES (?,?,?,?)', rows)
conn.commit()
conn.close()