import * as React from 'react'
import { withStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/Add'
import { Channel as ChannelType, ChannelSpec } from '../../types/model/channel'
// import {Persona} from '../../../holo-vault/types/profile'
import withRoot from '../../../../withRoot'
import { withRouter, Route, RouteComponentProps } from 'react-router-dom'
import NewChannel from '../../containers/newChannelContainer'
import { IdentitySpec } from '../../types/model/identity'

import {
  GetMyChannels,
  CreateCustomChannel,
  GetUsers
} from '../../actions'

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  addButton: {
    float: 'right'
  }
})

export interface OwnProps {
  classes?: any
}

export interface StateProps {
  channels: Array<ChannelType>
}

export interface DispatchProps {
  getMyChannels: typeof GetMyChannels.sig,
  newChannel: typeof CreateCustomChannel.sig,
  getUsers: typeof GetUsers.sig,
  setActiveChannel: (channel: ChannelType) => void,
  // personasList: (then?: Function) => void,
  setIdentity: (identity: IdentitySpec) => void
}

export interface RouterProps extends RouteComponentProps<{}> {}

export type Props = OwnProps & StateProps & DispatchProps

export interface State {
  modalOpen: boolean
}

class Channels extends React.Component<Props & RouterProps, State> {
  getChannelsInterval: any
  constructor (props: Props & RouterProps) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  componentDidMount () {
    // here is where we should check that there is a valid profile
    // this.props.personasList((result: any) => {
    //   console.log('personas received')
    //   console.log(result)
    //
    //   let chatPersona: Persona
    //   const chatProfileExists = result.some((elem: {Hash: string, persona: Persona}) => {
    //     console.log(elem)
    //     if(elem.persona.name === "HoloChat") {
    //       chatPersona = elem.persona
    //       return true
    //     } else {
    //       return false
    //     }
    //   })
    //
    //   if(chatProfileExists) {
    //     console.log("Chat profile found!")
    //     // use the profile to update the user data in chat. A bit of a hack but it
    //     // will work for now
    //
    //     // update the user info with the data from vault
    //     this.props.setIdentity({
    //       ...chatPersona.personaFields[0],
    //       ...chatPersona.personaFields[1]})
    //   } else {
    //     console.log("No Profile for chat. Redirecting...")
    //     this.props.history.push("/holo-vault/profiles")
    //     // this.props.history.push("/holo-vault/profile/HoloChat")
    //   }
    // })

    this.getChannelsInterval = setInterval(this.props.getMyChannels, 200)
  }

  componentWillUnmount () {
    clearInterval(this.getChannelsInterval)
  }

  handleNewChannelButtonClick = () => {
    // example promise from holochain call. Remove later
    this.props.getUsers(null).then((response) => {
      console.log(JSON.stringify(response.payload.data))
    })
    this.setState({ modalOpen: true })
  }

  addNewChannel = (channelSpec: ChannelSpec) => {
    this.props.newChannel(channelSpec)
    this.setState({ modalOpen: false })
  }

  onHandleClose = () => {
    this.setState({ modalOpen: false })
  }

  handleChannelListClick = (history: any, channel: ChannelType) => {
    this.props.setActiveChannel(channel)
    history.push(`/holo-chat/messages`)
  }

  render (): JSX.Element {
    const { classes, channels } = this.props
    return (<div className={classes.root}>
      <Button id='AddChannel' variant='fab' mini={true} onClick={this.handleNewChannelButtonClick} className={classes.addButton}>
        <AddIcon/>
      </Button>
      <Typography variant='display1'>
        Channels
      </Typography>
      <List id='channels' component='nav'>
        {
          channels.map((channel: ChannelType, index: number) => (
                <Route key={index} render={({ history }) => (
                  <ListItem id={channel.hash} button={true} onClick={() => this.handleChannelListClick(history, channel)}>
                    <ListItemText primary={channel.name}/>
                  </ListItem>
                )}
            />
          ))
        }
      </List>
      <NewChannel open={this.state.modalOpen} onSubmit={this.addNewChannel} onHandleClose={this.onHandleClose}/>
    </div>)
  }
}

// typecase after withRouter exposes only non-router props to external use. This is because withRouter will add those props automatically
export default withRoot(withStyles(styles)(withRouter(Channels)))
