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

      await homePage.goTo();

      const title = await homePage.title();
      expect(title).toContain('GAD');
    },
  );

  test(
    'Articles page title',
    {
      tag: ['@GAD-R01-02', '@smoke'],
    },
    async ({ page }) => {
      const articles = new ArticlesPage(page);

      await articles.goTo();

      const title = await articles.title();
      expect(title).toContain('Articles');
    },
  );

  test(
    'Comments page title',
    {
      tag: ['@GAD-R01-03', '@smoke'],
    },
    async ({ page }) => {
      const comments = new CommentsPage(page);

      await comments.goTo();

      const title = await comments.title();
      expect(title).toContain('Comments');
    },
  );
});
