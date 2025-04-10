describe.skip("Run all tests", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false; // Prevent Cypress from failing the test
  });
  it("should perform all actions: display and close note, change languages, and translate text", () => {
    //VIsit homepage
    cy.visit("/");

    // Step 1: Display and close the note
    cy.get('[data-testid="note"]').should("be.visible");
    cy.get('[data-testid="close-note"]').click();
    cy.get('[data-testid="note"]').should("not.exist");

    // Step 2: Change source language
    cy.get('[data-testid="language-dropdown"]').first().click();
    cy.get('[data-testid="dropdown-option"]')
      .should("be.visible")
      .each(($el, index) => {
        cy.wrap($el)
          .invoke("text")
          .then((optionText) => {
            cy.log(`Source Option ${index + 1}: ${optionText}`);
          });
      });
    cy.get('[data-testid="dropdown-option"]').contains("English").click();
    cy.get('[data-testid="language-dropdown"]')
      .first()
      .should("contain.text", "English");

    // Step 3: Change target language
    cy.get('[data-testid="language-dropdown"]').eq(1).click();
    cy.get('[data-testid="dropdown-option"]')
      .should("be.visible")
      .each(($el, index) => {
        cy.wrap($el)
          .invoke("text")
          .then((optionText) => {
            cy.log(`Target Option ${index + 1}: ${optionText}`);
          });
      });
    cy.get('[data-testid="dropdown-option"]').contains("Acholi").click();
    cy.get('[data-testid="language-dropdown"]')
      .eq(1)
      .should("contain.text", "Acholi");

    // Step 4: Translate text and display loading indicator
    cy.get('textarea[placeholder="Enter text"]').type("I am happy");
    cy.get('[data-testid="loading-indicator"]').should("be.visible");

    // Wait for translation to complete (adjust this based on your API response time)
    cy.wait(3000);

    cy.get('[data-testid="translation"]').should("not.be.empty");
  });
});
