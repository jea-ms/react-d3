import BarChart from "./components/Barchart";
import React from 'react'
import { useState, useEffect } from "react"

import data from './data/sample_data.json'
// import data from './data/sample.json'

const App = () => {
  // console.log(data)
  data.t.map((rec) => rec.map((item) => console.log(item)))
  const hourKeys = [
    '00', '01', '02', '03', '04', '05',
    '06', '07', '08', '09', '10', '11',
    '12', '13', '14', '15', '16', '17',
    '18', '19', '20', '21', '22', '23',
  ]
  const [keysByDayData, setKeysByDayData] = useState({})
  const [appByDayData, setAppByDayData] = useState({})
  const [appByAppData, setAppByAppData] = useState({})

  // start func
  data.t.forEach((rec) => {
    console.log(rec[3])
    // arrays
    var keysData = {}

    let day = rec[3].split(' ')
    let time = day[1].split(":")
    let hour = time[0]
    var user = rec[1]
    let userData.user = item

    console.log(userData)


    // for(var i = 0; hourKeys.length > i; i++){
    //   if(!keysData.hasOwnProperty(hourKeys[i])){
    //     keysData.hourKeys[i].push()
    //   }
    // }
    
  
  })

  // end func

  // start func sort by time
  // data.t.map((rec) =>
  //   rec.forEach((item, index) => {
  //     console.log(index)
  //     for (let index = 0; index < item.length; index++) {
  //       const element = item[index];
  //       console.log(index)
  //       console.log(element)
  //     }
  //   }
  //   ))
  // end func


  return (
    <>
      <BarChart
        data={[12, 5, 6, 6, 9, 10]}
        width={700}
        height={300} />
    </>

  )
}

export default App

