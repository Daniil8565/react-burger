describe('modal window opens correctly', function () {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json',
    }).as('getIngredients');
    cy.visit('http://localhost:3000');
    cy.wait('@getIngredients');
  });

  it('should open modal windows and close them when press ESC', function () {
    cy.get('[data-cy=ingredient-bun]').first().click();
    cy.get('[data-testid="ingredient"]').should('exist');
    cy.get('body').type('{esc}');
    cy.get('[data-testid="ingredient"]').should('not.exist');
  });

  it('should open modal windows and close them when click on overlay', function () {
    cy.get('[data-cy=ingredient-main]').eq(0).click();
    cy.get('[data-testid="ingredient"]').should('exist');
    cy.get('[data-testid="overlay"]').click({ force: true });
    cy.get('[data-testid="ingredient"]').should('not.exist');
  });

  it('should open modal windows and close them when click on close icon', function () {
    cy.get('[data-cy=ingredient-sauce]').eq(0).click();
    cy.get('[data-testid="ingredient"]').should('exist');
    cy.get('[data-testid="closeIcon"]').click();
    cy.get('[data-testid="ingredient"]').should('not.exist');
  });
});
