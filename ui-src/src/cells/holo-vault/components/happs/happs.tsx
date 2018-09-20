import * as React from 'react';
import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core/styles';
import withRoot from '../../../../withRoot';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { List, ListItem } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MediaQuery from 'react-responsive'

// import listfeatures from './listFeatures.md'
// import Markdown from 'react-markdown'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    textAlign: 'left',
    paddingTop: 0,
  },
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: 0
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  }
});

interface HappsProps {
  classes: any,
  happs: {
    installedHapps: Array<any>
  }
}

interface App {
  name: string,
  image: any,
  description: string,
  buttonText: string,
  url: string
}

class Happs extends React.Component<HappsProps, {}> {
  render() {
    const { classes, happs } = this.props;
    return (
      <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <MediaQuery minDeviceWidth={1025}>
            <List id="hApps" component="nav">
              {
                happs.installedHapps.map((group, index) => (
                  <ListItem id={group.name} divider={true}>
                    <List>
                      <ListItem >
                        <Typography variant="title" align="left" color="textSecondary" paragraph={true}>
                          {group.name}
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Grid container={true} spacing={40}>
                          {group.hApps.map((app: App) => (
                            <Grid item={true} key={app.name} sm={6} md={4} lg={3}>
                              <Card>
                                <CardMedia
                                  className={classes.cardMedia}
                                  image={app.image}
                                  title={app.name}
                                />
                                <CardContent>
                                  <Typography gutterBottom={true} variant="headline" component="h2">
                                    {app.name}
                                  </Typography>
                                  <Typography>
                                    {app.description}
                                  </Typography>
                                </CardContent>
                                <CardActions>
                                  <Button href={app.url} size="small" color="primary">
                                    {app.buttonText}
                                  </Button>
                                </CardActions>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </ListItem>
                    </List>
                  </ListItem>))
              }
            </List>
          </MediaQuery>
          <MediaQuery  maxDeviceWidth={767}>
            <List id="hApps" component="nav">
              {
                happs.installedHapps.map((group, index) => (
                  <ListItem id={group.name} divider={true}>
                    <List>
                      <ListItem >
                        <Typography variant="title" align="center" color="textSecondary" paragraph={true}>
                          {group.name}
                        </Typography>
                      </ListItem>
                      <ListItem>
                        {group.hApps.map((app: App) => (
                          <Grid item={true} key={app.name}>
                            <Button href={app.url} size="small" color="primary">
                              <img src={app.image} alt={app.name} width="100%" />
                            </Button>
                          </Grid>
                        ))}
                      </ListItem>
                    </List>
                  </ListItem>))
              }
            </List>
          </MediaQuery>
        </div>
      </main>
      <footer className={classes.footer}>
        <Typography variant="title" align="center" gutterBottom={true}>
          Holo
        </Typography>
        <Typography variant="subheading" align="center" color="textSecondary" component="p">
          Where the Crowd is the Cloud
        </Typography>
      </footer>
    </React.Fragment>
    );
  }
}

export default withRoot(withStyles(styles)(Happs));
