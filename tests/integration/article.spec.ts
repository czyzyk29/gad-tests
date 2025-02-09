import { ArticlePage } from '@_src/pages/article.page';
import { expect, test } from '@playwright/test';

test.describe('verify article', () => {
  test(
    'no logged user see article',
    {
      tag: ['@GAD-R06-01', '@predefined_data'],
    },
    async ({ page }) => {
      //Arrange
      const articleTitleExpect = 'How to write effective test cases';
      const articlePage = new ArticlePage(page);

      //Act
      await articlePage.goTo('?id=1');

      //Assert
      await expect(articlePage.articleTitle).toHaveText(articleTitleExpect);
    },
  );
});
