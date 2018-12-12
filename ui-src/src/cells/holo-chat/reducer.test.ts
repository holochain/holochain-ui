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
      myChannels: testChannelsData.map(c => { return { ...c.entry, address: c.address } })
    })
  })

  it('Should update the state in response to GetMessages', () => {
    expect(holochatReducer(undefined, chatActions.GetMessages.success([
      {
        entry: {
          type: MessageType.CHAT,
          author: 'xxx',
          timestamp: 0,
          payload: '',
          meta: ''
        },
        address: 'message_address'
      }
    ])))
    .toEqual({
      ...initialState,
      messages: [{ type: MessageType.CHAT, author: 'xxx', timestamp: 0, payload: '', meta: '', address: 'message_address' }]
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
    const usersResponse = [
      { address: '111', entry: { id: '3', profile: { handle: 'philipbeadle', email: 'philip.beadle@holo.host', avatar: '' } } },
      { address: '222', entry: { id: '2', profile: { handle: 'thedavidmeister', email: 'david.meister@holo.host', avatar: '' } } }
    ]
    expect(holochatReducer(undefined, chatActions.GetAllMembers.success(usersResponse)))
    .toEqual({
      ...initialState,
      members: usersResponse.map(u => { return { agentId: u.address, ...u.entry.profile } })
    })
  })

  it('Should update the state in response to GetSubjects', () => {
    const subjectsTestData = [
      {
        entry: {
          channel_address: 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
          subject: 'Abundance of Presence',
          unread: 3
        },
        address: 'aop'
      },
      {
        entry: {
          channel_address: 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
          subject: 'Videos',
          unread: 2
        },
        address: 'videos'
      },
      {
        entry: {
          channel_address: 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
          subject: 'Standup',
          unread: 1
        },
        address: 'standup'
      }]

    expect(holochatReducer(undefined, chatActions.GetSubjects.success(subjectsTestData)))
    .toEqual({
      ...initialState,
      subjects: subjectsTestData.map(s => { return { ...s.entry, address: s.address } })
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
