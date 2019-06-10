
# Import Dependencies
import pandas as pd
import os


# Import CSV and convert to dataframes
contact_df = pd.read_csv(os.path.join("Resources", "school_contact.csv"))
ratio_df = pd.read_csv(os.path.join("Resources", "school_ratio.csv"))
exp_df = pd.read_csv(os.path.join("Resources", "school_exp.csv"))
test_df = pd.read_csv(os.path.join("Resources", "school_test.csv"))

# Clean contact dataframe
# Drop unnecessary columns
contact_df = contact_df[["DISTRICT_CODE", "DISTRICT_NAME", "SCHOOL_CODE", "SCHOOL_NAME", "GRADESPAN"]]

# Verify no missing data
contact_df.isnull().sum()

# Verify data are of correct type
contact_df.dtypes

# Create unique key column from district and school codes
contact_df["DS_CODE"] = contact_df["DISTRICT_CODE"].map(str) + "-" + contact_df["SCHOOL_CODE"].map(str)

# Verify no duplicate district-school codes
contact_df[contact_df.duplicated(['DS_CODE'])]

# Verify no incorrect data in grade span
contact_df.GRADESPAN.unique()


# Clean ratio dataframe
# Drop and rename columns
ratio_df = ratio_df[["DistrictCode", "SchoolCode", "Student_Teacher_School", \
    "Student_Teacher_District"]]
ratio_df = ratio_df.rename(columns={"DistrictCode": "DISTRICT_CODE", "SchoolCode": "SCHOOL_CODE",                                     "Student_Teacher_School": "SCH_RAT", "Student_Teacher_District": "DIST_RAT"})

# Verify no missing data
ratio_df.isnull().sum()

# Verify data are of correct type
ratio_df.dtypes

# Create unique key column from district and school codes
ratio_df["DS_CODE"] = ratio_df["DISTRICT_CODE"].map(str) + "-" + \
    ratio_df["SCHOOL_CODE"].map(str)

# Verify no duplicate district-school codes
ratio_df[ratio_df.duplicated(['DS_CODE'])]

# Review ratios to verify no junk data
ratio_df.SCH_RAT.unique()

# Based on research, we decided probable inaccurate data would be values 
# greater than 50:1
# So as to provide as little inaccurate data as possible, 
# replaced these values with None
# Also replace "N" values with None

ratio_df = ratio_df.replace(["148:1", "53:1", "56:1", "50:1", "152:1", "66:1", \
    "106:1", "74:1", "245:1", "268:1", "520:1", "327:1", "N"], None)

# Clean expense dataframe
# Drop and rename columns
exp_df = exp_df[["DistrictCode", "Total"]]
exp_df = exp_df.rename(columns={"DistrictCode": "DISTRICT_CODE", \
    "Total": "EXPENSE"})

# Verify no null values
exp_df.isnull().sum()

# Verify no duplicate districts
exp_df[exp_df.duplicated(["DISTRICT_CODE"])]

# Inspect expense values; clean and format expense column 
# Replace missing values with None; cast as integer
exp_df.EXPENSE.unique()
exp_df = exp_df.replace("N", None)
exp_df["EXPENSE"] = exp_df["EXPENSE"].astype('int64')

# Verify values are of the correct type
exp_df.dtypes

# Clean test dataframe

# Drop and rename columns
test_df = test_df[["DistrictCode", "SchoolCode", "Test", "Subject", "School_Avg", "State_avg"]]
test_df = test_df.rename(columns={"DistrictCode": "DISTRICT_CODE", "SchoolCode": "SCHOOL_CODE",                                  "SchoolCode": "SCHOOL_CODE", "Test": "TEST", "School_Avg": "SCH_AVG",                                   "State_avg": "STATE_AVG"})

# Verify no missing data
test_df.isnull().sum()

# Drop any duplicate rows
test_df.drop_duplicates()

# Create unique key column from district and school codes
test_df["DS_CODE"] = test_df["DISTRICT_CODE"].map(str) + "-" + test_df["SCHOOL_CODE"].map(str)

# Combine test and subject columns
test_df["TEST"] = test_df["TEST"] + ": " + test_df["Subject"]
test_df = test_df.drop("Subject", axis = 1)

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

contact_df.to_csv(os.path.join('Data_temp', 'school_contact_cleaned.csv'))
ratio_df.to_csv(os.path.join('Data_temp', 'school_ratio_cleaned.csv'))
exp_df.to_csv(os.path.join('Data_temp', 'school_expense_cleaned.csv'))
test_df.to_csv(os.path.join('Data_temp', 'school_test_cleaned.csv'))