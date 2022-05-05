import React, { Component } from 'react';
import './App.css';
import HomeComponent from './components/HomeComponent';
import {Route, Routes, Navigate} from 'react-router-dom';
import PurchaseComponent from './components/PurchaseComponent';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path={'/'} element= { <Navigate to={'/home'}></Navigate>}></Route>
          <Route path={'/home'} element={<HomeComponent />}></Route>
          <Route path={'/purchase/:customerId'} element={<PurchaseComponent />}></Route>
        </Routes>
      </div>
    );
  }
}
export default App;
