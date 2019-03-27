import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

class Homepage extends Component {
  
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://192.168.1.10:3001/testing"
    };
  }
  
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }
    
  render() {
	const { response } = this.state;
	
    return (
		<div className="wrap">			
			Homepage Content
		</div>
    );
  }
}

export default Homepage;
