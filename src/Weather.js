import React from "react";
import WeatherDay from "./WeatherDay";

import { ListGroup } from "react-bootstrap";

class Weather extends React.Component {

  render() {

    let weatherToRender = this.props.weatherData.map((day, idx) => 
    <WeatherDay key={idx} day={day} />
  )

    return (
    <article>
      <button onClick={this.props.getWeatherInfo}>Show Weather</button>
      {this.props.renderError && <p>{this.props.errorMessage}</p>}
      
      {
      this.props.showWeatherData && 
        <ListGroup>
          {weatherToRender}
        </ListGroup>
      }
    </article>

    )
  }
}

export default Weather;
