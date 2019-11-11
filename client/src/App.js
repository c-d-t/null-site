import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch 
} from 'react-router-dom'

import './App.css';

// components
import Header from './components/header/Header'
import Home from './components/home/Home'
import RandomChat from './components/random/RandomChat'
import GroupChat from './components/group/GroupChat'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/random">
            <RandomChat />
          </Route>
          <Route path="/group">
            <GroupChat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
