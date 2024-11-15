import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 12;
  country = 'us';

  state = {
    progress : 0
  }

  setProgress = (progress)=>{
    this.setState({progress : progress})
  }
  render() {
    return (
      <>
        <Router>
          <LoadingBar
            color='#fff'
            progress={this.state.progress}
          />
          <NavBar />
          <Switch>
            <Route exact path="/"><News key={'general'} setProgress={this.setProgress} pageSize={this.pageSize} country={this.country} category={'general'} /></Route>
            <Route exact path="/business"><News key={'business'} setProgress={this.setProgress} pageSize={this.pageSize} country={this.country} category={'business'} /></Route>
            <Route exact path="/entertainment"><News key={'entertainment'} setProgress={this.setProgress} pageSize={this.pageSize} country={this.country} category={'entertainment'} /></Route>
            <Route exact path="/health"><News key={'health'} setProgress={this.setProgress} pageSize={this.pageSize} country={this.country} category={'health'} /></Route>
            <Route exact path="/science"><News key={'science'} setProgress={this.setProgress} pageSize={this.pageSize} country={this.country} category={'science'} /></Route>
            <Route exact path="/sports"><News key={'sports'} setProgress={this.setProgress} pageSize={this.pageSize} country={this.country} category={'sports'} /></Route>
            <Route exact path="/technology"><News key={'technology'} setProgress={this.setProgress} pageSize={this.pageSize} country={this.country} category={'technology'} /></Route>
            <Route exact path="*"><News key={'general'} setProgress={this.setProgress} pageSize={this.pageSize} country={this.country} category={'general'} /></Route>
          </Switch>
        </Router>
      </>
    )
  }
}
