
import { connect } from 'react-redux'
import Channels from '../components/channels/channels'
// import channelData from '../data/channels.json'
// import {HoloChatState} from '../reducer'
import {Dispatch} from 'redux'
import {
	getMyChannels,
	createCustomChannel,
  SetActiveChannel,
  getUsers
} from '../actions'

import {
  profilesList
} from '../../holo-vault/actions'

import {Channel, ChannelSpec} from '../types/model/channel'



// TODO: Add proper typing to the global state and figure out why holochat is two levels deep
const mapStateToProps = (state: any) => {
  return {
    channels: state.holoChat.myChannels,
    profiles: state.holoVault.profile.profiles
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  	getMyChannels: () => { dispatch(getMyChannels()) },
  	newChannel: (channelSpec: ChannelSpec) => { dispatch(createCustomChannel(channelSpec)) },
    setActiveChannel: (channel: Channel) => { dispatch(SetActiveChannel(channel))},
    getUsers: () => { dispatch(getUsers() ) },
    getProfiles: (then: Function) => { dispatch(profilesList(then)) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
