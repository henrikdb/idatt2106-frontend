describe("Leaderboard Test", () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#emailInput input').type('user@example.com');
    cy.get('#passwordInput input').type('John1');
    cy.get('form').submit();
    cy.wait(1000);
    cy.visit('/leaderboard')
  });

  it('loads global leaderboards', () => {
    cy.get('[data-cy="total-points-board"]')
    .find('[data-cy="top-leaderboard-tablerow"]')
    .should('have.length', 10);

    cy.get('[data-cy="total-points-board"]')
    .find('[data-cy="surrounding-user-leaderboard-tablerow"]')
    .should('have.length', 4);

    cy.get('[data-cy="current-points-board"]')
    .find('[data-cy="top-leaderboard-tablerow"]')
    .should('have.length', 10);

    cy.get('[data-cy="streak-board"]')
    .find('[data-cy="top-leaderboard-tablerow"]')
    .should('have.length', 10);
  })

  it('loads friends leaderboards', () => {
    cy.get('[data-cy="friends-leaderboard-btn"]').click()

    cy.get('[data-cy="total-points-board"]')
    .find('[data-cy="top-leaderboard-tablerow"]')
    .should('have.length', 3);

    cy.get('[data-cy="current-points-board"]')
    .find('[data-cy="top-leaderboard-tablerow"]')
    .should('have.length', 3);

    cy.get('[data-cy="streak-board"]')
    .find('[data-cy="top-leaderboard-tablerow"]')
    .should('have.length', 3);
  })

})