import React, { useEffect, useRef, useState } from 'react'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);
import useAxiosPrivate from '../../hooks/useAxiosPrivate'


const LineChart = ({name}) => {
    
    const axiosPrivate = useAxiosPrivate();
    const [datas, setDatas] = useState([])
    const apiCalled = useRef(false);

    const fetchData = async () =>{
        const response = await axiosPrivate.get("/user/priceHistory",{
            params: {
                value: name
            }
        })
        console.log(response?.data?.priceHistory)
        setDatas(response?.data?.priceHistory)
    }

    useEffect(() => {
      if(!apiCalled.current) {
        fetchData()
        apiCalled.current = true
      }
    }, [])

    useEffect(() => {
      const interval = setInterval(fetchData, 60000)
    
      return () => {
        clearInterval(interval)
      }
    }, [])
        

    const data = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        datasets: [
            {
                label: name,
                data: datas,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Price Over Time (Last 30 Minutes)',
            },  
        },
    }

    return (
        <div className='w-full md:w-5/6'>
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChart