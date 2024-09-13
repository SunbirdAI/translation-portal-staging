import { samplePhraseDict } from "../../src/constants";

describe("Test changes", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false; // Prevent Cypress from failing the test
  });

  it(`Sample phrases match text in textarea for source language`, () => {
    // Visit homepage
    cy.visit("/");
    cy.fixture("languages").then((languageNames) => {
      languageNames.forEach((value) => {
        cy.get("[data-testid='language-dropdown']")
          .first()
          .click()
          .should("be.visible")
          .then(() => {
            cy.get('[data-testid="dropdown-option"]')
              .contains(value.lang)
              .click();
            cy.get('[data-testid="language-dropdown"]')
              .first()
              .should("contain.text", value.lang);
          });

        cy.get("[data-testid='show-sample-phrases']")
          .click()
          .should("be.visible");

        for (const [lang, sections] of Object.entries(
          samplePhraseDict[value.code]
        )) {
          cy.log("sections", sections, lang);

          // ensuring we can change languages on click
          cy.get('[data-testid="sample-phrase-language"]')
            .contains(sections[0])
            .click()
            .should("be.visible");

          //checking if each phrase is actually added to source textare on click
          sections[1].forEach((phrase) => {
            cy.contains(phrase, { timeout: 20000 })
              .should("be.visible")
              .click();

            cy.get('textarea[placeholder="Enter text"]').should(
              "have.value",
              phrase
            );
          });
        }
      });
    });
  });
});
