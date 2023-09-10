# Task Tracker

A Python script and a counterpart React Web app to record time spent on each app, personalized to fit my needs. <br>
This was made to bring awareness to how I manage my time. 🕒

## How does it work?

Once the Python script is running, it will run through a while loop where it will check whether the user has changed tabs or not. <br>
If they have changed tabs it will then send a POST request containing information on the time spent and the app name. <br>
Before the information is added to the SQL database, the backend will first check if the app has already been logged. <br>
If it has been logged, it will generate a new sum of the total time spent on the app. <br>
The React web app will display the information. <br>

### Use of ThreeJS, Framer Motion, and Tailwind CSS

https://github.com/Akashem06/TaskTracker/assets/130705280/053809a6-2393-421f-a313-fe539a5d6a9b

### CRUD SQLite API and Context API 

https://github.com/Akashem06/TaskTracker/assets/130705280/174d99cd-cd69-4d4a-ab3e-e9b0b6acef4e


