import { Locator, Page } from '@playwright/test';

export class MainMenuComponent {
  commentsButton: Locator;
  articlesButton: Locator;
  mainMenuLink: Locator;

  constructor(private page: Page) {
    this.commentsButton = this.page.getByTestId('open-comments');
    this.articlesButton = this.page.getByTestId('open-articles');
    this.mainMenuLink = this.page.getByRole('link', { name: '🦎 GAD' });
  }
}
