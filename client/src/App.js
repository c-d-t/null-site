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
import RandomChatEntrance from './components/random/entrance/RandomChatEntrance'
import RandomChat from './components/random/chat/RandomChat'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/random">
            <RandomChatEntrance />
          </Route>
          <Route exact path="/random/chat">
            <RandomChat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
