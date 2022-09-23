import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Recipes from './Pages/Recipes';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" />
        <Route exact path="/meals/:id" />
        <Route exact path="/drinks/:id" />
        <Route exact path="/meals/:id" />
        <Route exact path="/drinks/:id" />
        <Route exact path="/profile" />
        <Route exact path="/done-recipes" />
        <Route exact path="/favorite-recipes" />
      </Switch>
    </>
  );
}

export default App;
