import {Channel as ModelChannel} from '../model/channel'

export type Channel = any

export function modelChannelsToViewChannels(channels: Array<ModelChannel>): Array<Channel> {
  return channels as Array<Channel>
}
