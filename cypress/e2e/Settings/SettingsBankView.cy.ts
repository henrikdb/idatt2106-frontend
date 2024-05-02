describe('SettingsBank Test', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#emailInput input').type('user@example.com');
    cy.get('#passwordInput input').type('John1');
    cy.get('form').submit();
    cy.wait(1000);
    cy.visit('/settings/bank')
    cy.wait(1000)
  });

  it('updates spendings account of user', () => {
    cy.get('[data-cy="spending-account-input"]').find('[data-cy="bi-input"]').clear()
    cy.get('[data-cy="spending-account-input"]').find('[data-cy="bi-input"]').type('12073650567');
    cy.get('[data-cy="update-spending-btn"]').click()
  })

  it('updates savings account of user', () => {
    cy.get('[data-cy="savings-account-input"]').find('[data-cy="bi-input"]').clear()
    cy.get('[data-cy="savings-account-input"]').find('[data-cy="bi-input"]').type('12061174077');
    cy.get('[data-cy="update-savings-btn"]').click()
  })


})