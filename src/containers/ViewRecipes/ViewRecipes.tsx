import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import { getRecipes } from '../../services/api'
import { Recipe } from '../../types/Recipe'

export default () => {
  const [ recipes, setRecipes ] = useState<Recipe[]>([])
  const [ isLoading, setIsLoading ] = useState(true)


  useEffect(() => {
    getRecipes().then(recipes => {
      setRecipes(recipes)
      setIsLoading(false)
    })
  }, [])

  return (
    <Grid container justify="space-around">
      {recipes && recipes.map(recipe => (
        <Grid key={recipe.id} item>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  )
}