import React from 'react';
import Clock from './Clock';

export default function WeatherInfo(props) {
    const savedFavorites = props.favorites.includes(props.weatherData.city.name) ? 
    (<h2 onClick={props.removeFavorite} id={props.weatherData.city.name}>Remove As Favorite</h2>) :
    (<h2 onClick={props.setFavorite} id={props.weatherData.city.name}>Set As Favorite</h2>)
    
    return (
        <div>
            <div className="app-name">
                <h1>Niya's Weather App</h1>
            </div>
            <div className="weather-info">
                <h1>{props.weatherData.city.name}</h1>
                {savedFavorites}
                <img className="weather-icon" src={`http://openweathermap.org/img/wn/${props.weatherData.list[0].weather[0].icon}.png`} alt={props.weatherData.list[0].weather[0].main}/>
                <h3>{props.weatherData.list[0].main.temp} °C</h3>
                <Clock />
            </div>
        </div>
    )
}
