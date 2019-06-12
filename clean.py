import sqlite3
import pandas as pd
import os

def clean_school():
    """Extracts and cleans school review data.
    Enters data into SQL database"""

    # Import CSV and convert to dataframes
    test_df = pd.read_csv(os.path.join("Resources", "school_test.csv"))

    # Clean test dataframe

    # Drop and rename columns
    test_df = test_df[["DistrictCode", "SchoolCode", "Test", "Subject", "School_Avg", "State_avg"]]
    test_df = test_df.rename(columns={"DistrictCode": "DISTRICT_CODE", "SchoolCode": "SCHOOL_CODE",                                  "SchoolCode": "SCHOOL_CODE", "Test": "TEST","School_Avg": "SCH_AVG",                                   "State_avg": "STATE_AVG"})

    # Verify no missing data
    test_df.isnull().sum()

    # Drop any duplicate rows
    test_df.drop_duplicates()

    # Add leading zeros to district and school codes
    test_df["DISTRICT_CODE"] = test_df["DISTRICT_CODE"].apply(lambda x: "{0:0>4}".format(x))
    test_df["SCHOOL_CODE"] = test_df["SCHOOL_CODE"].apply(lambda x: "{0:0>3}".format(x))

    # Create unique key column from district and school codes
    test_df["DS_CODE"] = test_df["DISTRICT_CODE"].map(str) + "-" + test_df["SCHOOL_CODE"].map(str)

    # Review ACT scores to verify no missing values and scores within valid range
    ACT_df = test_df[test_df['TEST'].str.contains('ACT')]
    ACT_df.SCH_AVG.unique()
    ACT_df.STATE_AVG.unique()

    # Review SAT scores to verify no missing values and scores within valid range
    SAT_df = test_df[test_df['TEST'].str.contains('SAT')]
    SAT_df.SCH_AVG.unique()
    SAT_df.STATE_AVG.unique()

    # Replace missing values with None and cast as integer
    test_df = test_df.replace(["N", "*"], None)
    test_df["SCH_AVG"] = test_df["SCH_AVG"].astype('int64')

    # Verify values are of the correct type
    test_df.dtypes

    # Filter only SAT scores and separate into columns for Math and English
    test_df = test_df.loc[test_df['TEST'] == "SAT"]
    math_df = test_df.loc[test_df["Subject"] == "Math"]
    english_df = test_df.loc[test_df["Subject"] == "Reading and Writing"]
    english_df = english_df[["DS_CODE", "Subject", "SCH_AVG", "STATE_AVG"]]
    english_df = english_df.rename(columns={"SCH_AVG": "ENG_SCH_AVG", "STATE_AVG": "ENG_STATE_AVG"})
    math_df = math_df.rename(columns={"SCH_AVG": "MATH_SCH_AVG", "STATE_AVG": "MATH_STATE_AVG"})
    math_df = math_df[["Subject", "MATH_SCH_AVG", "MATH_STATE_AVG", "DS_CODE"]]
    test_df = math_df.merge(english_df, on="DS_CODE", how="outer")
    test_df = test_df.drop(labels = {"Subject_x", "Subject_y"}, axis = 1)

    # Verify no missing data
    test_df.isnull().sum()

    # connect to database and drop/insert 'test' table if exists
    conn = sqlite3.connect('nj_db.db')
    test_df.to_sql("test",conn,if_exists="replace")

def clean_income_zip():
    """Extracts and cleans income and zipcode data.
    Enters data into SQL database"""

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

def clean_hospital():
    """Extracts and cleans income data.
    Enters data into SQL database"""

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

    # Drop any duplicate rows
    hospital_df.drop_duplicates()

    # hospital_nj_df=hospital_df.loc[hospital_df['State'].isin("NJ")]
    hospital_nj_df= hospital_df[hospital_df['State'] == "NJ"]

    # Drop and rename columns
    hospital_nj_df= hospital_nj_df[["Hospital Name","City","ZIP Code","County Name","Hospital overall rating",
                                    "Effectiveness of care national comparison"]]
    hospital_nj_df= hospital_nj_df.rename(columns={"Hospital Name":"NAME","City":"CITY","ZIP Code":"ZIP",
                                                "County Name":"COUNTY","Hospital overall rating":"RATE",
                                                "Effectiveness of care national comparison":"CARE_EFF"})


    hospital_nj_df.loc[hospital_nj_df.CARE_EFF=="Same as the national average", 'CARE_EFF'] = "0"
    hospital_nj_df.loc[hospital_nj_df.CARE_EFF=="Above the national average", 'CARE_EFF'] = "1"
    hospital_nj_df.loc[hospital_nj_df.CARE_EFF=="Below the national average", 'CARE_EFF'] = "-1"

    # Drop rows with unavailable data
    hospital_nj_df=hospital_nj_df[hospital_nj_df['CARE_EFF'] != "Not Available"]

    # connect to database and drop/insert tables if exists
    conn = sqlite3.connect('nj_db.db')
    hospital_nj_df.to_sql("hospitals",conn,if_exists="replace")

clean_school()
clean_income_zip()
clean_hospital()