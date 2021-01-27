import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import SellerForm from './components/SellerForm'
import Boxes from './containers/Boxes'
import Sellers from './containers/Sellers'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/login'/>
          <Route path='/boxes' component={Boxes} />
          <Route path='/sellers/new' component={SellerForm}/>
          <Route path='/sellers' component={Sellers}/>
        </Switch>

      </Router>

    </div>
  );
}

export default App;
