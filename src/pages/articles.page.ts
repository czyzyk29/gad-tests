import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  searchInput = this.page.getByTestId('search-input');
  goSearchButton = this.page.getByTestId('search-button');
  noResults = this.page.getByTestId('no-results');
  addArticleButtonLogged = this.page.locator('#add-new');
  mainMenu = new MainMenuComponent(this.page);
  constructor(page: Page) {
    super(page);
  }

  async goToArticles(title: string): Promise<void> {
    await this.page.getByText(title).click();
  }

  async searchArticle(phase: string): Promise<void> {
    await this.searchInput.fill(phase);
    await this.goSearchButton.click();
  }
}
