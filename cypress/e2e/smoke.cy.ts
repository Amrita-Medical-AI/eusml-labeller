// import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  it("should allow you to register and login", () => {
    const loginForm = {
      email: Cypress.env('TEST_EMAIL'),
      password: Cypress.env('TEST_PASSWORD')
    };

    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/join");

    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();
    cy.contains("Sorry,")
    /**
     * @todo add a check for logout on patient page
     */

  });
});
