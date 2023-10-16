import React, { useEffect, useState } from 'react';
import "./css/Temp.css";
import { FaStreetView } from "react-icons/fa";
import { PiSunFill } from "react-icons/pi";
import { BsCloudDrizzle } from "react-icons/bs"

function Template() {


  const [anyCity, setanyCity] = useState(null);
  const [Search, setSearch] = useState("Shimla");


  useEffect(() => {
    const fetchApi = async () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${Search}&units=metric&appid=1daeedb09d0b859e1d80cb4a5a131630`
      const response = await fetch(url);
      const resjson = await response.json();
      //console.log(resjson)
      setanyCity(resjson.main);

    };
    fetchApi();
  }, [Search]);


  // Time Day and Date how to Display
  const curDate = document.getAnimations("date");
  let weathercon = document.getAnimations("weathercon");

  const temprature = "clouds";
  const getCurrentDay = () => {
    const weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";



    let CurrentTime = new Date();
    let day1 = weekday[CurrentTime.getDay()];
    return day1
  };

  const getCurrentTime = () => {
    var months = ["jan", "Feb", "March", "April", "May", "june", "july", "Aug", "Sep",
      "Oct", "Nov", "Dec"]

    var Time = new Date();
    const month = months[Time.getMonth() + 1];
    const day = Time.getDate();

    let hours = Time.getHours();
    let mins = Time.getMinutes();

    let perios = "AM";

    if (hours > 11) {
      perios = "PM";
      if (hours > 12) hours -= 12;
    }

    if (mins < 10) {
      mins = "0" + mins;
    }
    return `${month} ${day} | ${hours} :${mins} ${perios}`;
  };
  curDate.innerhtml = getCurrentDay() + " | " + getCurrentTime();


  return (
    <>
      <div className='container-fluid'>
        <div className="row">
          <div className="center-div">

            <div className="wave">
              <div className="wave-two"></div>
              <div className="wave-three"></div></div>


            <div className="search-container">
              <input type="Search"
                className="search-input" placeholder='Search...'
                value={Search}
                onChange={(event) => { setSearch(event.target.value) }}
              />
            </div>

            {/* api data show */}
            {!anyCity ? (
              <p className='data-found'>No Data Found</p>
            ) : (
              <div>
                <BsCloudDrizzle className='cloud' />

                <div className='info'>
                  <h2 className='location'>
                    <FaStreetView />
                    <i className="icon-street">{Search}, In</i></h2>

                  <p id="date">Mon| oct 15 | 03 :20PM</p>

                  {/* api data show */}
                  <h2 className='weathercon'>
                    <PiSunFill className='sun' />
                    {anyCity.temp}°C
                  </h2>

                  <p className="pressure">Pressure -{anyCity.pressure}
                  </p>

                  <b className='sea-level'>sea-level_{anyCity.sea_level}
                    | Feels-like :{anyCity.feels_like}</b>
                  <h3 className='temp-min'>Min : {anyCity.temp_min}°C
                    ! Max : {anyCity.temp_max}°C </h3>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

    </>

  )
}

export default Template;

