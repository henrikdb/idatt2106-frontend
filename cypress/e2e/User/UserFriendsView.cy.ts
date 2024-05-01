describe('Friend Management View', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('#emailInput input').type('user@example.com');
        cy.get('#passwordInput input').type('John1');
        cy.get('form').submit();
        cy.wait(1000);
        cy.visit('/friends')
      });
  
    it('should display friend management UI elements', () => {
      cy.contains('Dine venner')
      cy.get('.container').within(() => {
        cy.contains('+ Legg til venn')
      })
    })
  
    it('should navigate between friend management sections', () => {
        cy.wait(1000);
        cy.get('[data-cy="navigateToFriend"]').first().click();
        cy.wait(1000);
        cy.url().should('include', '/profile');

    })
  
    it('should search and add friends', () => {
      cy.contains('+ Legg til venn').click()
      cy.get('.modal-title').should('contain', 'Legg til venn')
      cy.get('input[type="search"]').type('TestUser1')
      cy.contains('Søk').click()
      cy.wait(1000);
      cy.get('.people-nearby').within(() => {
        cy.contains('TestUser1')
      })
    })

    it('should display no friend requests when there is no friend requests', () => {
        cy.contains('Venneforespørsler').click()
        cy.get('.container').within(() => {
          cy.contains('Ingen venneforespørsler')
        })
      })
  })
  