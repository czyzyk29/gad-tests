import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify main menu buttons', () => {
  test(
    'Comments buttons navigate to comments page',
    {
      tag: ['@GAD-R01-03', '@smoke'],
    },
    async ({ page }) => {
      const articlesPage = new ArticlesPage(page);
      const commentsPage = new CommentsPage(page);

      await articlesPage.goTo();
      await articlesPage.mainMenu.commentsButton.click();
      const title = await commentsPage.title();

      expect(title).toContain('Comments');
    },
  );

  test(
    'Article buttons navigate to article page',
    {
      tag: ['@GAD-R01-03', '@smoke'],
    },
    async ({ page }) => {
      const articlesPage = new ArticlesPage(page);
      const commentsPage = new CommentsPage(page);

      await commentsPage.goTo();
      await commentsPage.mainMenu.articlesButton.click();

      const title = await articlesPage.title();
      expect(title).toContain('Articles');
    },
  );

  test(
    'Home menu link navigate to main page',
    {
      tag: ['@GAD-R01-03', '@smoke'],
    },
    async ({ page }) => {
      const articlesPage = new ArticlesPage(page);

      await articlesPage.goTo();
      await articlesPage.mainMenu.mainMenuLink.click();
      const homePage = new HomePage(page);

      const title = await homePage.title();
      expect(title).toContain('GAD');
    },
  );
});
