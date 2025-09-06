import { TEST_URL } from '../../src/constant';

const SELECTORS = {
  ingredientBun: '[data-cy=ingredient-bun]',
  ingredientMain: '[data-cy=ingredient-main]',
  ingredientSauce: '[data-cy=ingredient-sauce]',
  ingredientModal: '[data-testid=ingredient]',
  overlay: '[data-testid=overlay]',
  closeIcon: '[data-testid=closeIcon]',
};

describe('modal window opens correctly', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit(TEST_URL);
    cy.wait('@getIngredients');
  });

  it('should open modal windows and close them when press ESC', function () {
    cy.get(SELECTORS.ingredientBun).first().click();
    cy.get(SELECTORS.ingredientModal).should('exist');
    cy.get('body').type('{esc}');
    cy.get(SELECTORS.ingredientModal).should('not.exist');
  });

  it('should open modal windows and close them when click on overlay', function () {
    cy.get(SELECTORS.ingredientMain).eq(0).click();
    cy.get(SELECTORS.ingredientModal).should('exist');
    cy.get(SELECTORS.overlay).click({ force: true });
    cy.get(SELECTORS.ingredientModal).should('not.exist');
  });

  it('should open modal windows and close them when click on close icon', function () {
    cy.get(SELECTORS.ingredientSauce).eq(0).click();
    cy.get(SELECTORS.ingredientModal).should('exist');
    cy.get(SELECTORS.closeIcon).click();
    cy.get(SELECTORS.ingredientModal).should('not.exist');
  });
});
