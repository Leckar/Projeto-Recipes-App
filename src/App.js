import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Recipes from './Pages/Recipes';
import Header from './components/Header';
import Footer from './components/Footer';
import RecipeDetails from './Pages/RecipeDetails';
import FavoriteRecipes from './Pages/FavoriteRecipes';

function App() {
  return (
    <div className={ styles.container }>
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
