describe('BasePage test', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('#emailInput input').type('user@example.com');
    cy.get('#passwordInput input').type('John1');
    cy.get('form').submit();
    cy.wait(1000);
    cy.visit('/')
  });

  it('uses menu to visit leaderboard', () => {
    cy.get('[data-cy="menu"]').get('[data-cy="leaderboard"]').click();
    cy.url().should('include', '/leaderboard');
  });

  it('uses menu to visit news', () => {
    cy.get('[data-cy="menu"]').get('[data-cy="news"]').click();
    cy.url().should('include', '/news');
  });

  it('uses menu to visit store', () => {
    cy.get('[data-cy="menu"]').get('[data-cy="store"]').click();
    cy.url().should('include', '/shop');
  });

  it('uses menu to visit roadmap', () => {
    cy.get('[data-cy="menu"]').get('[data-cy="savingGoals"]').click();
    cy.url().should('include', '/roadmap');
  });

  it('uses menu to visit user profile', () => {
    cy.get('[data-cy="menu"]').get('[data-cy="user"]').click();
    cy.get('[data-cy="profile"]').click();
    cy.url().should('include', '/profile');
  });

  it('uses menu to visit budget', () => {
    cy.get('[data-cy="menu"]').get('[data-cy="user"]').click();
    cy.get('[data-cy="budget"]').click();
    cy.url().should('include', '/budget');
  });

  it('uses menu to visit friends', () => {
    cy.get('[data-cy="menu"]').get('[data-cy="user"]').click();
    cy.get('[data-cy="friends"]').click();
    cy.url().should('include', '/friends');
  });

  it('uses menu to visit settings', () => {
    cy.get('[data-cy="menu"]').get('[data-cy="user"]').click();
    cy.get('[data-cy="settings"]').click();
    cy.url().should('include', '/settings');
  });

  it('uses menu to visit feedback', () => {
    cy.get('[data-cy="menu"]').get('[data-cy="user"]').click();
    cy.get('[data-cy="feedback"]').click();
    cy.url().should('include', '/feedback');
  });

  it('uses menu to log out', () => {
    cy.get('[data-cy="menu"]').get('[data-cy="user"]').click();
    cy.get('[data-testid="logout"]').click();
    cy.wait(1000);
    cy.url().should('include', '/login');
  });
})