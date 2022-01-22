import React from "react";

import { ListGroup } from "react-bootstrap";


class WeatherDay extends React.Component{

render() {
  return (
    <ListGroup.Item>
      Date: {this.props.day.date}, High: {this.props.day.maxTemp}, Low: {this.props.day.lowTemp},{this.props.day.description}
    </ListGroup.Item>
  )
}

}


export default WeatherDay;
