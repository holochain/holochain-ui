
import { connect } from 'react-redux'
import Channels, { OwnProps, StateProps, DispatchProps } from '../components/channels/channels'
import { Dispatch } from 'redux'

import {
	GetMyChannels,
	CreateChannel,
  SetActiveChannel
} from '../actions'

// import {
//   personasList
// } from '../../holo-vault/actions'

import { Channel, ChannelSpec } from '../types/model/channel'

const mapStateToProps = (state: any): StateProps => {
  return {
    channels: state.holoChat.myChannels
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
  	getMyChannels: () => dispatch(GetMyChannels.create(undefined)), // can be written as  () => { return dispatch(...) }
  	newChannel: (channelSpec: ChannelSpec) => dispatch(CreateChannel.create(channelSpec)),
    setActiveChannel: (channel: Channel) => dispatch(SetActiveChannel(channel))
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
