import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Weather from './Weather.js';
import Movies from './Movies.js';

import './App.css';
import { Container } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      cityData: {},
      showCityInfo: false,
      errorMessage: '',
      renderError: false,
      weatherData: [],
      showWeatherData: false,
      movieData: [],
      showMovieData: false,

    }
  }

  handleChange = click => {
    
    this.setState({
      searchQuery: click.target.value,
    });
    
  }


  getCityInfo = async (e) => {
    e.preventDefault();
    try {let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`;


    let cityResults = await axios.get(url);

    this.setState({
      cityData: cityResults.data[0],
      showCityInfo: true,
      renderError: false
    })} catch(error){
      this.setState({
        renderError: true,
        errorMessage: `Error Occured: ${error.response.status}, ${error.response.data.error}`
      })
    }
    //this.getWeatherInfo();
    //this.getMovieInfo();
  }
  
  getWeatherInfo = async () => {

    try {let url = `${process.env.REACT_APP_SERVER_URL}/weather?lat=${Math.round(this.state.cityData.lat)}&lon=${Math.round(this.state.cityData.lon)}`;

    let weatherResults = await axios.get(url);

    this.setState({
      weatherData: weatherResults.data,
      showWeatherData: true,
      renderError: false
    })}catch(error){
      this.setState({
        renderError: true,
        errorMessage: `Error Occured with accessing weather API`
      })
    }
  }

  getMovieInfo = async () => {

    try{let url = `${process.env.REACT_APP_SERVER_URL}/movies?&location=${this.state.searchQuery}`;

    let movieResults = await axios.get(url);

    this.setState({
      movieData: movieResults.data,
      showMovieData: true,
      renderError: false
    })}catch(error){
      this.setState({
        renderError: true,
        errorMessage: `Error Occured with accessing movie API`
      })
    }
  }


  render() {

    return (
      <>
        <header>
          <h1>
            City Explorer
          </h1>
        </header>
        <main>
          
          <form onSubmit={this.getCityInfo}>
            <label> Pick a City!
              <input name= "city" type="text" onChange={this.handleChange}></input>
            </label>
            <button type="submit">Explore!</button>
          </form>

          {this.state.renderError && <p>{this.state.errorMessage}</p>}

          {this.state.showCityInfo && <article id='map'>
          <Container>

            <Card border="dark" style={{width: '70%'}} className="map">
              <Card.Img 
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`} 
              alt ='map'/>
              <Card.Body>
                <h2>{`Map of ${this.state.cityData.display_name}`} </h2>

              </Card.Body>
            </Card>

          </Container>
          
          <Weather
            weatherData={this.state.weatherData}
            showWeatherData={this.state.showWeatherData}
            getWeatherInfo={this.getWeatherInfo}
            renderError={this.state.renderError}
            errorMessage={this.state.errorMessage}

          />
          <Movies
            movieData={this.state.movieData}
            showMovieData={this.state.showMovieData}
            getMovieInfo={this.getMovieInfo}
          />
          </article>}

        </main>
      
      </>
    );
  }
}


export default App;



