import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import List from 'material-ui/List'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import BuildIcon from 'material-ui-icons/Build'
import Hidden from 'material-ui/Hidden'
import Collapse from 'material-ui/transitions/Collapse'
import MenuIcon from 'material-ui-icons/Menu'
import GroupWorkIcon from 'material-ui-icons/GroupWork';
import PersonIcon from 'material-ui-icons/Person'
import LockIcon from 'material-ui-icons/Lock'
import PersonasContainer from '../cells/holo-vault/containers/personasContainer'
import PersonaContainer from '../cells/holo-vault/containers/personaContainer'
import ProfileContainer from '../cells/holo-vault/containers/profileContainer'
import ProfilesContainer from '../cells/holo-vault/containers/profilesContainer'
import CellsContainer from '../cells/holo-vault/containers/cellsContainer'
import FeaturesContainer from '../cells/holo-vault/containers/featuresContainer'
import SetupContainer from '../cells/holo-chat/containers/setupContainer'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
const drawerWidth = 180

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    colorPrimary: 'primary',
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  }
});

class Navigation extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleClickListItem = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  state = { open: false };

    handleClick = () => {
      this.setState({ open: !this.state.open });
    }
  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <List>
          <Route render={({ history}) => (
            <div>
              <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText inset primary="Vault" />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem name="features" button onClick={() => { history.push('/holo-vault/features') }}>
                    <ListItemIcon>
                      <BuildIcon />
                    </ListItemIcon>
                    <ListItemText primary='Features' />
                  </ListItem>
                  <ListItem name="cells" button onClick={() => { history.push('/holo-vault/cells') }}>
                    <ListItemIcon>
                      <GroupWorkIcon />
                    </ListItemIcon>
                    <ListItemText primary='Cells' />
                  </ListItem>
                  <ListItem id="personas" button onClick={() => { history.push('/holo-vault/personas') }}>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary='Personas' />
                  </ListItem>
                  <ListItem name="profiles" button onClick={() => { history.push('/holo-vault/profiles') }}>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary='Profiles' />
                  </ListItem>
                </List>
              </Collapse>

            </div>
          )} />
      </List>
    </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color='inherit' aria-label='open drawer' onClick={this.handleDrawerToggle} className={classes.navIconHide}>
              <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit' noWrap>
              {this.props.location.pathname.replace(/\//g, ' ').replace('holo-vault', 'Vault')}
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer variant='temporary' anchor={theme.direction === 'rtl' ? 'right' : 'left'} open={this.state.mobileOpen} onClose={this.handleDrawerToggle} classes={{paper: classes.drawerPaper}} ModalProps={{ keepMounted: true }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer variant='permanent' open classes={{paper: classes.drawerPaper}}>
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path='/holo-vault/personas' title='Personas' component={PersonasContainer} />
          <Route path='/holo-vault/persona/:name' component={PersonaContainer} />
          <Route path='/holo-vault/profiles' component={ProfilesContainer} />
          <Route path='/holo-vault/profile/:name' component={ProfileContainer} />
          <Route path='/holo-vault/cells' component={CellsContainer} />
          <Route path='/holo-vault/cell/:name' component={SetupContainer} />
          <Route path='/holo-vault/features' component={FeaturesContainer} />
        </main>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Navigation);
