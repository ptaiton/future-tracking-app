import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import GeneratePdfIcon from '@material-ui/icons/PictureAsPdf'
import AddRecipeIcon from '@material-ui/icons/AddToPhotos'
import ViewRecipesIcon from '@material-ui/icons/MenuBook'
import ListItemLink from '../../components/ListItemLink/ListItemLink'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
  }),
);

export default ({ children }: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Future Tracking
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItemLink primary="View recipes" to="/" icon={<ViewRecipesIcon />} />
          <ListItemLink primary="Add recipe" to="/add-recipe" icon={<AddRecipeIcon />} />
          <ListItemLink primary="Generate a Cookbook" to="/generate-cookbook" icon={<GeneratePdfIcon />} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

interface Props {
  children: React.ReactElement | React.ReactElement[]
}