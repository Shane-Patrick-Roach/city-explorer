import React from "react";
import { Card, Col } from "react-bootstrap";



class MovieDay extends React.Component{

render() {
  return (
    <Col>
    
    <Card border="dark" style={{width: '100%'}}>
      <Card.Img
        src ={this.props.movie.image_url}
        alt ={this.props.movie.overview}>
      </Card.Img>
    </Card>
    
    </Col>
  )
}

}


export default MovieDay;
