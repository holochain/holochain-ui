// import * as React from 'react'
// import Messages, { State, Props } from './messages'
// import * as Enzyme from 'enzyme'
// import * as Adapter from 'enzyme-adapter-react-16'
// import CreateStore from '../../../../store'
// import { Provider } from 'react-redux'
// import { MemoryRouter } from 'react-router-dom'
// import * as constants from '../../constants'
//
// let store = CreateStore()
// Enzyme.configure({ adapter: new Adapter() })
//
// export const messagesTests = describe('Message Streams Desktop', () => {
//
//   let props: Props
//   let mountedMessagesStream: Enzyme.ReactWrapper<Props, State> | undefined
//
//   const messagesStream = () => {
//     if (!mountedMessagesStream) {
//       mountedMessagesStream = Enzyme.mount(<Provider store={store}><MemoryRouter initialEntries={['/']}><Messages {...props}/></MemoryRouter></Provider>)
//     }
//     return mountedMessagesStream
//   }
//
//   beforeEach(() => {
//     mountedMessagesStream = undefined
//   })
//
//   props = {
//     sendMessage: jest.fn(() => Promise.reject('sendMessage')),
//     getMessages: jest.fn(() => Promise.reject('getMessages')),
//     isMobile: false,
//     messages: constants.messages,
//     members: constants.members,
//     channelName: 'Test Channel',
//     channelAddress: 'TestChannelAddress',
//     subjectName: 'Test Subject',
//     subjectAddress: 'TestSubjectAddress'
//   }
//
//   it('When a Channel is clicked on the list of messages related to the Channel is shown', () => {
//     const items = messagesStream().find('ExpansionPanel')
//     expect(items.length).toEqual(3)
//   })
//
// })
