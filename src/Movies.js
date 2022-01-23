import React from "react";
import MovieDay from "./MovieDay";
import { Row } from 'react-bootstrap';

class Movies extends React.Component {


  render() {
    
    
    let moviesToRender = this.props.movieData.map((movie, idx) =>
    <MovieDay key={idx} movie={movie} />
  
  )


    return (
      <article>
        <button onClick={this.props.getMovieInfo}>Show Movies</button>
        {
          this.props.showMovieData &&
          <Row xs={1} sm={2} md={3} lg={4} >
          {moviesToRender}
        </Row>

        }
      </article>
    )
  }
}

export default Movies;
