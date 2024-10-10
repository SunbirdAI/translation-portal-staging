describe("Responsiveness for different devices", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false; // Prevent Cypress from failing the test
  });

  it("Checking for responsiveness", () => {
    // Visit homepage
    cy.visit("/");

    cy.fixture("screens").then((screens) => {
      Object.values(screens).map((value) => {
        cy.log("screen", value);
        cy.viewport(value.viewportWidth, value.viewportHeight);
        cy.get('textarea[placeholder="Enter text"]').clear().type("I am happy");
        cy.wait(6000);
        //cy.scrollTo("bottom", { duration: 30000 });
        //cy.scrollTo("top", { duration: 30000 });
      });
    });
  });
});
