describe('SettingsSecurity Test', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#emailInput input').type('user@example.com');
    cy.get('#passwordInput input').type('John1');
    cy.get('form').submit();
    cy.wait(1000);
    cy.visit('/settings/security')
    cy.wait(1000)
  });

  it('updates password of user', () => {
    cy.get('[data-cy="old-password-input"]').find('[data-cy="bi-input"]').clear()
    cy.get('[data-cy="old-password-input"]').find('[data-cy="bi-input"]').type('John1')

    cy.get('[data-cy="new-password-input"]').find('[data-cy="bi-input"]').clear()
    cy.get('[data-cy="new-password-input"]').find('[data-cy="bi-input"]').type('NewJohn1Password')

    cy.get('[data-cy="confirm-password-input"]').find('[data-cy="bi-input"]').clear()
    cy.get('[data-cy="confirm-password-input"]').find('[data-cy="bi-input"]').type('NewJohn1Password')
    cy.get('[data-cy="update-password-btn"]').click()

    cy.get('[data-cy="menu"]').get('[data-cy="user"]').click();
    cy.get('[data-testid="logout"]').click();

    // reset all changes made to the user
    cy.get('#emailInput input').type('user@example.com');
    cy.get('#passwordInput input').type('NewJohn1Password');
    cy.get('form').submit();
    cy.wait(1000);
    cy.visit('/settings/security')
    cy.wait(1000)

    cy.get('[data-cy="old-password-input"]').find('[data-cy="bi-input"]').clear()
    cy.get('[data-cy="old-password-input"]').find('[data-cy="bi-input"]').type('NewJohn1Password')

    cy.get('[data-cy="new-password-input"]').find('[data-cy="bi-input"]').clear()
    cy.get('[data-cy="new-password-input"]').find('[data-cy="bi-input"]').type('John1')

    cy.get('[data-cy="confirm-password-input"]').find('[data-cy="bi-input"]').clear()
    cy.get('[data-cy="confirm-password-input"]').find('[data-cy="bi-input"]').type('John1')
    cy.get('[data-cy="update-password-btn"]').click()


  })
})