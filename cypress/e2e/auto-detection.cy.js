describe("Auto Detection of Language", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false; // Prevent Cypress from failing the test
  });

  it("Should detect language", () => {
    // Visit homepage
    cy.visit("/");

    cy.fixture("translation").then((testCases) => {
      testCases.forEach(({ text, expectedLanguage }) => {
        // Step 1: Enter text into the textarea
        cy.get('textarea[placeholder="Enter text"]').clear().type(text);
        cy.wait(4000);
        // Step 2: Verify the detected language
        cy.get('[data-testid="detected-language"]')
          .invoke("text")
          .then((text) => {
            // Split the text on ":"
            const detectedText = text.split(":")[1].trim();

            // Log and assert the detected language
            cy.log(`Detected Language: ${detectedText}`);
            expect(detectedText).to.equal(expectedLanguage);
          });
      });
    });
  });
});
