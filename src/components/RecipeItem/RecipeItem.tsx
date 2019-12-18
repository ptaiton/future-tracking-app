import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'

export default ({ id, name, isSelected, handleToggle }: Props) => {
  return (
    <ListItem dense button onClick={handleToggle(id)}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={isSelected}
          tabIndex={-1}
          inputProps={{ 'aria-labelledby': id }}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText id={id} primary={name} />
    </ListItem>
  )
}

interface Props {
  id: string
  name: string
  isSelected: boolean
  handleToggle: (id: string) => React.MouseEventHandler<HTMLDivElement>
}