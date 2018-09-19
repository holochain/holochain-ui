
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
  personasList
} from '../../holo-vault/actions'

import {Channel, ChannelSpec} from '../types/model/channel'



const mapStateToProps = (state: any) => {
  return {
    channels: state.holoChat.myChannels,
    personas: state.holoVault.profile.personas
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  	getMyChannels: () => { dispatch(getMyChannels()) },
  	newChannel: (channelSpec: ChannelSpec) => { dispatch(createCustomChannel(channelSpec)) },
    setActiveChannel: (channel: Channel) => { dispatch(SetActiveChannel(channel))},
    getUsers: () => { dispatch(getUsers() ) },
    personasList: (then?: Function) => { dispatch(personasList(then)) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
