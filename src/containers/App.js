import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CardList from "../components/CardList";
import Card from "../components/Card";
import SearchBox from "../components/SearchBox";
import { Route, Switch } from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        stats: [],
        profileIconId: 0,
      },
    };
  }
  riotData = (data) => {
    return this.setState({ data: data });
  };
  render() {
    return (
      <div>
        <header>
          <SearchBox data={this.riotData} history={this.props.history} />
        </header>
        <Switch>
            <Route path="/stats">
            <CardList data={this.state.data}/>
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
    );
  }
}

export default App
