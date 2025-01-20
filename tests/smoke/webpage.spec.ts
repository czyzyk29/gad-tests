import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify main pages', () => {
  test(
    'Home page title simple',
    {
      tag: ['@GAD-R01-01', '@smoke'],
    },
    async ({ page }) => {
      const homePage = new HomePage(page);
      const expectHomePageTitle = 'GAD';

      await homePage.goTo();

      const title = await homePage.getTitle();
      expect(title).toContain(expectHomePageTitle);
    },
  );

  test(
    'Articles page title',
    {
      tag: ['@GAD-R01-02', '@smoke'],
    },
    async ({ page }) => {
      const articles = new ArticlesPage(page);
      const expectArticlesPageTitle = 'Articles';

      await articles.goTo();

      const title = await articles.getTitle();
      expect(title).toContain(expectArticlesPageTitle);
    },
  );

  test(
    'Comments page title',
    {
      tag: ['@GAD-R01-03', '@smoke'],
    },
    async ({ page }) => {
      const comments = new CommentsPage(page);
      const expectCommentsPageTitle = 'Comments';

      await comments.goTo();

      const title = await comments.getTitle();
      expect(title).toContain(expectCommentsPageTitle);
    },
  );
});
