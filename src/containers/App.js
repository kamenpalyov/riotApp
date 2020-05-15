import React, { Component } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import Card from "../components/Card";
import Nav from "../components/Nav";
import SearchBox from "../components/SearchBox";
import { Route, Switch, NavLink } from "react-router-dom";
import styles from "./App.module.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        stats: [],
        profileIconId: 0,
        matchStats:{},
        games:{},
        region:""
      },
      champions:{}
    };
  }
  riotData = (data) => {
    return this.setState({ data: data });
  };

  componentDidMount(){
    fetch("http://ddragon.leagueoflegends.com/cdn/10.9.1/data/en_US/champion.json")
      .then(res=>res.json())
      .then(data=>this.setState({champions:data})
    )}

  render() {
    return (
      <div>
        <header className={styles.header}>
          
            <Nav/>
            <SearchBox data={this.riotData} history={this.props.history} />
          
          
        </header>
        <div>

          <Switch>
              <Route path="/stats">
              <CardList dataHandler={this.riotData} data={this.state.data} champions={this.state.champions}/>
              {/* <div style={{backgroundColor: "black"}}>Hello</div> */}
              </Route>
              <Route path="/div">
                <div style={{backgroundColor:"orange"}}>Div</div>
              </Route>
              </Switch>
              {/* <Route path="/hello"/>
              Hello
            <Route /> */}
        </div>
      </div>
    );
  }
}

export default App
