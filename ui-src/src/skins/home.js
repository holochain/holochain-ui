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
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Route } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import MenuIcon from '@material-ui/icons/Menu'
import PersonasContainer from '../cells/holo-vault/containers/personasContainer'
import PersonaContainer from '../cells/holo-vault/containers/personaContainer'
import ProfileContainer from '../cells/holo-vault/containers/profileContainer'
import ProfilesContainer from '../cells/holo-vault/containers/profilesContainer'
import MessagesContainer from '../cells/holo-chat/containers/messagesContainer'
import HappsContainer from '../cells/holo-vault/containers/happsContainer'
import ChannelsContainer from '../cells/holo-chat/containers/channelsContainer'
import ErrandContainer from '../cells/errand/containers/errandContainer'
import ArcsOfPresenceContainer from '../cells/holo-chat/containers/arcsOfPresenceContainer'
import Desktop from './desktop'
import Mobile from './mobile'
import { MainNav } from './navData';
import HoloVaultNav from './holoVaultNavData';
import StorybookSkin from './storybook'
import HoloChatNav from './holoChatNavData'
import ErrandNav from './errandNavData'
import HackTogetherSkin from './hackTogether'
import HoloChessSkin from './holochess'
import MinersweeperSkin from './minersweeper'
import FractalWikiSkin from './fractal-wiki'
// import Hidden from '@material-ui/core/Hidden';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
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
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: theme.spacing.unit * 2,
    marginTop: 50
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
            <List><MainNav handleDrawerClose={this.handleDrawerClose}/></List>
            <Divider />
            <List>
              <Route path='/holo-vault' render={props =>
                <HoloVaultNav handleDrawerClose={this.handleDrawerClose} />
              } />
              <Route path='/holo-chat' render={props =>
                <HoloChatNav handleDrawerClose={this.handleDrawerClose} />
              } />
              <Route path='/errand' render={props =>
                <ErrandNav handleDrawerClose={this.handleDrawerClose} />
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
            <List><MainNav handleDrawerClose={this.handleDrawerClose}/></List>
            <Divider />
            <List>
              <Route path='/holo-vault' render={props =>
                <HoloVaultNav handleDrawerClose={this.handleDrawerClose} />
              } />
              <Route path='/holo-chat' render={props =>
                <HoloChatNav handleDrawerClose={this.handleDrawerClose} />
              } />
              <Route path='/errand' render={props =>
                <ErrandNav handleDrawerClose={this.handleDrawerClose} />
              } />
            </List>
          </Drawer>
        </MediaQuery>
        <main className={classes.content}>
          <Route path='/storybook' title='Storybook' component={StorybookSkin} />
          <Route path='/hacktogether' title='Hack Together' component={HackTogetherSkin} />
          <Route path='/holo-chess' title='Holo Chess' component={HoloChessSkin} />
          <Route path='/errand' title='Errand' component={ErrandContainer} />
          <Route path='/minersweeper' title='Miner Sweeper' component={MinersweeperSkin} />
          <Route path='/fractal-wiki' title='Fractal Wiki' component={FractalWikiSkin} />
          <Route path='/holo-vault/personas' title='Personas' component={PersonasContainer} />
          <Route path='/holo-vault/persona/:name' component={PersonaContainer} />
          <Route path='/holo-vault/profiles' component={ProfilesContainer} />
          <Route path='/holo-vault/profile/:hash' component={ProfileContainer} />
          <Route path='/holo-vault/happs' component={HappsContainer} />
          <Route path='/holo-chat/channels' component={ChannelsContainer} />
          <MediaQuery minDeviceWidth={1025}>
            <Route exact path='/home' title='Holochain' render={props =>
              <div>
                <Desktop />
              </div>
            } />
            <Route exact path='/' title='Holochain' render={props =>
              <div>
                <Desktop />
              </div>
            } />
            <Route path='/holo-chat' title='Holochain' render={props =>
              <div>
                <ChannelsContainer />
                <MessagesContainer />
              </div>
            } />
          </MediaQuery>
          <MediaQuery minDeviceWidth={768} maxDeviceWidth={1024}>
            <Desktop />
          </MediaQuery>
          <MediaQuery maxDeviceWidth={767}>
            <Route exact path='/home' title='Holochain' component={Desktop} />
            <Route exact path='/' title='Holochain' component={Desktop} />
            <Route path='/holo-chat' title='Holochain' render={props =>
              <div>
                <ArcsOfPresenceContainer />
                <MessagesContainer />
              </div>
            } />
          </MediaQuery>

        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
