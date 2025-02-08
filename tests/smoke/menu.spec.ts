import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { expect, test } from '@playwright/test';

test.describe('Verify main menu buttons', () => {
  test(
    'Comments buttons navigate to comments page',
    {
      tag: ['@GAD-R01-03', '@smoke'],
    },
    async ({ page }) => {
      //Arrange
      const articlesPage = new ArticlesPage(page);

      //Act
      await articlesPage.goTo();
      const commentsPage = await articlesPage.mainMenu.clickCommentButton();
      const title = await commentsPage.getTitle();

      //Assert
      expect(title).toContain('Comments');
    },
  );

  test(
    'Article buttons navigate to article page',
    {
      tag: ['@GAD-R01-03', '@smoke'],
    },
    async ({ page }) => {
      //Arrange
      const commentsPage = new CommentsPage(page);

      //Act
      await commentsPage.goTo();
      const articlesPage = await commentsPage.mainMenu.clickArticlesButton();

      //Assert
      const title = await articlesPage.getTitle();
      expect(title).toContain('Articles');
    },
  );

  test(
    'Home menu link navigate to main page',
    {
      tag: ['@GAD-R01-03', '@smoke'],
    },
    async ({ page }) => {
      //Arrange
      const articlesPage = new ArticlesPage(page);

      //Act
      await articlesPage.goTo();
      const homePage = await articlesPage.mainMenu.clickMainMenuLink();

      //Assert
      const title = await homePage.getTitle();
      expect(title).toContain('GAD');
    },
  );
});
