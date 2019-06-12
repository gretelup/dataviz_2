
#Import dependencies
import pandas as pd
import os
import sqlite3

# Import CSV and convert to dataframes
IncomeZip_df = pd.read_csv(os.path.join("Resources", "income_zip.csv"))
zip_df = pd.read_csv(os.path.join("Resources", "zip.csv"))

# Clean Income dataframe

# Select desired columns for data frame
IncomeZip_df = IncomeZip_df[['GEO.display-label', 'HC01_EST_VC13']]

#Rename columns 
IncomeZip_df = IncomeZip_df.rename( index=str, columns = {"GEO.display-label": "ZIP","HC01_EST_VC13": "MED_INCOME"})

# Verify no missing data
IncomeZip_df.isnull().sum()

# Find duplicate rows
IncomeZip_df[IncomeZip_df.duplicated(['ZIP'])]

#Verify correct data stypes
IncomeZip_df.dtypes

# Inspect data 
IncomeZip_df.MED_INCOME.unique()



# Replace missing values and invalid values with None
IncomeZip_df = IncomeZip_df.replace("N", None)
IncomeZip_df = IncomeZip_df.replace(["-", "250,000+"], None)

# Remove extra characters from zip code
temp_df = IncomeZip_df["ZIP"].str.split(" ", n = 1, expand = True)
IncomeZip_df["ZIP"] = temp_df[1]

# Drop the first row
IncomeZip_df = IncomeZip_df.drop(IncomeZip_df.index[0])

# Change income column to interger value
IncomeZip_df["MED_INCOME"] = IncomeZip_df["MED_INCOME"].astype('int64')
IncomeZip_df["ZIP"] = IncomeZip_df["ZIP"].astype('int64')

# Verify correct data types
IncomeZip_df.dtypes

# Clean Zip code dataframe
zip_df.head()

#Drop all ZIPs that are not in NJ
zip_df = zip_df.merge(IncomeZip_df, how="right", on = "ZIP").drop(labels = "MED_INCOME", axis =1)

# Verify no missing data
zip_df.isnull().sum()

# Find duplicate rows
zip_df[zip_df.duplicated(['ZIP'])]

# Verify data are of the correct type
zip_df.dtypes

# connect to database and drop/insert tables if exists
conn = sqlite3.connect('nj_db.db')
IncomeZip_df.to_sql("income",conn,if_exists="replace")
zip_df.to_sql("zip",conn,if_exists="replace")