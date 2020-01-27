import React, { MouseEventHandler, ChangeEventHandler, useState } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import { capitalize } from '../../utils/stringUtils'
import { convertIngredientsQuantity } from '../../utils/ingredientQuantityConverter'
import { Recipe, Unit } from '../../types/Recipe'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    dialogContent: {
      padding: theme.spacing(2),
    },
    dialogActions: {
      margin: 0,
      padding: theme.spacing(1),
    },
  })
)

export default ({ open, recipe, handleClose }: Props) => {
  const [ numberOfPersons, setNumberOfPersons ] = useState(recipe.numberOfPersons)
  const classes = useStyles()

  const handleNumberOfPersonsChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const value = parseInt(event.target.value)
    setNumberOfPersons(value < 1 ? numberOfPersons : value)
  }

  return (
    <Dialog open={open} onBackdropClick={handleClose}>
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{recipe.name}</Typography>
          <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <Typography gutterBottom>
          <TextField
            label="Number of persons"
            value={numberOfPersons}
            onChange={handleNumberOfPersonsChange}
            type="number"
            variant="outlined"
            fullWidth />
        </Typography>
        <hr />
        {convertIngredientsQuantity(numberOfPersons, recipe).map(ingredient => (
          <Typography gutterBottom key={ingredient.id}>
            {capitalize(ingredient.name)}: {ingredient.quantity}{ingredient.unit === Unit.UNIT ? '' : ingredient.unit}
          </Typography>
        ))}
        <hr />
        {Object.values(recipe.steps).map(step => (
          <Typography gutterBottom key={step.id}>
            {step.stepNumber}) {step.description}
          </Typography>
        ))}
      </DialogContent>
    </Dialog>
  )
}

interface Props {
  open: boolean
  recipe: Recipe
  handleClose: MouseEventHandler<HTMLButtonElement>
}