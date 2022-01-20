# APEX

Apache Incubator Project Explorer (APEX) is a long-term research project, in which models and algorithms to integrate and advance the analysis and visualization of social networks and technical networks are being developed. APEX is the design and implementation of a software tool intended for research in OSS projects, especially for ASF incubator projects.

## Installation

### Packages needed :
1. d3 v3
2. d3 v4
3. Bootstrap 3.3.5
4. jquery 1.9.2 or 2.1.3

## Usage

```bash
cd <downloaded project folder>
#run a local host server
python -m http.server
#or
python3 -m http.server
```

## Functionality / How to use the dashboard
Since APEX is designed to so as to understand the the socio-technical aspects of a Open Sourced Project it can be used in the following way.
1. First Use the input drop down menu/selector to select a the desired project
2. Once the project is selected all the windows will be populated with data or visuals 
3. The visuals show are:
   - **Graduation Forecast Visual**: 
       1. Which shows a forecast value associated with each project time period. 
       2. The current month for all the visuals can be also changed here by hover over the desired month and clicked to change the month
       3. Current month is indicated at all time by a red dot 
   - **Social Network**:
       1. Allows us to visualize the select project and the current months email exchange between developers working for that particular project 
       2. Visual has two sides , the sender nodes and the receiver nodes
       3. Both have a the names of the developers who participated in selected project and month . Also shows a percentage based on the number of replies in the receiver side or the number of emails sent in the sender side by that particular developer.
       4. On hovering over a particular developer on can drill through to further understand the developer habits and the email patterns based on who the email more often.
       5. On clicking on a particular developer . On can find their name available in the *Social Network Nodes* button where upon further clicking on will find a popover window all their emails sorted by the time.
   - **Technical Network**:
       1. All the functionality is the same as the social network. But instead it shows developer and the files that they have committed 
4. Below both the social and technical network visuals we shows some stats associated with the project for that month . Like Number of emails exchanges for that month , etc 
5. Some other functionality include the ability to resize windows to better understand the data /visuals/text. Also the social and technical networks have buttons to help control their size.

## Directory 
While for this I am only submitting the ```index.html``` file. Other files can be found at: [Link](https://github.com/anirudhsuresh/APEX_2.0)

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Current working version hosted here: [Link](https://anirudhsuresh.github.io/APEX/)

