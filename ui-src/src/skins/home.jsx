import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Route } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import MenuIcon from '@material-ui/icons/Menu'
import PersonasContainer from '../hApps/holo-vault/containers/personasContainer'
import PersonaContainer from '../hApps/holo-vault/containers/personaContainer'
import ProfileContainer from '../hApps/holo-vault/containers/profileContainer'
import ProfilesContainer from '../hApps/holo-vault/containers/profilesContainer'
import MessagesContainer from '../hApps/holo-chat/containers/messagesContainer'
import HappsContainer from '../hApps/holo-vault/containers/happsContainer'
import StreamsContainer from '../hApps/holo-chat/containers/streamsContainer'
import ArcsOfPresenceContainer from '../hApps/holo-chat/containers/arcsOfPresenceContainer'
import Desktop from './desktop'
// import Mobile from './mobile'
import MainNav from './navData';
import HoloVaultNav from './holoVaultNavData'
import StorybookSkin from './storybook'
import DesktopChat from '../hApps/holo-chat/components/desktopChat'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  appBar: {
    backgroundColor: '#3A277A',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    backgroundColor: '#3A277A',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    display: 'flex',
    height: '100%',
    width: '100%',
    padding: 0,
    marginTop: 58
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Holochain
            </Typography>
          </Toolbar>
        </AppBar>
        <MediaQuery minDeviceWidth={1025}>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              <Route path='/' render={props =>
                <MainNav handleDrawerClose={this.handleDrawerClose} />
              } />
            </List>
            <Divider />
            <List>
              <Route path='/holo-vault' render={props =>
                <HoloVaultNav handleDrawerClose={this.handleDrawerClose} />
              } />
            </List>
          </Drawer>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={767}>
          <Drawer
            variant="temporary"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
              <List>
                <Route path='/' render={props =>
                  <MainNav handleDrawerClose={this.handleDrawerClose} />
                } />
              </List>
            <Divider />
            <List>
              <Route path='/holo-vault' render={props =>
                <HoloVaultNav handleDrawerClose={this.handleDrawerClose} />
              } />
              <Route path='/holo-chat' render={props =>
                <div>
                  <StreamsContainer {...props} title={'Public Channels'} isPublic={true} isMobile={true} />
                  <StreamsContainer {...props} title={'Direct Messages'} isPublic={false} isMobile={true} />
                </div>
              } />
            </List>
          </Drawer>
        </MediaQuery>
        <main className={classes.content}>
          <Route path='/storybook' title='Storybook' component={StorybookSkin} />
          <Route path='/holo-vault/personas' title='Personas' component={PersonasContainer} />
          <Route path='/holo-vault/persona/:name' component={PersonaContainer} />
          <Route path='/holo-vault/profiles' component={ProfilesContainer} />
          <Route path='/holo-vault/profile/:hash' render={ props =>
            <ProfileContainer {...props} onSubmit={() => this.props.history.push('/holo-vault/profiles')} />
          } />
          <Route path='/holo-vault/happs' component={HappsContainer} />
          <MediaQuery minDeviceWidth={1025}>
            <Route exact path='/home' title='Holochain' render={props =>
              <div>
                <Desktop {...props} />
              </div>
            } />
            <Route exact path='/' title='Holochain' render={props =>
              <div>
                <Desktop {...props} />
              </div>
            } />
            <Route path={['/holo-chat/stream/:stream/subject/:subject', '/holo-chat/stream/:stream', '/holo-chat' ]} title='Holochain' render={props =>
              <DesktopChat {...props} />
            } />
          </MediaQuery>
          <MediaQuery minDeviceWidth={768} maxDeviceWidth={1024}>
            <Desktop />
          </MediaQuery>
          <MediaQuery maxDeviceWidth={767}>
            <Route exact path='/home' title='Holochain' component={Desktop} />
            <Route exact path='/' title='Holochain' component={Desktop} />
            <Route path={['/holo-chat/stream/:stream/subject/:subject', '/holo-chat/stream/:stream', '/holo-chat' ]} title='Holochain' render={props =>
                <MessagesContainer {...props} isMobile={true} />
            } />
          </MediaQuery>

        </main>
      </div>
    );
  }
}

//={props => <ProfileContainer onSubmit={() => this.props.history.push('/holo-vault/personas')}/>}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
