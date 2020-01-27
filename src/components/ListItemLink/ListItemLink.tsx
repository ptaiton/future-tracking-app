import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

export default ({ icon, primary, to }: ListItemLinkProps) => {

  const renderLink = React.useMemo(
    () => React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'innerRef' | 'to'>>(
      (itemProps, ref) => (<RouterLink to={to} {...itemProps} innerRef={ref} />),
    ), 
  [to])

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

interface ListItemLinkProps {
  icon?: React.ReactElement
  primary: string
  to: string
}