import React, { useState } from 'react'
import { useTaskContext } from '../context/TaskContext';
import axios from 'axios'

const TaskDetails = ({activity}) => {

  const { dispatch } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [editedAppName, setEditedAppName] = useState(activity.app_name);

  const handleCancel = () => {
    setErrorText('')
    setIsEditing(false)
  }

  const handleDelete = async () => {
    try {
    await axios.delete(`http://localhost:5000/api/time-manager/${activity.app_name}`);
    dispatch({type: 'DELETE_TASK', payload: activity.app_name})
    }
    catch (error) {
      console.log('Error deleting task:', error)
    }
  };

  const handleEdit = async () => {
    if (editedAppName.trim() === "") {
      setErrorText('Cannot leave name blank.');
      return;
    }
    else if (editedAppName === activity.app_name) {
      setErrorText("Edited name cannot be the same as the original name.");
      return;
    }

    try{
      await axios.put(`http://localhost:5000/api/time-manager/${activity.app_name}`, {app_name: editedAppName},
      { headers: { 'Content-Type': 'application/json' }});
      
      dispatch({type: 'UPDATE_TASK',  payload: { app_name: activity.app_name, new_app_name: editedAppName }})

      setIsEditing(false);
    }
    catch (error) {
      console.log('Error editing task:', error)
    }
  };

  return(
      <div className="block relative left-9 m-5 max-w-[50rem] p-8 rounded-2xl shadow-2xl bg-blue-900 border-gray-700 hover:bg-blue-600">

        {isEditing ? (
          <input type="text" value={editedAppName} onChange={e => setEditedAppName(e.target.value)} className="relative bottom-1 right-3 py-[0.25rem] px-3 rounded text-2xl font-bold"/>
          ) : (
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">{activity.app_name}</h3>)}
          <p className="font-normal text-gray-400"><strong>Time Spent: </strong>{activity.hours}h, {activity.minutes}m, {activity.seconds}s</p>

          {isEditing ? (
            <button 
              className="absolute right-6 top-0 bg-red-500 hover:bg-red-700 text-white font-bold py-[0.125rem] px-3 mt-4 rounded" onClick={handleCancel}> Cancel </button>
          ):(
            <button 
              className="absolute right-6 top-0 bg-red-500 hover:bg-red-700 text-white font-bold py-[0.125rem] px-3 mt-4 rounded" onClick={handleDelete}> X </button>)}
      


          {isEditing ? (
            <button className="absolute right-[7rem] top-0 bg-green-500 hover:bg-green-700 text-white font-bold py-[0.125rem] px-3 mt-4 rounded" onClick={handleEdit}> Save </button>
          ) : (
            <button
              className="absolute right-20 top-0 bg-gray-500 hover:bg-gray-600 text-white font-bold py-[0.125rem] px-3 mt-4 rounded" onClick={() => setIsEditing(true)}> Edit </button>
          )}
          {errorText && <p className="absolute bottom-2 text-red-500 font-bold">{errorText}</p>}
      </div>
  );
}

export default TaskDetails