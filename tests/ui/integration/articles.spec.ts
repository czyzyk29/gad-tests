import { prepareRandomArticle } from '@_src/factory/article.factory';
import { ArticlesPage } from '@_src/pages/articles.page';
import { waitForResponse } from '@_src/utils/wait.util';
import { AddArticleView } from '@_src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('verify tests', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);

    // await loginPage.goTo();
    // await loginPage.login(testUser1);

    // const sessionData = JSON.parse(fs.readFileSync('session.json', 'utf-8'));
    // await page.context().addCookies(sessionData.cookies);
    // await page.context().storageState(sessionData.localStorage);
    await articlesPage.goTo();
    addArticleView = await articlesPage.clickAddArticleButtonLogged();
  });

  test(
    'add new article with no body as @logged',
    {
      tag: ['@GAD-R04-02', '@smoke'],
    },
    async ({ page }) => {
      //Arrange
      const expectErrorMessage = 'Article was not created';
      const articleData = prepareRandomArticle();
      const expectResponseCode = 422;
      articleData.body = '';

      await expect.soft(addArticleView.articleViewHeader).toBeVisible();

      const responsePromise = waitForResponse(page, '/api/articles');

      //Act
      await addArticleView.createArticle(articleData);
      const response = await responsePromise;

      expect(response.status()).toBe(expectResponseCode);
      //Assert
      await expect(addArticleView.errorPopup).toHaveText(expectErrorMessage);
    },
  );

  test(
    'add new article with no title as @logged',
    {
      tag: ['@GAD-R04-02', '@smoke'],
    },
    async ({ page }) => {
      //Arrange
      const expectErrorMessage = 'Article was not created';
      const articleData = prepareRandomArticle();
      const expectResponseCode = 422;
      articleData.title = '';

      await expect.soft(addArticleView.articleViewHeader).toBeVisible();

      const responsePromise = waitForResponse(page, '/api/articles');

      //Act
      await addArticleView.createArticle(articleData);
      const response = await responsePromise;

      expect(response.status()).toBe(expectResponseCode);
      //Assert
      await expect(addArticleView.errorPopup).toHaveText(expectErrorMessage);
    },
  );

  test.describe('title length', () => {
    test(
      'add new article reject title more than 128 as @logged',
      {
        tag: ['@GAD-R04-02', '@smoke'],
      },
      async ({ page }) => {
        //Arrange
        const expectErrorMessage = 'Article was not created';
        const articleData = prepareRandomArticle(129);
        const expectResponseCode = 422;

        await expect.soft(addArticleView.articleViewHeader).toBeVisible();
        const responsePromise = waitForResponse(page, '/api/articles');
        //Act
        await addArticleView.createArticle(articleData);
        const response = await responsePromise;

        expect(response.status()).toBe(expectResponseCode);
        //Assert
        await expect(addArticleView.errorPopup).toHaveText(expectErrorMessage);
      },
    );

    test(
      'add new article success title = 128 as @logged',
      {
        tag: ['@GAD-R04-02', '@smoke'],
      },
      async ({ page }) => {
        //Arrange
        const articleData = prepareRandomArticle(128);
        const expectResponseCode = 201;
        await expect.soft(addArticleView.articleViewHeader).toBeVisible();
        const responsePromise = waitForResponse(page, '/api/articles');
        //Act
        const articlePage = await addArticleView.createArticle(articleData);
        const response = await responsePromise;

        expect(response.status()).toBe(expectResponseCode);
        //Assert
        await expect
          .soft(articlePage.articleTitle)
          .toHaveText(articleData.title);
      },
    );
  });
});
