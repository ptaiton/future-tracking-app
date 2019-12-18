import React, { useState, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import RecipeList from '../../components/RecipeList/RecipeList'
import CookbookPreview from '../../components/CookbookPreview/CookbookPreview'
import { notEmpty } from '../../utils/filter'
import { Recipe } from '../../types/Recipe'
import mock from './mock'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    paper: {
      padding: 30
    }
  })
)

export default () => {
  const [ recipes, setRecipes ] = useState<Recipe[]>([])
  const [ selectedRecipes, setSelectedRecipes ] = useState<string[]>([])
  const [ isLoading, setIsLoading ] = useState(true)
  const classes = useStyles()

  useEffect(() => {
    setTimeout(() => { setRecipes(mock); setIsLoading(false) }, 300)
  }, [])

  const handleRecipeSelection = (recipesId: string[]) => {
    setSelectedRecipes(recipesId)
  }

  const getSelectedRecipesInfos = () => {
    const findSelectedRecipeInfo = (recipeId: string) => recipes.find(recipe => recipe.id === recipeId) || null
    return selectedRecipes
      .map(findSelectedRecipeInfo)
      .filter(notEmpty)
  }

  return (
    <Paper className={classes.paper}>
      <Grid container item direction="row">
        <Grid item xs={6}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <RecipeList
              recipes={recipes}
              selectedRecipes={selectedRecipes}
              handleRecipeSelection={handleRecipeSelection} />
          )}
        </Grid>
        <Grid item xs={6}>
          <CookbookPreview 
            recipes={getSelectedRecipesInfos()}
            handleRecipeUpdate={handleRecipeSelection} />
        </Grid>
      </Grid>
    </Paper>
  )
}