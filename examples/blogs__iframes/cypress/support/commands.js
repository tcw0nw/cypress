Cypress.Commands.add('iframe', { prevSubject: 'element' }, ($iframe, callback = () => {}) => {
  // For more info on targeting inside iframes refer to this GitHub issue:
  // https://github.com/cypress-io/cypress/issues/136
  cy.log('Getting iframe body')

  return cy
  .wrap($iframe)
  .should((iframe) => expect(iframe.contents().find('body')).to.exist)
  .then((iframe) => cy.wrap(iframe.contents().find('body')))
  .within({}, callback)
})

Cypress.Commands.add('getIframeBody', () => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  cy.log('getIframeBody')

  return cy
  .get('iframe[data-cy="the-frame"]', { log: false })
  .its('0.contentDocument.body', { log: false }).should('not.be.empty')
  // wraps "body" DOM element to allow
  // chaining more Cypress commands, like ".find(...)"
  // https://on.cypress.io/wrap
  .then((body) => cy.wrap(body, { log: false }))
})
