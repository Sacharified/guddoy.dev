/// <reference types="Cypress" />

context("Actions", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    describe("Implicit Assertions", () => {
        it(".should() - make an assertion about the current subject", () => {
          cy.get(".layout")
            .find("h2")
            .should("have.text", "Sacha Guddoy")
        });
    });
});