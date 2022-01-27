# APEX

Open Source Software (OSS) is a major component of our digital infrastructure, yet more than 80% of such projects fail. Seeking less uncertainty, many OSS projects join established software communities, e.g., the Apache Software Foundation (ASF), with established rules and community support to guide projects toward sustainability. In their nascent stage, ASF projects are incubated in the ASF incubator (ASFI), which provides systematic mentorship toward long-term sustainability. Projects in ASFI eventually conclude their incubation by either graduating, if successful, or retiring, if not.

Time-stamped traces of developer activities are publicly available from ASF, and can be used for monitoring project trajectories toward sustainability. Here we present a web app dashboard tool, APEX, that allows internal and external stakeholders to monitor and explore ASFI project sustainability trajectories, including social and technical networks. Through use cases we demonstrate APEX's utility in monitoring for project downturn events, identifying longer term engagements, and project comparison.

## Installation

### Packages needed :
1. d3 v3
2. d3 v4
3. Bootstrap 3.3.5
4. jquery 1.9.2 or 2.1.3
5. noUiSlider 

## Usage to test in local machine 

```bash
cd <downloaded project folder>
#run a local host server
python -m http.server
#or
python3 -m http.server
```

## Functionality / How to use the dashboard
Since APEX is designed so as to understand the socio-technical aspects of an Open Sourced Project it can be used in the following way.
1. First Use the input drop-down menu/selector to select the desired project
2. Once the project is selected all the windows will be populated with data or visuals 
3. The visuals show are:
   - **Graduation Forecast Visual**: 
       1. Which shows a forecast value associated with each project time period. 
       2. The current month for all the visuals can be also changed here by hovering over the desired month and clicking to change the month
       3. Current month is indicated at all times by a red dot 
   - **Social Network**:
       1. Allows us to visualize the select project and the current months email exchange between developers working for that particular project 
       2. Visual has two sides, the sender nodes, and the receiver nodes
       3. Both have the names of the developers who participated in the selected project and month. Also shows a percentage based on the number of replies on the receiver side or the number of emails sent on the sender side by that particular developer.
       4. On hovering over a particular developer one can drill through to further understand the developer habits and the email patterns based on who the email is more often.
       5. On clicking on a particular developer. One can find their name available in the *Social Network Nodes* button whereupon further clicking on will find a popover window all their emails sorted by the time.
   - **Technical Network**:
       1. All the functionality is the same as the social network. But instead, it shows the developer and the files that they have committed 
4. Below both the social and technical network visuals we show some stats associated with the project for that month. Like Number of emails exchanges for that month, etc 
5. Some other functions include the ability to resize windows to better understand the data /visuals/text. Also, the social and technical networks have buttons to help control their size.
6. As well as clicking the range slider checkbox enables the months to be in terms of a range and one can use the new two handle slider to cycle through month ranges and all the other visual, metrics would dynamically adjust accordingly  

## How to use APEX with custom data:
1. Project Name --> Divide all Data into number of Months Active 
2. Data folder structure should be ProjectName-->Number of Months --> all other data
3. Each data is discussed in more detail below
  - **Email network data**: 
       1. Initial CSV file with developer names and receiver names
       2. Final JSON format needed: sender_name, receiver_name, num_emails between them 
       4. Example of the required data is in [APEX/UPDATED_Data/new/new_emails/](https://github.com/anirudhsuresh/APEX/tree/main/UPDATED_Data/new/new_emails)
       5. Code [Email_Scripts](https://github.com/anirudhsuresh/APEX/blob/main/emails_data_script.ipynb) Can be used as a reference
  - **Technical network data**: 
       1. Initial CSV file with developer names and file names
       2. Final JSON format needed : developer_name, file_name, num_commit
       4. Example of the required data is in [APEX/UPDATED_Data/new/grouped_new_commits/](https://github.com/anirudhsuresh/APEX/tree/main/UPDATED_Data/new/grouped_new_commits)
       5. Code [Commits_Scripts](https://github.com/anirudhsuresh/APEX/blob/main/Commits_script.ipynb) Can be used as a reference
 
   - **Email / Commit Metrics data**: 
       1. Initial CSV file with developer names and file names and receiver names for emails 
       2. Final JSON format needed : Emails--> num_emails,num_senders,email_per_developer | commits--> num_commits, num_committers ,commit_per_devloper
       4. Example of the required data for emails: APEX/tree/main/UPDATED_Data/new/email_measures](https://github.com/anirudhsuresh/APEX/tree/main/UPDATED_Data/new/email_measures) | for commits : [APEX/tree/main/UPDATED_Data/new/commits_measure](https://github.com/anirudhsuresh/APEX/tree/main/UPDATED_Data/new/commits_measure)
       5. Code [Email_Metrics_Scripts](https://github.com/anirudhsuresh/APEX/blob/main/measures_for_emails_.ipynb)  Commits: [Commits_Script](https://github.com/anirudhsuresh/APEX/blob/main/Commits_Measures_.ipynb)
       Can be used as a reference
    - **About Data**:
       1.  Needs to be a JSON format simalar to this structure : {"project_name": "Abdera", "alias": "abdera", "description": "An implementation of the Atom Syndication Format and Atom Publishing Protocol.", "sponsor": "Incubator", "mentor": "Garrett Rooney, Paul Querna", "start_date": "2006-06-06", "end_date": "2008-11-08", "status": "Graduated", "incubation_time": "29"}
- **Reports or Progress Data**:
   1. containing the report or the progress resport in a text format
   2. Example Data [Link](https://github.com/anirudhsuresh/APEX/blob/main/data1/1/0.txt)
- ** Forecast Data**:

## Directory
```
UPDATED DATA
├── new
│   ├── commits_measure : Data about the commit measurements
│   ├── email_measures :Data about the email measurements
│   ├── new_about_data : Data about the various projects
│   ├── new_emails : Data for social network
│   ├── gouped_new_commits :Data for tech network 
│   ├── new_forecast : Data for forecast viz
│   └── new_month_intervals : Data about the dates
├── new_monthly_commits
│   └── Commmit Links Data : Data about the commit links
├── Takeout
│   └── Drive
│       └── new_deep_dive_email_data
│           └── tester_monthly_emails
│               └── Emails Links Data : data about the email links
└── data1
    └── report data

```

## Grant:
[Grant](https://nsf.gov/awardsearch/showAward?AWD_ID=2020751)
## License
[MIT](https://choosealicense.com/licenses/mit/)

## Current working version hosted here: [Link](https://anirudhsuresh.github.io/APEX/)

