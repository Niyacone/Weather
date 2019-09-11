import React from 'react';
import Clock from './Clock';

export default function WeatherInfo(props) {
    return (
        <div>
            <div className="app-name">
                <h1>Niya's Weather App</h1>
            </div>
            <div className="weather-info">
                <h1 onClick={props.setFavorite}>{props.weatherData.city.name}</h1>
                <img className="weather-icon" src={`http://openweathermap.org/img/wn/${props.weatherData.list[0].weather[0].icon}.png`} alt={props.weatherData.list[0].weather[0].main}/>
                <h3>{props.weatherData.list[0].main.temp} °C</h3>
                <Clock />
            </div>
        </div>
    )
}
