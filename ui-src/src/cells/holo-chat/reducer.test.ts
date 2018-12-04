import { holochatReducer, initialState } from './reducer'

import * as chatActions from './actions'
import { MessageType } from './types/message'

describe('Chat Reducer', () => {

  it('Should update the state in response to GetMyChannels', () => {
    const testChannelsData: Array<{entry: any, address: String}> = [
      {
        entry: {
          public: false,
          name: 'channel',
          description: 'sup'
        },
        address: 'ABC'
      }
    ]
    expect(holochatReducer(undefined, chatActions.GetMyChannels.success(testChannelsData)))
    .toEqual({
      ...initialState,
      myChannels: ['channel1', 'channel2']
    })
  })

  it('Should update the state in response to GetMessages', () => {
    expect(holochatReducer(undefined, chatActions.GetMessages.success([
      { type: MessageType.CHAT, author: 'xxx', timestamp: 0, content: '', replies: [], channelId: '' }
    ])))
    .toEqual({
      ...initialState,
      currentMessages: [{ type: MessageType.CHAT, author: 'xxx', timestamp: 0, content: '', replies: [], channelId: '' }]
    })
  })

  it('Should update the state in response to GetMembers', () => {
    expect(holochatReducer(undefined, chatActions.GetMembers.success([{ handle: 'a', avatar: '' }, { handle: 'b', avatar: '' }])))
    .toEqual({
      ...initialState,
      activeChannelMembers: [{ handle: 'a', avatar: '' }, { handle: 'b', avatar: '' }]
    })
  })

  it('Should update the state in response to GetProfile', () => {
    expect(holochatReducer(undefined, chatActions.GetProfile.success('xxx1')))
    .toEqual({
      ...initialState,
      myHash: 'xxx1'
    })
  })

  it('Should update the state in response to GetAllMembers', () => {
    const usersResponse = [{ id: '3', profile: { handle: 'philipbeadle', email: 'philip.beadle@holo.host', avatar: '' } }, { id: '2', profile: { handle: 'thedavidmeister', email: 'david.meister@holo.host', avatar: '' } }]
    expect(holochatReducer(undefined, chatActions.GetAllMembers.success(usersResponse)))
    .toEqual({
      ...initialState,
      users: usersResponse
    })
  })

  it('Should update the state in response to GetSubjects', () => {
    const subjectsTestData = [
      {
        channelAddress: 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
        address: 'aop',
        subject: 'Abundance of Presence',
        unread: 3
      },
      {
        channelAddress: 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
        address: 'videos',
        subject: 'Videos',
        unread: 2
      },
      {
        channelAddress: 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
        address: 'standup',
        subject: 'Standup',
        unread: 1
      }]

    expect(holochatReducer(undefined, chatActions.GetSubjects.success(subjectsTestData)))
    .toEqual({
      ...initialState,
      subjects: subjectsTestData
    })
  })

  it('Should not touch the state when GetSubjects returns an empty set', () => {
    expect(holochatReducer(undefined, chatActions.GetSubjects.success([])))
    .toEqual({
      ...initialState,
      subjects: []
    })
  })

  it('Should make no change on an unknown action', () => {
    expect(holochatReducer(undefined, {
      type: 'NOTANACTIONT'
    })).toEqual(initialState)
  })
})
