import { getLogo } from '../support/app.po';

describe('{your-app}', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getLogo().should('have.attr', 'src').should('include','assets/logo.png')
  });
});
