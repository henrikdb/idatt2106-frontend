describe('SettingsAccount Test', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#emailInput input').type('user@example.com');
    cy.get('#passwordInput input').type('John1');
    cy.get('form').submit();
    cy.wait(1000);
    cy.visit('/settings/account')
    cy.wait(1000)
  });

  it('updates email of user', () => {
    cy.get('[data-cy="email-input"]').find('[data-cy="bi-input"]')
    .should('have.value','user@example.com')
    cy.get('[data-cy="email-input"]').find('[data-cy="bi-input"]').clear()
    cy.get('[data-cy="email-input"]').find('[data-cy="bi-input"]').type('NewEmailforUser@NewExample.com')
    cy.get('[data-cy="change-email-btn"]').click()
    cy.wait(1000)
    cy.get('[data-cy="change-email-msg-confirm"]').should('include.text', 'Email updated successfully!')

    cy.get('[data-cy="menu"]').get('[data-cy="user"]').click();
    cy.get('[data-testid="logout"]').click();

    cy.get('#emailInput input').type('NewEmailforUser@NewExample.com');
    cy.get('#passwordInput input').type('John1');
    cy.get('form').submit();
    cy.wait(1000);
    cy.visit('/settings/account')
    cy.wait(1000)

    cy.get('[data-cy="email-input"]').find('[data-cy="bi-input"]').clear()
    cy.get('[data-cy="email-input"]').find('[data-cy="bi-input"]').type('user@example.com')
    cy.get('[data-cy="change-email-btn"]').click()
  })
})