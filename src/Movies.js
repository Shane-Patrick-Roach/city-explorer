import React from "react";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

class movies extends React.Component {


  render() {
    
    
    let moviesToRender = this.props.movieData.map((movie, idx) =>
    <ListGroup.Item key={idx}>
      <Card border="dark" style={{width: '25%'}}>
        <Card.Img
          src ={movie.image_url}
          alt ={movie.overview}>
        </Card.Img>

      </Card>
    </ListGroup.Item>
  
  )


    return (
      <article>
        <button onClick={this.props.getMovieInfo}>Show Movies</button>
        {
          this.props.showMovieData &&
          <ListGroup>
            {moviesToRender}
          </ListGroup>

        }
      </article>
    )
  }
}

export default movies;
