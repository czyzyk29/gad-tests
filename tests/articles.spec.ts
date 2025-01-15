import { randomNewArticle } from '../src/factory/article.factory';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user-date';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('verify tests', () => {
  test(
    'add new article with required data',
    {
      tag: ['@GAD-R04-02', '@smoke'],
    },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goTo();
      await loginPage.login(testUser1);

      const articlesPage = new ArticlesPage(page);
      await articlesPage.goTo();

      await articlesPage.addArticleButtonLogged.click();

      const addArticleView = new AddArticleView(page);
      await expect.soft(addArticleView.articleViewHeader).toBeVisible();
      const articleData = randomNewArticle();

      await addArticleView.createArticle(articleData);

      const articlePage = new ArticlePage(page);
      await expect(articlePage.articleTitle).toHaveText(articleData.title);
      await expect(articlePage.articleBody).toHaveText(articleData.body);
    },
  );

  test(
    'add new article with no body',
    {
      tag: ['@GAD-R04-02', '@smoke'],
    },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goTo();
      await loginPage.login(testUser1);

      const articlesPage = new ArticlesPage(page);
      await articlesPage.goTo();

      await articlesPage.addArticleButtonLogged.click();

      const addArticleView = new AddArticleView(page);
      await expect.soft(addArticleView.articleViewHeader).toBeVisible();

      const articleData = randomNewArticle();

      articleData.body = '';
      await addArticleView.createArticle(articleData);

      await expect(addArticleView.errorPopup).toHaveText(
        'Article was not created',
      );
    },
  );

  test(
    'add new article with no title',
    {
      tag: ['@GAD-R04-02', '@smoke'],
    },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goTo();
      await loginPage.login(testUser1);

      const articlesPage = new ArticlesPage(page);
      await articlesPage.goTo();

      await articlesPage.addArticleButtonLogged.click();

      const addArticleView = new AddArticleView(page);
      await expect.soft(addArticleView.articleViewHeader).toBeVisible();

      const articleData = randomNewArticle();

      articleData.title = '';
      await addArticleView.createArticle(articleData);

      await expect(addArticleView.errorPopup).toHaveText(
        'Article was not created',
      );
    },
  );
});
