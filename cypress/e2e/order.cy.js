describe('work of burger constructor using DnD', function () {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json',
    }).as('getIngredients');

    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
      fixture: 'login.json',
    }).as('login');

    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      fixture: 'order.json',
    }).as('order');

    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
      fixture: 'user.json',
    }).as('user');

    const email = 'zxcvqsadaswebnm@mail.ru';
    const password = '12345678';

    cy.visit('http://localhost:3000');
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
    cy.get('[data-cy=ingredient-bun]').first().trigger('dragstart');
    cy.get('[data-cy=burger-constructor]').trigger('drop');

    // Перетаскиваем начинку
    cy.get('[data-cy=ingredient-main]').first().trigger('dragstart');
    cy.get('[data-cy=burger-constructor]').trigger('drop');

    // Нажимаем "Оформить заказ"
    cy.contains('Оформить заказ').click();

    // Ждём появления модалки с заказом
    cy.get('[data-testid="ingredient"]', { timeout: 5000 }).should('exist');
    cy.get('[data-testid="ingredient"]').contains('идентификатор заказа');

    // Закрываем модалку
    cy.get('[data-testid="closeIcon"]').click();
    cy.get('[data-testid="ingredient"]').should('not.exist');
  });
});
