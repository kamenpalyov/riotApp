import React, { Component } from "react";
import {Form, Button} from "react-bootstrap";
import {withRouter, Link} from 'react-router-dom';
import './SearchBox.css'

class SearchBox extends Component {
  constructor(props){
    super(props);
    this.state={
      sumId:"",
      region:"EUW1"

    }
    // this.searchField=this.searchField.bind(this)
    // this.riotData=this.riotData.bind(this)
  }

  searchField=(event)=>{
    return this.setState({sumId:event.target.value})
  }
  regionField=(event)=>{
    return this.setState({region:event.target.value})
  }
  submitForm=()=>{
    fetch("http://localhost:3001/testapi",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(this.state)
      
    }).then(res=>res.json())
      .then(data=>this.props.data(data))
      


  }
  render() {
    
    return (
      <Form.Group>
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          placeholder="summoner name"
          name="sumId"
          onChange={this.searchField}
          className="search"
        />
        <Form.Label ></Form.Label>
        <Link className="button" to="/stats" onClick={this.submitForm}><i className="fas fa-search"></i></Link>
        <Form.Control onChange={this.regionField} as="select" className="drop-menu" name="region" id="">
          <option>EUW1</option>
          <option>BR1</option>
          <option>KR</option>
        </Form.Control>
        
      </Form.Group>
    );
  }
}


export default SearchBox;