import { MainMenuComponent } from '@_src/components/main-menu.component';
import { ArticlePage } from '@_src/pages/article.page';
import { BasePage } from '@_src/pages/base.page';
import { AddArticleView } from '@_src/views/add-article.view';
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

  async goToArticles(title: string): Promise<ArticlePage> {
    await this.page.getByText(title).click();

    return new ArticlePage(this.page);
  }

  async searchArticle(phase: string): Promise<ArticlesPage> {
    await this.searchInput.fill(phase);
    await this.goSearchButton.click();

    return this;
  }

  async clickAddArticleButtonLogged(): Promise<AddArticleView> {
    await this.addArticleButtonLogged.click();
    return new AddArticleView(this.page);
  }
}
