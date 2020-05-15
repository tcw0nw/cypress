/// <reference types="cypress" />
import {
  // eslint-disable-next-line no-unused-vars
  skipOn,
} from '@cypress/skip-test'
// eslint-disable-next-line no-unused-vars
import { wait } from '@apollo/react-testing'

// const getIframeDocument = () => {
//   return cy.get('#frame_content')
//   .its('0.contentDocument')
// }
// const getIframeBody = () => {
//   return getIframeDocument()
//   .its('body').should('not.be.undefined')
//   .then(cy.wrap)
// }

// Cypress.Commands.add('iframe', { prevSubject: 'element' }, ($iframe, callback = () => {}) => {
//   // For more info on targeting inside iframes refer to this GitHub issue:
//   // https://github.com/cypress-io/cypress/issues/136
//   cy.log('Getting iframe body')
//
//   return cy
//   .wrap($iframe)
//   .should((iframe) => expect(iframe.contents().find('body')).to.exist)
//   .then((iframe) => cy.wrap(iframe.contents().find('body')))
//   .within({}, callback)
// })

describe('PaaS', () => {
  beforeEach(() => {
    cy.login()
    cy.wait(12000)
  })

  it('负载均衡', function () {
    cy.get('#frame_content').iframe(() => {
      // Targets the input within the iframe element
      cy.get('.header_v2 > a').should('have.text', '创建负载均衡服务').click()
      cy.get('.product_type_box:nth-child(1) .open_server').should('have.text', '开通服务').click()
      cy.get('.create_btn_v2:nth-child(3)').should('have.text', '4C8G').click()
      cy.get('.select_v2:nth-child(1) > .show_select_v2').should('contain', '中国大陆').click() // 打开vdc列表
      cy.get('li:nth-child(13)').should('contain', '亚太地区-香港').click() // 选择具体vdc
      cy.get('.new_pandect_confirm span').should('contain', '4.68') // 验证默认价格
      cy.contains('私网1').click() // 找到包含文本私网1的元素
      cy.get('.confirm_protocol > label').click() // 勾选协议
      // cy.get('div:nth-child(3) > a').click() // 点击确定按钮
      // cy.get('.submit_btn > span').click() // 找到包含文本Submit的元素
      // cy.get('.creating').should('have.text', '创建中') // 验证是否在创建中
    })
  })
})
