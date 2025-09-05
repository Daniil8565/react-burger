describe('work of burger constructor using DnD', function () {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json',
    }).as('getIngredients');
    cy.visit('http://localhost:3000');
    cy.wait('@getIngredients');
  });

  function dragIngredient(selector) {
    const dataTransfer = new DataTransfer();
    cy.get(selector).trigger('dragstart', { dataTransfer });
    cy.get('[data-cy=burger-constructor]').trigger('drop', { dataTransfer });
    cy.get(selector).trigger('dragend');
  }

  it('should add buns to constructor, replace them and increase counter of bun', function () {
    dragIngredient('[data-cy=ingredient-bun]:first');

    cy.contains('(верх)').should('exist');
    cy.contains('(низ)').should('exist');

    cy.get('[data-cy=ingredient-bun]:first').should('exist');

    // Перетащим другую булку
    dragIngredient('[data-cy=ingredient-bun]:eq(1)');

    cy.contains('(верх)').should('exist');
    cy.contains('(низ)').should('exist');
    cy.get('[data-cy=ingredient-bun]:eq(1)').should('contain.text', '1');
  });

  it('should add ingredients to constructor and increase counters', function () {
    dragIngredient('[data-cy=ingredient-main]:first');
    cy.get('[data-cy=ingredient-main]:first').should('contain.text', '1');

    dragIngredient('[data-cy=ingredient-main]:eq(1)');
    cy.get('[data-cy=ingredient-main]:eq(1)').should('contain.text', '1');
  });
});
