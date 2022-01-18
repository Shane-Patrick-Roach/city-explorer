import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      cityData: {},
      showCityInfo: false,
      errorMessage: '',
      renderError: false,

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

          
          



        </main>


      </>
    );
  }
}


export default App;



