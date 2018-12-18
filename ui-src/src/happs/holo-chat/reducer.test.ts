import { holochatReducer, initialState } from './reducer'

import * as chatActions from './actions'
import { MessageType } from './types/message'

describe('Chat Reducer', () => {

  it('Should update the streamAddress in response to CreateStream', () => {
    expect(holochatReducer(undefined, chatActions.CreateStream.success('streamAddress_hash')))
    .toEqual({
      ...initialState,
      streamAddress: 'streamAddress_hash'
    })
  })

  it('Should update the state in response to GetMyStreams', () => {
    const testStreamsData: Array<{entry: any, address: String}> = [
      {
        entry: {
          public: false,
          name: 'stream',
          description: 'sup'
        },
        address: 'ABC'
      }
    ]
    expect(holochatReducer(undefined, chatActions.GetMyStreams.success(testStreamsData)))
    .toEqual({
      ...initialState,
      myStreams: testStreamsData.map(c => { return { ...c.entry, address: c.address } })
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
    const usersResponse = [
      { address: '111', profile: { handle: 'philipbeadle', email: 'philip.beadle@holo.host', avatar: '' } },
      { address: '222', profile: { handle: 'thedavidmeister', email: 'david.meister@holo.host', avatar: '' } }
    ]
    expect(holochatReducer(undefined, chatActions.GetMembers.success(usersResponse)))
    .toEqual({
      ...initialState,
      activeStreamMembers: usersResponse.map(u => { return { agentId: u.address, ...u.profile } })
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
      { address: '111', profile: { handle: 'philipbeadle', email: 'philip.beadle@holo.host', avatar: '' } },
      { address: '222', profile: { handle: 'thedavidmeister', email: 'david.meister@holo.host', avatar: '' } }
    ]
    expect(holochatReducer(undefined, chatActions.GetAllMembers.success(usersResponse)))
    .toEqual({
      ...initialState,
      members: usersResponse.map(u => { return { agentId: u.address, ...u.profile } })
    })
  })

  it('Should update the state in response to GetSubjects', () => {
    const initialSubjects = [
      {
        entry: {
          stream_address: 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps_nomatch',
          subject: 'Abundance of Presence',
          unread: 3
        },
        address: 'aop'
      }
    ]
    console.log(holochatReducer(undefined, chatActions.GetSubjects.success(initialSubjects)))
    const subjectsTestData = [
      {
        entry: {
          stream_address: 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
          subject: 'Abundance of Presence',
          unread: 3
        },
        address: 'aop'
      },
      {
        entry: {
          stream_address: 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
          subject: 'Videos',
          unread: 2
        },
        address: 'videos'
      },
      {
        entry: {
          stream_address: 'QmYodaHMeU8Su5H8G4ByZvumBvYcNrX8JrDKYQRKN8devhapps',
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

  it('Should update streamAddress on SetStreamAddress', () => {
    expect(holochatReducer(undefined, chatActions.SetStreamAddress('StreamAddress')))
    .toEqual({
      ...initialState,
      streamAddress: 'StreamAddress'
    })
  })

  it('Should update subjectAddress on SetSubjectAddress', () => {
    expect(holochatReducer(undefined, chatActions.SetSubjectAddress('SubjectAddress')))
    .toEqual({
      ...initialState,
      subjectAddress: 'SubjectAddress'
    })
  })

  it('Should make no change on an unknown action', () => {
    expect(holochatReducer(undefined, {
      type: 'NOTANACTIONT'
    })).toEqual(initialState)
  })
})
