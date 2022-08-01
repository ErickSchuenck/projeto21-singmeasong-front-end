Cypress.Commands.add("resetDatabase", () => {
  cy.request("POST", "http://localhost:5000/tests/reset", {});
});