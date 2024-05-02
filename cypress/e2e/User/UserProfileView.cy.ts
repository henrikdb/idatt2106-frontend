describe('User Profile Page', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('#emailInput input').type('user@example.com');
        cy.get('#passwordInput input').type('John1');
        cy.get('form').submit();
        cy.wait(1000);
        cy.visit('/profile')
      });
  
    it('displays user information', () => {
      cy.get('[data-cy="firstname"]').should('contain.text', 'MrSlave');
      cy.get('[data-cy="firstname"]').should('contain.text', 'Swift');
      cy.get('[data-cy="points"]').should('contain.text', '253'); 
      cy.get('[data-cy="streak"]').should('contain.text', '1026'); 
    });
  
    it('navigates to update user settings', () => {
      cy.get('[data-cy="toUpdate"]').click();
      cy.url().should('include', '/settings/profile');
    });
  });
  