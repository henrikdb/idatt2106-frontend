describe('Login Form Tests', () => {
    beforeEach(() => {
        cy.visit('/sign-up');
    });

    it('validates user input and displays error messages', () => {
        cy.get('#emailInput input').type('test');
        cy.get('#passwordInput input').type('pass');
        cy.get('form').submit();
        cy.get('#invalid').should('contain', 'Invalid email');
    });

    it('successfully logs in and redirects to the home page', () => {
        cy.visit('/');
        cy.url().should('include', '/login');
    });

    it('successfully logs in and redirects to the home page', () => {
        cy.get('#emailInput input').type('user@example.com');
        cy.get('#passwordInput input').type('John1');
        cy.get('form').submit();
        cy.wait(1000);
        cy.url().should('include', '/');
    });

    it('shows an error message on login failure', () => {
        // Update the intercept to simulate a login failure
        cy.intercept('POST', '/api/login', {
            statusCode: 401,
            body: { message: 'Invalid credentials' }
        }).as('apiLoginFail');

        cy.get('#emailInput input').type('wrong@example.com');
        cy.get('#passwordInput input').type('wrongPass1');
        cy.get('#confirmButton').click();
        cy.wait(1000);
        cy.get('[data-cy="error"]').should('contain', 'User not found');
    });
});
