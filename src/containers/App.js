import React, {Component} from 'react';
import { connect } from 'react-redux'

import CardList from '../components/CardList';
import Card from '../components/Card'
import SearchBox from '../components/SearchBox';



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      data:{
        stats:[],
        profileIconId:0,
        
      }
    }
  }
  riotData=(data)=>{
    return this.setState({data:data})
  }
  render(){
    return(
      <div>
        <SearchBox data={this.riotData}/>
        <CardList data={this.state.data}/>
      
      </div>
    )
    

  }

}

export default App ;