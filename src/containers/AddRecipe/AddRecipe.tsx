import React, { useState, ChangeEventHandler, ChangeEvent } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { v4 as generateUuid } from 'uuid'
import { Unit, Recipe } from '../../types/Recipe'

type IngredientChangeHandler = ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | { name?: string | undefined; value: unknown; }>

export default () => {
  const [ recipe, setRecipe ] = useState<Recipe>({
    id: generateUuid(),
    name: '',
    image: '',
    numberOfPersons: 0,
    ingredients: {},
    steps: {}
  })

  const handleIngredientChange = (id: string, fieldChange: string): IngredientChangeHandler => (event) => {
    setRecipe({ ...recipe, 
      ingredients: { ...recipe.ingredients,
        [id]: { ...recipe.ingredients[id],
          [fieldChange]: event.target.value
        }
      }
    })
  }

  return (
    <Paper>
      <Typography align="center">Add a recipe</Typography>
      <hr />
      <Grid container direction="column">
        <Grid item>
          <TextField label="Recipe title" />
        </Grid>
        <Grid item>
          <TextField label="Number of persons" />
        </Grid>
      </Grid>
      <hr />
      <Grid container direction="column">
        {Object.values(recipe.ingredients).map(ingredient => (
          <Grid item>
            <TextField label="Ingredient name" onChange={handleIngredientChange(ingredient.id, 'name')} />
            <TextField label="Quantity" onChange={handleIngredientChange(ingredient.id, 'quantity')} />
            <Select
              value={ingredient.unit}
              onChange={handleIngredientChange(ingredient.id, 'unit')}>
              {Object.values(Unit).map((unit, index) => (
                <MenuItem key={index} value={unit}>{unit}</MenuItem>
              ))}
            </Select>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}
