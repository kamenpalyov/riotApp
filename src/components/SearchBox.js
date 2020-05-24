import React, { Component } from "react";
import {Form,} from "react-bootstrap";
import { Link} from 'react-router-dom';
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
  componentDidMount(){
    let input= document.querySelector("#input-search")
    input.addEventListener("keyup",event=>{
      if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector(".search-btn").click();
       }
    })
  }
  
  render() {
    
    
    return (
      <div style={{display:"flex"}}>
        <div className="search-box">
          <input 
          className="search-txt"
          name="sumId"
          placeholder="search"  
          type="search"
          onChange={this.searchField}
          id="input-search"
          autoComplete="off"
          />
          
          <Link className="search-btn" to="/stats" onClick={this.submitForm}><i className="fas fa-search"></i></Link>
        </div>
        
        
        <Form.Control onChange={this.regionField} as="select" className="drop-menu" name="region" id="">
          <option>EUW1</option>
          <option>BR1</option>
          <option>KR</option>
        </Form.Control>
        
      </div>  
     
    );
    
  }
}


export default SearchBox;