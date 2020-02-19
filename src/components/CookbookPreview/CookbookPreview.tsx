import React, { useState } from 'react'
import { Container, Draggable, OnDropCallback } from "react-smooth-dnd"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import DragHandleIcon from "@material-ui/icons/DragHandle"
import { post } from '../../services/api'
import { Recipe } from '../../types/Recipe'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    fieldset: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 10,

      '&  legend': {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '1rem',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        lineHeight: 1,
        letterSpacing: '0.00938em'
      }
    },
    generateButton: {
      textAlign: 'center'
    }
  })
)


export default ({ recipes, handleRecipeUpdate }: Props) => {
  const [ title, setTitle ] = useState('My cookbook')
  const classes = useStyles()

  const handleCookbookTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(event.target.value)
  }

  const handleGenerateCookbookButtonClick = () => {
    post('cookbook', {
      title,
      recipes: recipes.map(recipe => recipe.id)
    })
  }

  const onDrop: OnDropCallback = ({ removedIndex, addedIndex }) => {
    if(removedIndex !== null && addedIndex !== null) {
      const newRecipes = [...recipes.slice(0, removedIndex), ...recipes.slice(removedIndex + 1, recipes.length)]
      newRecipes.splice(addedIndex, 0, recipes[removedIndex])
      handleRecipeUpdate(newRecipes.map(recipe => recipe.id))
    }
  }

  return (
    <div>
      <Typography variant="h6">Personnalyze my cookbook</Typography>
      <hr />
      <TextField 
        variant="outlined" 
        label="Cookbook title"
        onChange={handleCookbookTitleChange}
        value={title}
        fullWidth />
      <fieldset className={classes.fieldset}>
        <legend>Reorder selected recipes</legend>
        <List>
          <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
            {recipes.length > 0 ? recipes.map(recipe => (
              <Draggable key={recipe.id}>
                <ListItem>
                  <ListItemText primary={recipe.name} />
                  <ListItemSecondaryAction>
                    <ListItemIcon className="drag-handle">
                      <DragHandleIcon />
                    </ListItemIcon>
                  </ListItemSecondaryAction>
                </ListItem>
              </Draggable>
            )) : ('Please select some recipes')}
        </Container>
      </List>
      </fieldset>
      <div className={classes.generateButton}>
        <Button onClick={handleGenerateCookbookButtonClick} disabled={!recipes.length || !title}>
          Generate my cookbook
        </Button>
      </div>
    </div>
  )
}

interface Props {
  recipes: Recipe[]
  handleRecipeUpdate: Function
}