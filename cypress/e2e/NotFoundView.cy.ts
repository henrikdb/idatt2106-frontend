describe('NotFound Test', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#emailInput input').type('user@example.com');
    cy.get('#passwordInput input').type('John1');
    cy.get('form').submit();
    cy.wait(1000);
    cy.visit('/')
  })
  it('redirects user when page is not found, then go home', () => {
    cy.visit('/non-existent-page')
    cy.get('[data-cy="404-error"]').should('exist')
    cy.get('[data-cy="to-home"]').click()
    cy.url().should('include', '/')
  })

})