import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useTaskContext } from '../context/TaskContext'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(Tooltip, Legend, ArcElement)

const PiChart = () => {

  const { tasks } = useTaskContext()
  const [Labels, setLabels] = useState([])
  const [TimeSpent, setTimeSpent] = useState([])
  const [BackgroundColors, setBackgroundColors] = useState([])

  useEffect(() => {
        const activitiesTotalTime = tasks.map(activity => ({
        ...activity,
        totalTime: activity.seconds + activity.minutes * 60 + activity.hours * 3600
      }));

      const sortedActivities = activitiesTotalTime.slice().sort((a, b) => b.totalTime - a.totalTime);

      setLabels(sortedActivities.map(activity => activity.app_name)); 
      setTimeSpent(sortedActivities.map(activity => activity.totalTime));
      setBackgroundColors(sortedActivities.map(activity => {
        const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
        const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
        return randomRGB()
      }))
      
  }, [tasks]);

  const data = {
    labels: Labels,

    datasets: [{
        data: TimeSpent,
        borderColor: '#1e1b4b',
        borderWidth: 3,
        backgroundColor: BackgroundColors,
    }]
  };
  
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
  }

  return(
    <div className="absolute right-[6rem] top-[7rem] w-[50rem] h-[50rem]">
      <Doughnut height = {300} data = {data} options = {options}/>
    </div>
  );
}

export default PiChart