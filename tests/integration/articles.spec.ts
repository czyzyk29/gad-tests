import { prepareRandomArticle } from '@_src/factory/article.factory';
import { ArticlesPage } from '@_src/pages/articles.page';
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
    async () => {
      //Arrange
      const expectErrorMessage = 'Article was not created';
      const articleData = prepareRandomArticle();
      articleData.body = '';

      await expect.soft(addArticleView.articleViewHeader).toBeVisible();

      //Act
      await addArticleView.createArticle(articleData);

      //Assert
      await expect(addArticleView.errorPopup).toHaveText(expectErrorMessage);
    },
  );

  test(
    'add new article with no title as @logged',
    {
      tag: ['@GAD-R04-02', '@smoke'],
    },
    async () => {
      //Arrange
      const expectErrorMessage = 'Article was not created';
      const articleData = prepareRandomArticle();
      articleData.title = '';

      await expect.soft(addArticleView.articleViewHeader).toBeVisible();

      //Act
      await addArticleView.createArticle(articleData);

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
      async () => {
        //Arrange
        const expectErrorMessage = 'Article was not created';
        const articleData = prepareRandomArticle(129);

        await expect.soft(addArticleView.articleViewHeader).toBeVisible();

        //Act
        await addArticleView.createArticle(articleData);

        //Assert
        await expect(addArticleView.errorPopup).toHaveText(expectErrorMessage);
      },
    );

    test(
      'add new article success title = 128 as @logged',
      {
        tag: ['@GAD-R04-02', '@smoke'],
      },
      async () => {
        //Arrange
        const articleData = prepareRandomArticle(128);

        await expect.soft(addArticleView.articleViewHeader).toBeVisible();

        //Act
        const articlePage = await addArticleView.createArticle(articleData);

        //Assert
        await expect
          .soft(articlePage.articleTitle)
          .toHaveText(articleData.title);
      },
    );
  });
});
