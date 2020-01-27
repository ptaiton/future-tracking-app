import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MainContainer from './containers/MainContainer/MainContainer'
import GenerateCookbook from './containers/GenerateCookbook/GenerateCookbook'
import ViewRecipes from './containers/ViewRecipes/ViewRecipes'
import AddRecipe from './containers/AddRecipe/AddRecipe'

export default () => {
  return (
    <Router>
      <MainContainer>
        <Route exact path="/" component={ViewRecipes} />
        <Route exact path="/add-recipe" component={AddRecipe} />
        <Route exact path="/generate-cookbook" component={GenerateCookbook} />
      </MainContainer>
    </Router>
  )
}