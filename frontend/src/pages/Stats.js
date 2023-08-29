import React, { useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

import TaskDetails from '../components/TaskDetails'
import Header from '../components/Header'
import PiChart from '../components/PiChart'

import { useTaskContext } from '../context/TaskContext'


const Stats = () => {

  const { tasks, dispatch } = useTaskContext()

  const refreshTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/time-manager');
      
      const activitiesTotalTime = response.data.map(activity => ({
        ...activity,
        totalTime: activity.seconds + activity.minutes * 60 + activity.hours * 3600
      }));

      const sortedActivities = activitiesTotalTime.slice().sort((a, b) => b.totalTime - a.totalTime);

      dispatch({type: 'SET_TASKS', payload: sortedActivities})}
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/time-manager')
      .then(response => {      
        const activitiesTotalTime = response.data.map(activity => ({
        ...activity,
        totalTime: activity.seconds + activity.minutes * 60 + activity.hours * 3600
      }));

      const sortedActivities = activitiesTotalTime.slice().sort((a, b) => b.totalTime - a.totalTime);

      dispatch({type: 'SET_TASKS', payload: sortedActivities})
    })
      .catch(error => console.error(error));
  }, []);

    return(
      <motion.div initial={{width: 0}} animate={{width: '100%'}} exit={{x: window.innerWidth}}>
        <Header/>
          <button className="relative left-[3.5rem] w-[50rem] bg-blue-500 hover:bg-blue-700 text-white text-4xl font-bold py-[0.75rem] mt-4 rounded" onClick={refreshTasks}>REFRESH</button>
          <div className="mt-6 max-h-[43rem] w-[56rem] overflow-y-scroll scrollbar-thumb-slate-400 scrollbar-thin">
          {tasks && tasks.map((task, index) => (
                  <TaskDetails key={`${task.app_name}-${index}`} activity = {task}/>
              ))}
          </div> 
        <PiChart/>
      </motion.div>
    );
}

export default Stats