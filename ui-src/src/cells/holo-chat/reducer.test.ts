import { holochatReducer, initialState } from './reducer'
import { getType } from 'typesafe-actions'
import { AxiosResponse } from 'axios'

import * as chatActions from './actions'
import { MessageType } from './types/message'

describe('Chat Reducer', () => {

  it('Should update the state in response to GetMyChannels', () => {
    expect(holochatReducer(undefined, {
      type: getType(chatActions.GetMyChannels.success),
      payload: {
        data: ['channel1', 'channel2']
      } as AxiosResponse
    })).toEqual({
      ...initialState,
      myChannels: ['channel1', 'channel2']
    })
  })

  it('Should update the state in response to GetMessages', () => {
    expect(holochatReducer(undefined, {
      type: getType(chatActions.GetMessages.success),
      payload: {
        data: [{ type: MessageType.CHAT, author: 'xxx', timestamp: 0, content: '', replies: [], channelId: '' }]
      } as AxiosResponse
    })).toEqual({
      ...initialState,
      currentMessages: [{ type: MessageType.CHAT, author: 'xxx', timestamp: 0, content: '', replies: [], channelId: '' }]
    })
  })

  it('Should update the state in response to GetMembers', () => {
    expect(holochatReducer(undefined, {
      type: getType(chatActions.GetMembers.success),
      payload: {
        data: [{ handle: 'a', avatar: '' }, { handle: 'b', avatar: '' }]
      } as AxiosResponse
    })).toEqual({
      ...initialState,
      activeChannelMembers: [{ handle: 'a', avatar: '' }, { handle: 'b', avatar: '' }]
    })
  })

  it('Should update the state in response to Whoami', () => {
    expect(holochatReducer(undefined, {
      type: getType(chatActions.GetProfile.success),
      payload: {
        data: 'xxx1'
      } as AxiosResponse
    })).toEqual({
      ...initialState,
      myHash: 'xxx1'
    })
  })

  it('Should update the state in response to GetUsers', () => {
    let usersResponse = [{ id: '3', profile: { handle: 'philipbeadle', email: 'philip.beadle@holo.host', avatar: '' } }, { id: '2', profile: { handle: 'thedavidmeister', email: 'david.meister@holo.host', avatar: '' } }]
    expect(holochatReducer(undefined, {
      type: getType(chatActions.GetAllMembers.success),
      payload: {
        data: usersResponse
      } as AxiosResponse
    })).toEqual({
      ...initialState,
      users: [{ hash: '3', email: 'philip.beadle@holo.host', handle: 'philipbeadle', avatar: '' }, { hash: '2', email: 'david.meister@holo.host', handle: 'thedavidmeister', avatar: '' }]
    })
  })

  it('Should update the state in response to GetSubjects', () => {
    expect(holochatReducer(undefined, {
      type: getType(chatActions.GetSubjects.success),
      payload: {
        data: [{
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
      } as AxiosResponse
    })).toEqual({
      ...initialState,
      subjects: [{
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
    })
  })

  it('Should not touch the state when GetSubjects returns an empty set', () => {
    expect(holochatReducer(undefined, {
      type: getType(chatActions.GetSubjects.success),
      payload: {
        data: []
      } as AxiosResponse
    })).toEqual({
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
