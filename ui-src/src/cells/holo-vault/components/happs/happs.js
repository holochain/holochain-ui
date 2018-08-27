import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../../../withRoot';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import listfeatures from './listFeatures.md'
// import Markdown from 'react-markdown'
const styles = theme => ({
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
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  }
});

class Happs extends React.Component {
  render() {
    const { classes, happs } = this.props;
    return (
      <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <List id="hApps" component="nav">
            {
              happs.installedHapps.map((group, index) => (
                <ListItem id={group.name} divider={true}>
                  <List>
                    <ListItem >
                      <Typography variant="title" align="left" color="textSecondary" paragraph>
                        {group.name}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={40}>
                        {group.hApps.map(app => (
                          <Grid item key={app.name} sm={6} md={4} lg={3}>
                            <Card>
                              <CardMedia
                                className={classes.cardMedia}
                                image={app.image}
                                title={app.name}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
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
        </div>
      </main>
      <footer className={classes.footer}>
        <Typography variant="title" align="center" gutterBottom>
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

Happs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Happs));
