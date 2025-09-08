import { TEST_URL } from '../../src/constant';

const SELECTORS = {
  burgerConstructor: '[data-cy=burger-constructor]',
  ingredientBun: '[data-cy=ingredient-bun]',
  ingredientMain: '[data-cy=ingredient-main]',
};

describe('work of burger constructor using DnD', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit(TEST_URL);
    cy.wait('@getIngredients');
  });

  function dragIngredient(selector) {
    const dataTransfer = new DataTransfer();
    cy.get(selector).trigger('dragstart', { dataTransfer });
    cy.get(SELECTORS.burgerConstructor).trigger('drop', { dataTransfer });
    cy.get(selector).trigger('dragend');
  }

  it('should add buns to constructor, replace them and increase counter of bun', function () {
    dragIngredient(`${SELECTORS.ingredientBun}:first`);
    cy.contains('(верх)').should('exist');
    cy.contains('(низ)').should('exist');

    // Перетащим другую булку
    dragIngredient(`${SELECTORS.ingredientBun}:eq(1)`);
    cy.contains('(верх)').should('exist');
    cy.contains('(низ)').should('exist');
    cy.get(`${SELECTORS.ingredientBun}:eq(1)`).should('contain.text', '1');
  });

  it('should add ingredients to constructor and increase counters', function () {
    dragIngredient(`${SELECTORS.ingredientMain}:first`);
    cy.get(`${SELECTORS.ingredientMain}:first`).should('contain.text', '1');

    dragIngredient(`${SELECTORS.ingredientMain}:eq(1)`);
    cy.get(`${SELECTORS.ingredientMain}:eq(1)`).should('contain.text', '1');
  });
});
