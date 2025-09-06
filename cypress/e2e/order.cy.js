import { TEST_URL } from '../../src/constant';

const SELECTORS = {
  burgerConstructor: '[data-cy=burger-constructor]',
  ingredientBun: '[data-cy=ingredient-bun]',
  ingredientMain: '[data-cy=ingredient-main]',
  ingredientModal: '[data-testid=ingredient]',
  closeIcon: '[data-testid=closeIcon]',
};

describe('work of burger constructor and create order', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as(
      'login'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');

    const email = 'zxcvqsadaswebnm@mail.ru';
    const password = '12345678';

    cy.visit(TEST_URL);
    cy.wait('@getIngredients');

    // Логинимся через ЛК
    cy.contains('Личный кабинет').click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait('@login');
    cy.wait('@user');

    cy.contains('Конструктор').click();
  });

  it('should create an order', function () {
    // Перетаскиваем булку
    cy.get(SELECTORS.ingredientBun).first().trigger('dragstart');
    cy.get(SELECTORS.burgerConstructor).trigger('drop');

    // Перетаскиваем начинку
    cy.get(SELECTORS.ingredientMain).first().trigger('dragstart');
    cy.get(SELECTORS.burgerConstructor).trigger('drop');

    // Нажимаем "Оформить заказ"
    cy.contains('Оформить заказ').click();

    // Ждём появления модалки с заказом
    cy.get(SELECTORS.ingredientModal, { timeout: 5000 }).should('exist');
    cy.get(SELECTORS.ingredientModal).contains('идентификатор заказа');

    // Закрываем модалку
    cy.get(SELECTORS.closeIcon).click();
    cy.get(SELECTORS.ingredientModal).should('not.exist');
  });
});
