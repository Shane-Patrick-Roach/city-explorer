import React from "react";


import { ListGroup } from "react-bootstrap";

class weather extends React.Component {



  render() {

    let weatherToRender = this.props.weatherData.map((day, idx) => 
    <ListGroup.Item key={idx}>
      Date: {day.date}, High: {day.maxTemp}, Low: {day.lowTemp},{day.description}
    </ListGroup.Item>
  )

    return (
    <article>
      <button onClick={this.props.getWeatherInfo}>Show Weather</button>
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

export default weather;
