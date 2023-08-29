from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), 'appDuration.db')

app = Flask(__name__)
CORS(app, origins="*", allow_headers=["Content-Type"], methods=["GET", "POST", "PUT", "DELETE"])
app_times = {}

@app.route('/api/time-manager', methods=['GET'])
def timeManagement_get():
    try:
        data = []

        with sqlite3.connect(db_path) as connect:
            cursor = connect.cursor()

            cursor.execute('SELECT * FROM timeManagement')
            rows = cursor.fetchall()
            for row in rows:
                data.append({"app_name": row[0], 
                            "seconds": row[1],
                            "minutes": row[2],
                            "hours": row[3]})

        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route('/api/time-manager', methods=['POST'])
def timeManagement_post():
    try:
        data = request.json 

        app_name = data.get("app_name")
        seconds = data.get("seconds")
        minutes = data.get("minutes")
        hours = data.get("hours")

       
        total_time = seconds + minutes * 60 + hours * 3600

        with sqlite3.connect(db_path) as connect:
            cursor = connect.cursor()

            cursor.execute('SELECT * FROM timeManagement WHERE app_name = ?', (app_name,))
            existing_row = cursor.fetchone()

            if existing_row:
                new_total_time = existing_row[1] + (existing_row[2]*60) + (existing_row[3]*3600) + total_time
                
                cursor.execute('UPDATE timeManagement SET seconds = ?, minutes = ?, hours = ? WHERE app_name = ?', 
                    (round(new_total_time % 60, 1), round((new_total_time // 60) % 60, 1), round(new_total_time // 3600, 1), app_name))

            else:
                cursor.execute('INSERT INTO timeManagement (app_name, seconds, minutes, hours) VALUES (?, ?, ?, ?)', 
                    (app_name, round((total_time % 60), 1), round(((total_time // 60) % 60), 1), round((total_time // 3600), 1)))
            
            connect.commit()

        return jsonify({"message": existing_row})
    except Exception as e:
        return jsonify({"error": str(e)})
        
@app.route('/api/time-manager/<app_name>', methods=['DELETE'])
def timeManagement_delete(app_name):
    try:
        with sqlite3.connect(db_path) as connect:
            cursor = connect.cursor()

            cursor.execute('DELETE FROM timeManagement WHERE app_name = ?', (app_name,))
            connect.commit()

        return jsonify({"message": "Record deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/api/time-manager/<app_name>', methods=['PUT'])
def timeManagement_update(app_name):
    try:
        new_app_name = request.json.get("app_name")

        with sqlite3.connect(db_path) as connect:
            cursor = connect.cursor()

            cursor.execute('SELECT * FROM timeManagement WHERE app_name = ?', (app_name,))
            existing_row = cursor.fetchone()

            if existing_row:
                cursor.execute('SELECT * FROM timeManagement WHERE app_name = ?', (new_app_name,))
                new_row = cursor.fetchone()

                if new_row:
                    total_time = existing_row[1] + new_row[1] + 60*(existing_row[2] + new_row[2]) + 3600*(existing_row[3] + new_row[3])

                    minutes, seconds = divmod(total_time, 60)
                    hours, minutes = divmod(minutes, 60)

                    cursor.execute('UPDATE timeManagement SET seconds = ?, minutes = ?, hours = ? WHERE app_name = ?', 
                        (round(seconds, 1), round(minutes, 1), hours, new_app_name))
            
                    cursor.execute('DELETE FROM timeManagement WHERE app_name = ?', (app_name,))
                else:
                    cursor.execute('UPDATE timeManagement SET app_name = ? WHERE app_name = ?', (new_app_name, app_name))
            else:
                cursor.execute('UPDATE timeManagement SET app_name = ? WHERE app_name = ?', (new_app_name, app_name))
                

        return jsonify({"message": "App name updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)