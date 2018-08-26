import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Iframe from 'react-iframe'
import withRoot from '../withRoot';

const styles = theme => ({
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
    }
  }
);

class HoloChessSkin extends React.Component {

  render() {
    return (
      <Iframe url="http://localhost:5555"
        width="100%"
        height="800"
        id="storybook"
        display="initial"
        position="relative"
        allowFullScreen/>
      );
    }
  }

HoloChessSkin.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles, { withTheme: true })(HoloChessSkin));
