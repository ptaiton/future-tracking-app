import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import RecipeItem from '../RecipeItem/RecipeItem'
import { Recipe } from '../../types/Recipe'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default ({ recipes, selectedRecipes, handleRecipeSelection }: Props) => {
  const classes = useStyles()

  const handleRecipeToggle = (recipeId: string) => () => {
    const isAlreadySelected = Boolean(selectedRecipes.find(selectedRecipeId => selectedRecipeId === recipeId))

    if(isAlreadySelected) {
      const newSelection = selectedRecipes.filter(selectedRecipeId => selectedRecipeId !== recipeId)
      handleRecipeSelection(newSelection)
    } else {
      handleRecipeSelection([...selectedRecipes, recipeId])
    }
  }

  const isRecipeSelected = (recipeId: string) => {
    return Boolean(selectedRecipes.find(selectedRecipeId => selectedRecipeId === recipeId))
  }

  return (
    <div>
      <Typography variant="h6">All recipies</Typography>
      <List className={classes.root}>
        <Button variant="text">Check all</Button>
        {recipes.map(recipe => (
          <RecipeItem
          key={recipe.id}
          id={recipe.id} 
          name={recipe.name}
          isSelected={isRecipeSelected(recipe.id)}
          handleToggle={handleRecipeToggle} />
          ))}
      </List>
    </div>
  )
}

interface Props {
  recipes: Recipe[]
  selectedRecipes: string[]
  handleRecipeSelection: Function
}