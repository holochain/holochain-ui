import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
  Grid,
  Paper,
  Dialog
} from '@material-ui/core'

import StreamsContainer from '../containers/streamsContainer'
import MessagesContainer from '../containers/messagesContainer'
import ProfileContainer from '../../holo-vault/containers/profileContainer'

import {
  Init
} from '../actions'

interface OwnProps {
  classes?: any
}

interface State {

}

interface StateProps {

}

interface DispatchProps {
  init: typeof Init.sig
}

type Props = OwnProps & StateProps & DispatchProps

class Chat extends React.Component<any, State> {

  constructor (props: any) {
    super(props)
    this.props.init({})
    .then((result: null) => {
      console.log(result)
    })
    .catch((err: Error) => {
      console.log(err)
    })
  }

  render (): JSX.Element {
    const { classes } = this.props
    return (
      <div>
        <Dialog
            fullScreen={true}
            open={true}
        >
          <ProfileContainer />
        </Dialog>

        <Grid container={true} spacing={0} className={classes.chat}>
          <Grid item={true} xs={3} className={classes.channels}>
            <StreamsContainer {...this.props} title={'Public Channels'} isPublic={true} />
            <StreamsContainer {...this.props} title={'Direct Messages'} isPublic={false} />
          </Grid>
          <Grid item={true} xs={7} className={classes.messages}>
            <MessagesContainer {...this.props} />
          </Grid>
          <Grid item={true} xs={2}>
            <Paper/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: Props): StateProps => {
  return {
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    init: () => dispatch(Init.create({}))
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
