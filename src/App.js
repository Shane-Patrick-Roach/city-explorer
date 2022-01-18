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
    console.log('button was clicked');
    e.preventDefault();
    this.setState({
      searchQuery: e.target.value,
    });


  }

  getCityInfo = async (e) => {
    e.preventDefault();
    try {let url = `https://us1.locationiq.com/v1/search.php?key=pk.a0564b3cd5bfb3e88f0a9cc3ccabd717&q=${this.state.searchQuery}&format=json`;

    //console.log(url);

    let cityResults = await axios.get(url);

    //console.log(cityResults.data[0].lat)
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
    console.log(`https://maps.locationiq.com/v3/staticmap?key=pk.a0564b3cd5bfb3e88f0a9cc3ccabd717&center=${this.state.cityData.lat},${this.state.cityData.lat}&zoom=16`);

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
            <p>{this.state.cityData.display_name}</p>
            <p>{this.state.cityData.lat}</p>
            <p>{this.state.cityData.lon}</p>
            {this.state.renderError && <p>{this.state.errorMessage}</p>}
            
            <Card border="dark" style={{width: '70%'}} className="map">


              <Card.Img 
              
              src={`https://maps.locationiq.com/v3/staticmap?key=pk.a0564b3cd5bfb3e88f0a9cc3ccabd717&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`} 
              alt ='map'/>




            </Card>
        
          </article>}

          
          



        </main>


      </>
    );
  }
}


export default App;



