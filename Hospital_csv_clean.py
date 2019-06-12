# Import Dependencies
import pandas as pd
import numpy as np
import os

# Import CSV and convert to dataframes
hospital_df = pd.read_csv(os.path.join("Resources", "Hospital_General_Information.csv"))

# Drop unnecessary columns
hospital_df = hospital_df[["Hospital Name","Address","City","State","ZIP Code","County Name","Phone Number","Hospital Type","Emergency Services",
"Hospital overall rating","Safety of care national comparison","Patient experience national comparison",
"Effectiveness of care national comparison"]]

# Count Number of null data
hospital_df.isnull().sum() 

# Verify data are of correct type
# hospital_df.dtypes
# hospital_df.infer_objects().dtypes
hospital_df.dtypes

total_rows =hospital_df["Hospital Name"].count


# Drop any duplicate rows
hospital_df.drop_duplicates()

hospital_df.to_csv(os.path.join('Resources', 'hospital_cleaned.csv'))

# hospital_nj_df=hospital_df.loc[hospital_df['State'].isin("NJ")]
hospital_nj_df= hospital_df[hospital_df['State'] == "NJ"]

total_rows =hospital_nj_df["Hospital Name"].count

# Drop and rename columns
hospital_nj_df= hospital_nj_df[["Hospital Name","City","ZIP Code","County Name","Hospital overall rating",
                                "Effectiveness of care national comparison"]]
hospital_nj_df= hospital_nj_df.rename(columns={"Hospital Name":"NAME","City":"CITY","ZIP Code":"ZIP",
                                               "County Name":"COUNTY","Hospital overall rating":"RATE",
                                               "Effectiveness of care national comparison":"CARE_EFF"})


hospital_nj_df.loc[hospital_nj_df.CARE_EFF=="Same as the national average", 'CARE_EFF'] = "0"

hospital_nj_df.loc[hospital_nj_df.CARE_EFF=="Above the national average", 'CARE_EFF'] = "1"

hospital_nj_df.loc[hospital_nj_df.CARE_EFF=="Below the national average", 'CARE_EFF'] = "-1"

hospital_nj_df=hospital_nj_df[hospital_nj_df['CARE_EFF'] != "Not Available"]





