import './App.css';
import React , {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 12;
  const country = localStorage.getItem("country")||(!localStorage.getItem("country")?localStorage.setItem("country","🇺🇸"):false);
  
  const [progress , setProgress] = useState(0)

  return (
    <>
      <Router basename="/FlashFeed">
        <LoadingBar
          color='#fff'
          progress={progress}
        />
        <NavBar />
        <Switch>
          <Route exact path="/"><News key={'general'} setProgress={setProgress} pageSize={pageSize} country={country} category={'general'} /></Route>
          <Route exact path="/business"><News key={'business'} setProgress={setProgress} pageSize={pageSize} country={country} category={'business'} /></Route>
          <Route exact path="/entertainment"><News key={'entertainment'} setProgress={setProgress} pageSize={pageSize} country={country} category={'entertainment'} /></Route>
          <Route exact path="/health"><News key={'health'} setProgress={setProgress} pageSize={pageSize} country={country} category={'health'} /></Route>
          <Route exact path="/science"><News key={'science'} setProgress={setProgress} pageSize={pageSize} country={country} category={'science'} /></Route>
          <Route exact path="/sports"><News key={'sports'} setProgress={setProgress} pageSize={pageSize} country={country} category={'sports'} /></Route>
          <Route exact path="/technology"><News key={'technology'} setProgress={setProgress} pageSize={pageSize} country={country} category={'technology'} /></Route>
          <Route exact path="*"><News key={'general'} setProgress={setProgress} pageSize={pageSize} country={country} category={'general'} /></Route>
        </Switch>
      </Router>
    </>
  )
}

export default App;