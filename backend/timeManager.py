import time
import pyautogui
import sqlite3
import requests

prior_window_title = "BootingUp"
start_time = time.time()

connect = sqlite3.connect('appDuration.db')
cursor = connect.cursor()

cursor.execute('DELETE FROM timeManagement')
connect.commit()

connect.close()

def calculateTime(time):
    minutes, seconds = divmod(time, 60)
    hours, minutes = divmod(minutes, 60)
    return [round(seconds, 1), round(minutes, 1), hours]

while True:
    window_title = pyautogui.getActiveWindowTitle()

    if (window_title != prior_window_title) & (prior_window_title != None and "google.com/search" not in prior_window_title) & (prior_window_title != ""):

        end_time = time.time()
        elapsed_time = end_time - start_time
        start_time = time.time()

        if ("Discord" in prior_window_title) or ("discord.com" in prior_window_title):
            prior_window_title = "Discord"
        elif ("YouTube" in prior_window_title):
            prior_window_title = "YouTube"
        elif ("Twitch" in prior_window_title):
            prior_window_title = "Twitch"
        elif ("Visual Studio Code" in prior_window_title):
            prior_window_title = "Visual Studio Code"
        elif ("Launching" in prior_window_title) or ("Friends List" in prior_window_title) or ("Launcher" in prior_window_title):
            prior_window_title = "Game Menu"
        elif ("Google" in prior_window_title) or ("New Tab" in prior_window_title):
            prior_window_title = "Searching Web"

        if elapsed_time > 5: 
            post_data = {
                "app_name": prior_window_title,
                "seconds": calculateTime(elapsed_time)[0],
                "minutes": calculateTime(elapsed_time)[1],
                "hours": calculateTime(elapsed_time)[2]
            }

            try:
                post_url = "http://localhost:5000/api/time-manager"
                headers = {"Content-Type": "application/json"}
                response = requests.post(post_url, json=post_data, headers=headers)

            except Exception as e:
                connect.rollback()

    prior_window_title = window_title
