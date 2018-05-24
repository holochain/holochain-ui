describe('How to work with Profiles', function () {
  it('Show each Profile you have created', function () {
    cy.request('POST', 'http://localhost:4141/fn/personas/personasList', '')
  })
})
