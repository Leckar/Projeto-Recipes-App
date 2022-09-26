import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Recipes from './Pages/Recipes';
import Header from './components/Header';

function App() {
  return (
    <div className={ styles.container }>
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id" />
        <Route exact path="/drinks/:id" />
        <Route exact path="/meals/:id" />
        <Route exact path="/drinks/:id" />
        <Route exact path="/profile" />
        <Route exact path="/done-recipes" />
        <Route exact path="/favorite-recipes" />
      </Switch>
    </div>
  );
}

export default App;
