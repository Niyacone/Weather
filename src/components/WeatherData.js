import React, { Component } from 'react';
import WeatherInfo from './WeatherInfo';
import WeatherDetail from './WeatherDetail';
import Search from './Search';
import Favorites from './Favorites';

export default class WeatherData extends Component {
    constructor(props){
        super(props);
        this.state = {
            weatherData: [],
            favorites: []
        };
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition( (position) => {
            this.getWeather(position)
        })

        this.getFavorites();
    }

    async getFavorites(){
        if(localStorage.getItem('Favorites') !== null) {
            await this.setState({
                favorites: JSON.parse(localStorage.getItem('Favorites'))
            });
        }
    }

    getWeather = (position) => {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=421d8adcd486477776f4a2020a8749cc&units=metric`)
        .then(response => response.json())
        .then(json =>
            this.setState({
                weatherData: json
        }))
    }

    setFavorite = async (e) => {
        e.preventDefault();

        // SPARA TILL FAVORITER OM DEN INTE REDAN EXISTERAR.
        if(!this.state.favorites.includes(e.target.innerHTML)){
            let newFavorites = [...this.state.favorites, e.target.innerHTML]
            localStorage.setItem('Favorites', JSON.stringify(newFavorites));
            await this.setState({
                favorites: newFavorites
            })
        } else {
            alert(`${e.target.innerHTML} is already marked as favorite`);
        }
    }

    getFavoriteCity = (e) => {
        e.preventDefault();
        this.apiCall(e.target.innerHTML);
    }

    searchCity = (e) => {
        e.preventDefault();
        this.apiCall(e.target.search.value);
    }

    apiCall(cityName){
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=421d8adcd486477776f4a2020a8749cc&units=metric`)
        .then(response => {
            if(response.ok === true) {
                response.json()
                .then(json => 
                    this.setState({
                        weatherData: json
                    }))
            } else {
                alert('City not found, did you misspell?');
            }
        });
    }

    render() {
        const weatherPresentation = this.state.weatherData.length === undefined ? (
            <div>
                <WeatherInfo weatherData={this.state.weatherData} setFavorite={this.setFavorite}/>
                <WeatherDetail weatherData={this.state.weatherData} />
            </div>
        ) : null
        return (
            <div>
                <div className="search-box">
                    <Search searchCity={this.searchCity} />
                </div>
                {weatherPresentation}
                <Favorites favorites={this.state.favorites} getFavoriteCity={this.getFavoriteCity}/>
            </div>
        )
    }
}
