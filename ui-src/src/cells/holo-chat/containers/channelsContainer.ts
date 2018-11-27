
import { connect } from 'react-redux'
import Channels, { OwnProps, StateProps, DispatchProps } from '../components/channels/channels'
import { Dispatch } from 'redux'
import * as constants from '../constants'

import {
	GetMyChannels,
	GetSubjects,
	CreateChannel
} from '../actions'

import { ChannelSpec } from '../types/model/channel'

const mapStateToProps = (state: any): StateProps => {
  return {
    channels: constants.channels, // state.holoChat.myChannels
    subjects: constants.subjects
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
  	getMyChannels: () => dispatch(GetMyChannels.create(undefined)), // can be written as  () => { return dispatch(...) }
    getSubjects: (channelAddress: string) => dispatch(GetSubjects.create({ channelAddress: channelAddress })),
  	newChannel: (channelSpec: ChannelSpec) => dispatch(CreateChannel.create(channelSpec))
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
