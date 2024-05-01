describe('SettingsProfile Test', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#emailInput input').type('user@example.com');
    cy.get('#passwordInput input').type('John1');
    cy.get('form').submit();
    cy.wait(1000);
    cy.visit('/settings/profile')
    cy.wait(1000)
  });

  it('updates first and last name', () => {
    cy.get('[data-cy="first-name"]').find('[data-cy="bi-input"]').should('have.value','User')
    cy.get('[data-cy="last-name"]').find('[data-cy="bi-input"]').should( 'have.value','User')
    cy.get('[data-cy="first-name"]').find('[data-cy="bi-input"]').clear().type('NewFirstName')
    cy.get('[data-cy="last-name"]').find('[data-cy="bi-input"]').clear().type('NewLastName')
    cy.get('[data-cy="profile-submit-btn"]').click()
    cy.get('[data-cy="menu"]').get('[data-cy="user"]').should('include.text', 'NewFirstName')
    //update the user back to its original state
    cy.get('[data-cy="first-name"]').find('[data-cy="bi-input"]').clear().type('User')
    cy.get('[data-cy="last-name"]').find('[data-cy="bi-input"]').clear().type('User')
    cy.get('[data-cy="profile-submit-btn"]').click()
  })
})