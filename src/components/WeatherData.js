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
        console.log(this.state.favorites);
        console.log(localStorage);
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
        if(!this.state.favorites.includes(e.target.id)){
            let newFavorites = [...this.state.favorites, e.target.id]
            console.log(newFavorites);
            
            localStorage.setItem('Favorites', JSON.stringify(newFavorites));
            console.log(localStorage);

            await this.setState({
                favorites: newFavorites
            })
        } else {
            alert(`${e.target.id} is already marked as favorite`);
        }
    }
    removeFavorite = async (e) => {
        e.preventDefault();
        console.log(e.target.id);
        // // TA BORT FRÅN FAVORITER.
        if(this.state.favorites.includes(e.target.id)){
            let newFavorites = this.state.favorites.filter(f => f !== e.target.id);
            localStorage.setItem('Favorites', JSON.stringify(newFavorites));
            await this.setState({
                favorites: newFavorites
            })
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
                <WeatherInfo favorites={this.state.favorites} removeFavorite={this.removeFavorite} weatherData={this.state.weatherData} setFavorite={this.setFavorite}/>
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
