
function getKeysByDay(data) {
  var daysData = {}
  var usersData = {}
  var hoursData = {}
  var recCount = 0

  // get for users
  data.forEach((rec) => {

    // make original data as object
    var record = {
      "id": rec[0],
      "user_id": rec[1],
      "key_count": rec[2],
      "time_start": rec[3],
      "time_end": rec[4]
    }

    // add users key
    if (!usersData.hasOwnProperty(rec[1])) {
      usersData[rec[1]] = []
    }

    usersData[rec[1]].push(record)

    recCount++
  });
  // end data.t

  // add to hour
  const keys = Object.keys(usersData)
  keys.forEach((key, index) => {
    usersData[key].forEach((rec) => {
      
      // check hour of time_start
      var day = rec.time_start.split(' ')
      var today = day[0]
      var time = day[1].split(":")
      var hour = time[0]

      // add to hour key
      if (!hoursData.hasOwnProperty(hour)) {
        hoursData[hour] = {}
      }

      if (!hoursData[hour].hasOwnProperty(key)) {
        hoursData[hour][key] = []
      }

      hoursData[hour][key].push(rec)

      // add to day
      if (!daysData.hasOwnProperty(today)) {
        daysData[today] = {}
      }

      if (!daysData[today].hasOwnProperty(hour)) {
        daysData[today][hour] = {}
      }
      daysData[today] = hoursData
    })
  })

  // console.log(daysData)
  // console.log("total count: " + recCount)

  return daysData
}

function getAppByDay(data) {
  var daysData = {}
  var usersData = {}
  var hoursData = {}
  var recCount = 0

  // get for users
  data.forEach((rec) => {
    // make original data as object
    var record = {
      "id": rec[0],
      "user_id": rec[1],
      "app": rec[2],
      "title": rec[3],
      "time_start": rec[4],
      "time_end": rec[5],
      "is_web": rec[6],
    }

    // add users key
    if (!usersData.hasOwnProperty(rec[1])) {
      usersData[rec[1]] = []
    }

    usersData[rec[1]].push(record)

    recCount++
  });
  // end data.t

  // add to hour
  const keys = Object.keys(usersData)
  keys.forEach((key, index) => {
    usersData[key].forEach((rec) => {
    
      // check hour of time_start
      var day = rec.time_start.split(' ')
      var today = day[0]
      var time = day[1].split(":")
      var hour = time[0]

      // add to hour key
      if (!hoursData.hasOwnProperty(hour)) {
        hoursData[hour] = {}
      }

      if (!hoursData[hour].hasOwnProperty(key)) {
        hoursData[hour][key] = []
      }

      hoursData[hour][key].push(rec)

      // add to day
      if (!daysData.hasOwnProperty(today)) {
        daysData[today] = {}
      }

      if (!daysData[today].hasOwnProperty(hour)) {
        daysData[today][hour] = {}
      }
      daysData[today] = hoursData
    })
  })

  // console.log(hoursData)
  // console.log(daysData)
  // console.log("total count: " + recCount)

  return daysData
}

function getAppByApp(data) {
  var appData = {}
  var usersData = {}
  var hoursData = {}
  var recCount = 0

  // get for users
  data.forEach((rec) => {
    // make original data as object
    var record = {
      "id": rec[0],
      "user_id": rec[1],
      "app": rec[2],
      "title": rec[3],
      "time_start": rec[4],
      "time_end": rec[5],
      "is_web": rec[6],
    }

    // add users key
    if (!usersData.hasOwnProperty(rec[1])) {
      usersData[rec[1]] = []
    }

    usersData[rec[1]].push(record)

    recCount++
  });
  // end data.t

  // add to app
  const keys = Object.keys(usersData)
  keys.forEach((key, index) => {
    usersData[key].forEach((rec) => {
      var app_name = rec.app
      var delimeter = ' '
 
      // check app name if web
      if (rec.is_web !== '0' && rec.title != null) {
        if (rec.title.trim() !== '') {
          app_name = rec.title.split(delimeter).splice(-2).join(" ")
        }
      }
      // add to app key
      if (!appData.hasOwnProperty(app_name)) {
        appData[app_name] = {}
      }

      if (!appData[app_name].hasOwnProperty(key)) {
        appData[app_name][key] = []
      }

      appData[app_name][key].push(rec)
    })
  })

  // console.log(hoursData)
  // console.log(appData)
  // console.log("total count: " + recCount)

  return appData
}

function getKeyByApp(data) {
  var appData = {}
  var keyData = {}
  var newData = {}
  var usersData = {}
  var hoursData = {}

  keyData =  getKeysByDay(data.t)
  appData =  getAppByDay(data.a)

  var keyDays = Object.keys(appData)
  var keyHours = []
  var keyUsers = []

  keyDays.forEach((keyDay) => {
    keyHours = Object.keys(appData[keyDay])
    keyHours.forEach((hourKey) => {

      keyUsers = Object.keys(appData[keyDay][hourKey])
      keyUsers.forEach((userKey) =>{
        var user_record = {
          "keystrokes" : keyData[keyDay][hourKey][userKey] ?? {},
          "app" : appData[keyDay][hourKey][userKey] ?? {}
        }
        if(!usersData.hasOwnProperty(userKey)) {
          usersData[userKey] = {}
        }
        usersData[userKey] = user_record
      })

      if(!hoursData.hasOwnProperty(hourKey)) {
        hoursData[hourKey] = {}
      }

      hoursData[hourKey] = usersData

    })

    if(!newData.hasOwnProperty(keyDay)) {
      newData[keyDay] = {}
    }

    newData[keyDay] = hoursData
  })

  // console.log(newData)
  

  return newData
  // return hoursData
}

module.exports = () => {
  // arrays
  var newData = {}
  var keysByDayData = {}
  var appByDayData = {}
  var appByAppData = {}
  var keysByAppData = {}

  // get data from json
  const data = require('./data/sample_data.json');
  // const data = require('./data/sample.json');
  // sample console
  // data.t.map((rec) => rec.map((item) => console.log(item)))

  // ------------------------------------------

  keysByDayData = getKeysByDay(data.t);
  appByDayData = getAppByDay(data.a);
  appByAppData = getAppByApp(data.a);
  keysByAppData = getKeyByApp(data);

  newData = {
    "keys_hour" : keysByDayData,
    "app_hour" : appByDayData,
    "app_app" : appByAppData,
    "keys_app" : keysByAppData,
  }

  // console.log(newData)

  return newData
} // end module