
import { connect } from 'react-redux'
import Channels, { OwnProps, StateProps, DispatchProps } from '../components/channels/channels'
import { Dispatch } from 'redux'
// import * as constants from '../constants'

import {
  Init,
	GetMyChannels,
	GetSubjects,
	CreateChannel,
  GetAllMembers,
  SetChannelAddress,
  SetSubjectAddress
} from '../actions'

import { ChannelSpec } from '../types/model/channel'

const mapStateToProps = (state: any): StateProps => {
  return {
    channels: state.holoChat.myChannels,
    subjects: state.holoChat.subjects
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    init: () => dispatch(Init.create({})),
    getAllMembers: () => dispatch(GetAllMembers.create({})),
  	getMyChannels: () => dispatch(GetMyChannels.create({})),
    getSubjects: (channelAddress: string) => dispatch(GetSubjects.create({ channel_address: channelAddress })),
  	newChannel: (channelSpec: ChannelSpec) => dispatch(CreateChannel.create(channelSpec)),
    setChannelAddress: (channelAddress: String) => dispatch(SetChannelAddress(channelAddress)),
    setSubjectAddress: (subjectAddress: String) => dispatch(SetSubjectAddress(subjectAddress))
  }
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
