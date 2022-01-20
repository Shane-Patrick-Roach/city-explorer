import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { ListGroup, ListGroupItem } from 'react-bootstrap';




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
      showMovieData: false

    }
  }

  handleChange = e => {
    //e.preventDefault();
    this.setState({
      searchQuery: e.target.value,
    });
  }




  getCityInfo = async (e) => {
    e.preventDefault();
    try {let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`;


    let cityResults = await axios.get(url);

    this.setState({
      cityData: cityResults.data[0],
      showCityInfo: true
    })} catch(error){
      this.setState({
        renderError: true,
        errorMessage: `Error Occured: ${error.response.status}, ${error.response.data.error}`
      })
    }

  }
  
  getWeatherInfo = async e => {
    e.preventDefault();

    //console.log(this.state.lon)
    //route to hit //http://localhost:3002/weather?searchQuery=Seattle
    //let url = `${process.env.REACT_APP_SERVER_URL}/weather?searchQuery=${this.state.searchQuery}`
    let url = `${process.env.REACT_APP_SERVER_URL}/weather?lat=${Math.round(this.state.cityData.lat)}&lon=${Math.round(this.state.cityData.lon)}`;

    let weatherResults = await axios.get(url);

    console.log(weatherResults.data);

    this.setState({
      weatherData: weatherResults.data,
      showWeatherData: true
    })
    
  }

  getMoviesInfo = async e => {
    e.preventDefault();

    // route to hit --- http://localhost:3002/movies?&query=Seattle

    let url = `${process.env.REACT_APP_SERVER_URL}/movies?&query=${this.state.searchQuery}`;

    let movieResults = await axios.get(url);

    console.log(movieResults.data);

    this.setState({
      movieData: movieResults.data,
      showMovieData: true

    })


  }







  render() {

    let weatherToRender = this.state.weatherData.map((day, idx) => 
      <ListGroup.Item key={idx}>
        Date: {day.date}, High: {day.maxTemp}, Low: {day.lowTemp},{day.description}
      </ListGroup.Item>
    )

    let moviesToRender = this.state.movieData.map((movie, idx) =>
      <ListGroup.Item key={idx}>
        <Card>
          <Card.Img
            src ={movie.image_url}
            alt ={movie.overview}>
          </Card.Img>

        </Card>
      </ListGroup.Item>
    
    )



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

          {this.state.showCityInfo && <article>
            
            {this.state.renderError && <p>{this.state.errorMessage}</p>}
            
            <Card border="dark" style={{width: '70%'}} className="map">


              <Card.Img 
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`} 
              alt ='map'/>
              <Card.Body>
                <h1>{`Map of ${this.state.cityData.display_name}`} </h1>
                <p>{this.state.cityData.lat}</p>
                <p>{this.state.cityData.lon}</p>
              </Card.Body>
              <Card.Footer>
                <p>LocationIQ API</p>
              </Card.Footer>

            </Card>
        
          </article>}
          <article>
            <button onClick={this.getWeatherInfo}>Show Weather</button>
            {
            this.state.showWeatherData && 
              <ListGroup>
                {weatherToRender}
              </ListGroup>
            
            }

          </article>
          <article>
            <button onClick={this.getMoviesInfo}>Show Movies</button>
            {
            this.state.showMovieData && 
              <ListGroup>
                {moviesToRender}
              </ListGroup>

            }
          </article>

          
          



        </main>


      </>
    );
  }
}


export default App;



