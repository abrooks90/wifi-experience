import React, { Component } from 'react';
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homePage';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');

class App extends Component {

state = {
    data: null
};
    
	componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
	}
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
	callBackendAPI = async () => {
    const response = await fetch('/');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }

    return body;
};
  
  render() {
    return (
      <div className="App">
		<Header />
			<Homepage />
		<Footer />
      </div>
    );
  }
}

export default App;
