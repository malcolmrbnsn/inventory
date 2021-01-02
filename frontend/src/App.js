import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route path='/login'>
          <LoginForm />
        </Route>

      </Router>

    </div>
  );
}

export default App;
