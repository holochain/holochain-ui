
import { connect } from 'react-redux'
import Channels, { OwnProps, StateProps, DispatchProps } from '../components/channels/channels'
import { Dispatch } from 'redux'
import * as constants from '../constants'

import {
	GetMyChannels,
	CreateCustomChannel,
  SetActiveChannel,
  SetIdentity,
	GetSubjects
} from '../actions'

import { Channel, ChannelSpec } from '../types/model/channel'
import { IdentitySpec } from '../types/model/identity'

const mapStateToProps = (state: any): StateProps => {
  return {
    channels: constants.publicChannels, // state.holoChat.myChannels
    subjects: constants.subjects
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
  	getMyChannels: () => dispatch(GetMyChannels.create(undefined)), // can be written as  () => { return dispatch(...) }
  	newChannel: (channelSpec: ChannelSpec) => dispatch(CreateCustomChannel.create(channelSpec)),
    setActiveChannel: (channel: Channel) => dispatch(SetActiveChannel(channel)),
    setIdentity: (identity: IdentitySpec) => dispatch(SetIdentity.create(identity)),
    getSubjects: (channelAddress: string) => dispatch(GetSubjects.create({ channelAddress: channelAddress }))
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
