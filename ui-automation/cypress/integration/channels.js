// const should = require('should');

describe('The what why and how for Channels', function () {
  it('Make a channel for a new 1 to 1 chat', function () {
    cy.visit('/holo-chat/channels')
    cy.contains('Channel', {timeout:2000})
    cy.visit('/')
  })
})
