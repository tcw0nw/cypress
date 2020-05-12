/// <reference types="cypress" />
import {
  skipOn,
} from '@cypress/skip-test'
// eslint-disable-next-line no-unused-vars
import { wait } from '@apollo/react-testing'

const getIframeDocument = () => {
  cy.wait(12000)

  return cy.get('#frame_content')
  // Cypress yields jQuery element, which has the real
  // DOM element under property "0".
  // From the real DOM iframe element we can get
  // the "document" element, it is stored in "contentDocument" property
  // Cypress "its" command can access deep properties using dot notation
  // https://on.cypress.io/its
  // cy.its also waits for the property to exist
  .its('0.contentDocument')
}

// eslint-disable-next-line no-unused-vars
const getIframeBody = () => {
  // get the document
  return getIframeDocument()
  // automatically retries until body is loaded
  .its('body').should('not.be.undefined')
  // wraps "body" DOM element to allow
  // chaining more Cypress commands, like ".find(...)"
  // https://on.cypress.io/wrap
  .then(cy.wrap)
}

describe('Recipe: blogs__iframes', () => {
  skipOn('firefox', () => {
    it('gets the post', () => {
      cy.visit('https://console.capitalonline.net/loadbalancers?token=a36a3ba06003685dd63f6815cbc5646b70970e97522a9f7a2811f3cc20e2a22f')
      getIframeBody().find('.header_v2 > a').should('have.text', '创建负载均衡服务').click()
      getIframeBody().find('.product_type_box:nth-child(1) .open_server').should('have.text', '开通服务').click()
      getIframeBody().find('.create_btn_v2:nth-child(3)').should('have.text', '4C8G').click()
    })
  })
})
