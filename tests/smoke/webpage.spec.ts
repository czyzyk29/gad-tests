import { expect, test } from '@_src/fixtures/merge-fixtures';

test.describe('Verify main pages', () => {
  test(
    'Home page title simple',
    {
      tag: ['@GAD-R01-01', '@smoke'],
    },
    async ({ homePage }) => {
      const expectHomePageTitle = 'GAD';

      const title = await homePage.getTitle();
      expect(title).toContain(expectHomePageTitle);
    },
  );

  test(
    'Articles page title',
    {
      tag: ['@GAD-R01-02', '@smoke'],
    },
    async ({ articlesPage }) => {
      const expectArticlesPageTitle = 'Articles';

      const title = await articlesPage.getTitle();
      expect(title).toContain(expectArticlesPageTitle);
    },
  );

  test(
    'Comments page title',
    {
      tag: ['@GAD-R01-03', '@smoke'],
    },
    async ({ commentsPage }) => {
      const expectCommentsPageTitle = 'Comments';

      const title = await commentsPage.getTitle();
      expect(title).toContain(expectCommentsPageTitle);
    },
  );
});
