import React from 'react'

export default function WeatherDetail(props) {
    const eigthItem = (arr, eight) => arr.filter((e, i) => i % eight === eight - 1);
    
    const fiveDays = (eigthItem(props.weatherData.list, 8).map((day, i) => {
        return(
            <div key={i} className="weather-details">
                <h4>{day.dt_txt.slice(0, -9)}</h4>
                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt={day.weather[0].main}/>
                <h5>{day.main.temp_min}°C / {day.main.temp_max}°C</h5>
            </div>
        )})) 

        return (
            <div>
                {fiveDays}
            </div>
        )
}
