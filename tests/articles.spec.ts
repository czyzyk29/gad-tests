import { randomNewArticle } from '../src/factory/article.factory';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user-date';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('verify tests', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await loginPage.goTo();
    await loginPage.login(testUser1);
    await articlesPage.goTo();
    await articlesPage.addArticleButtonLogged.click();
  });

  test(
    'add new article with no body',
    {
      tag: ['@GAD-R04-02', '@smoke'],
    },
    async () => {
      //Arrange
      const expectErrorMessage = 'Article was not created';
      const articleData = randomNewArticle();
      articleData.body = '';

      await expect.soft(addArticleView.articleViewHeader).toBeVisible();

      //Act
      await addArticleView.createArticle(articleData);

      //Assert
      await expect(addArticleView.errorPopup).toHaveText(expectErrorMessage);
    },
  );

  test(
    'add new article with no title',
    {
      tag: ['@GAD-R04-02', '@smoke'],
    },
    async () => {
      //Arrange
      const expectErrorMessage = 'Article was not created';
      const articleData = randomNewArticle();
      articleData.title = '';

      await expect.soft(addArticleView.articleViewHeader).toBeVisible();

      //Act
      await addArticleView.createArticle(articleData);

      //Assert
      await expect(addArticleView.errorPopup).toHaveText(expectErrorMessage);
    },
  );

  test.describe('title lenght', () => {
    test(
      'add new article reject title more than 128',
      {
        tag: ['@GAD-R04-02', '@smoke'],
      },
      async () => {
        //Arrange
        const expectErrorMessage = 'Article was not created';
        const articleData = randomNewArticle(129);

        await expect.soft(addArticleView.articleViewHeader).toBeVisible();

        //Act
        await addArticleView.createArticle(articleData);

        //Assert
        await expect(addArticleView.errorPopup).toHaveText(expectErrorMessage);
      },
    );

    test(
      'add new article succes title = 128',
      {
        tag: ['@GAD-R04-02', '@smoke'],
      },
      async ({ page }) => {
        //Arrange
        const articlePage = new ArticlePage(page);
        const articleData = randomNewArticle(128);

        await expect.soft(addArticleView.articleViewHeader).toBeVisible();

        //Act
        await addArticleView.createArticle(articleData);

        //Assert
        await expect
          .soft(articlePage.articleTitle)
          .toHaveText(articleData.title);
      },
    );
  });
});
