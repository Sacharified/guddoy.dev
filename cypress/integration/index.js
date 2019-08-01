/// <reference types="Cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    describe('Implicit Assertions', () => {
        it('.should() - make an assertion about the current subject', () => {
          // https://on.cypress.io/should
          cy.get('.layout')
            .find('h2')
            .should('have.text', 'Sacha Guddoy')
        });
    });
});