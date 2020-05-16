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

Cypress.Commands.add('login', () => {
  return cy.request({
    method: 'GET',
    url: 'http://api2.capitalonline.net/gic/v1/get_token/',
    headers: {
      username: 'tcwaily@me.com',
      password: 'test123',
    },
  }).then((response) => {
    const target = (response.body['Access-Token'])

    // eslint-disable-next-line no-console
    console.log(target)
    // eslint-disable-next-line no-useless-concat
    cy.visit(`${'https://console.capitalonline.net/loadbalancers' + '?token='}${target}`)
  })
})
