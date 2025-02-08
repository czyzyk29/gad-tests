import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { HomePage } from '@_src/pages/home.page';
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
  async clickCommentButton(): Promise<CommentsPage> {
    await this.commentsButton.click();
    return new CommentsPage(this.page);
  }

  async clickArticlesButton(): Promise<ArticlesPage> {
    await this.articlesButton.click();
    return new ArticlesPage(this.page);
  }

  async clickMainMenuLink(): Promise<HomePage> {
    await this.mainMenuLink.click();
    return new HomePage(this.page);
  }
}
