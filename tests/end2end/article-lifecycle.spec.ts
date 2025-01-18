import { randomNewArticle } from '../../src/factory/article.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user-date';
import { AddArticleView } from '../../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('verify articles', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    articlePage = new ArticlePage(page);

    await loginPage.goTo();
    await loginPage.login(testUser1);
    await articlesPage.goTo();
  });
  test(
    'add new article with required data',
    {
      tag: ['@GAD-R04-02', '@smoke'],
    },
    async ({ page }) => {
      //Arrange
      const addArticleView = new AddArticleView(page);
      articleData = randomNewArticle();

      //Act
      await articlesPage.addArticleButtonLogged.click();
      await expect.soft(addArticleView.articleViewHeader).toBeVisible();
      await addArticleView.createArticle(articleData);

      //Assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
      await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
    },
  );

  test(
    'user can access to single article',
    {
      tag: ['@GAD-R04-03'],
    },
    async () => {
      //Act
      await articlesPage.goToArticles(articleData.title);

      //Assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
      await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
    },
  );
});
