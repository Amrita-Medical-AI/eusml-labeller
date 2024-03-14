describe('Procedure Form filling', () => {
    it('Fills out the form and submits successfully', () => {
        const loginForm = {
            email: Cypress.env('TEST_EMAIL'),
            password: Cypress.env('TEST_PASSWORD')
          };

        cy.then(() => ({ email: loginForm.email })).as("user");
        cy.viewport(600, 900)
        cy.visit('/login');
        cy.wait(700);
        cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
        cy.findByLabelText(/password/i).type(loginForm.password);
        cy.contains('Log in').click()
        cy.wait(500)

        // cy.contains('Invalid email or password').should('not.exist');

        cy.get('input[name="name"]').focus().type('John Doe');
        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="mrd"]').type('123456');
        cy.get('input[type="checkbox"]').check(["CCP", "Cysts"]);
        cy.get('select[name="doctor"]').select('Dr. Priya');

        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/patient/label/');
        cy.contains('MRD');

        // station and FNA labeling page

        cy.contains('Start Procedure').click()

        cy.contains('Station 1').click()
        cy.wait(500)
        cy.contains('Station 1').click()
        cy.wait(500)
        cy.contains('Station 2').click()
        cy.wait(500)
        cy.contains('Stomach 1').click()
        cy.wait(500)
        cy.get('#FNA-Button').click()
        cy.wait(500)
        cy.contains('Station 2').click()
        cy.wait(500)
        cy.contains('Station 3').click()
        cy.wait(500)
        cy.get('#FNA-Button').click()
        cy.wait(500)
        cy.contains('Station 3').click()
        cy.wait(500)
        cy.contains('Stop Procedure').click()
        cy.wait(500)
        cy.contains('Confirm Stop!')
        cy.contains('Yes')
        // cy.wait(500)
        // cy.contains('Procedure Complete')

    });
});
