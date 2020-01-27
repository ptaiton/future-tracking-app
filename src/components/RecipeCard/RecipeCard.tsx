import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import { red } from '@material-ui/core/colors'
import ViewRecipeIcon from '@material-ui/icons/Visibility'
import RecipeDetails from '../RecipeDetails/RecipeDetails'
import { Recipe } from '../../types/Recipe'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
      maxHeight: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
)

export default ({ recipe }: Props) => {
  const [ modalOpened, setModalOpened ] = useState(false)
  const classes = useStyles()

  return (<>
    <Card className={classes.card}>
      <CardHeader title={recipe.name} />
      <CardMedia
        className={classes.media}
        image="data:image/pngbase64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        title={recipe.name} />
      <CardActions disableSpacing>
        <IconButton onClick={() => setModalOpened(true)}>
          <ViewRecipeIcon />
        </IconButton>
      </CardActions>
    </Card>
    <RecipeDetails 
      recipe={recipe} 
      handleClose={() => setModalOpened(false)} 
      open={modalOpened} />
  </>)
}

interface Props {
  recipe: Recipe
}