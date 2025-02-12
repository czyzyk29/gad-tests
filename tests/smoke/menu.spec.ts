import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { test as baseTest, expect } from '@playwright/test';

interface Pages {
  articlesPage: ArticlesPage;
  commentsPage: CommentsPage;
}

const test = baseTest.extend<Pages>({
  articlesPage: async ({ page }, use) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goTo();
    await use(articlesPage);
  },
  commentsPage: async ({ page }, use) => {
    const commentsPage = new CommentsPage(page);
    await commentsPage.goTo();
    await use(commentsPage);
  },
});

test.describe('Verify main menu buttons', () => {
  test(
    'Comments buttons navigate to comments page',
    {
      tag: ['@GAD-R01-03', '@smoke'],
    },
    async ({ articlesPage }) => {
      //Arrange
      //const articlesPage = new ArticlesPage(page);    //in fixtures

      //Act
      //await articlesPage.goTo();  //in fixtures
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
    async ({ commentsPage }) => {
      //Arrange
      //const commentsPage = new CommentsPage(page); //in fixtures

      //Act
      //await commentsPage.goTo(); //in fixtures
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
    async ({ articlesPage }) => {
      //Arrange
      //const articlesPage = new ArticlesPage(page); //in fixtures

      //Act
      //await articlesPage.goTo(); //in fixtures
      const homePage = await articlesPage.mainMenu.clickMainMenuLink();

      //Assert
      const title = await homePage.getTitle();
      expect(title).toContain('GAD');
    },
  );
});
