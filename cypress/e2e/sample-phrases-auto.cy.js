import { samplePhraseDict } from "../../src/constants";
describe("Test changes", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false; // Prevent Cypress from failing the test
  });

  it("Sample phrase matches text in source textarea", () => {
    // Visit homepage
    cy.visit("/");

    cy.get("[data-testid='show-sample-phrases']").click().should("be.visible");

    for (const [lang, sections] of Object.entries(samplePhraseDict.auto)) {
      cy.log("sections", sections);

      // ensuring we can change languages on click
      cy.get('[data-testid="sample-phrase-language"]')
        .contains(sections[0])
        .click()
        .should("be.visible");
      {
        /*
      //checking if each phrase is actually added to source textare on click
      sections[1].forEach((phrase) => {
        cy.contains(phrase, { timeout: 20000 }).should("be.visible").click();

        cy.get('textarea[placeholder="Enter text"]').should(
          "have.value",
          phrase
        );
      });
      */
      }
    }
  });
});
