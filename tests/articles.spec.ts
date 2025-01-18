import { randomNewArticle } from '../src/factory/article.factory';
import { AddArticleModel } from '../src/models/article.model';
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
  let articleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await loginPage.goTo();
    await loginPage.login(testUser1);
    await articlesPage.goTo();
    await articlesPage.addArticleButtonLogged.click();

    articleData = randomNewArticle();
  });
  test(
    'add new article with required data',
    {
      tag: ['@GAD-R04-02', '@smoke'],
    },
    async ({ page }) => {
      //Arrange
      const articlePage = new ArticlePage(page);

      //Act
      await expect.soft(addArticleView.articleViewHeader).toBeVisible();
      await addArticleView.createArticle(articleData);

      //Assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
      await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
    },
  );

  test(
    'add new article with no body',
    {
      tag: ['@GAD-R04-02', '@smoke'],
    },
    async () => {
      //Arrange
      const expectErrorMessage = 'Article was not created';
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

      articleData.title = '';

      await expect.soft(addArticleView.articleViewHeader).toBeVisible();

      //Act
      await addArticleView.createArticle(articleData);

      //Assert
      await expect(addArticleView.errorPopup).toHaveText(expectErrorMessage);
    },
  );
});
