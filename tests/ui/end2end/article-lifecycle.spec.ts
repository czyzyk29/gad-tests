import { prepareRandomArticle } from '@_src/factory/article.factory';
import { AddArticleModel } from '@_src/models/article.model';
import { ArticlesPage } from '@_src/pages/articles.page';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('create, verify and delete article', () => {
  let articlesPage: ArticlesPage;
  let articleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);

    await articlesPage.goTo();
  });
  test(
    'create new article with required data @logged',
    {
      tag: ['@GAD-R04-02', '@smoke'],
    },
    async () => {
      //Arrange
      articleData = prepareRandomArticle();

      //Act
      const addArticleView = await articlesPage.clickAddArticleButtonLogged();
      await expect.soft(addArticleView.articleViewHeader).toBeVisible();
      const articlePage = await addArticleView.createArticle(articleData);

      //Assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
      await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
    },
  );

  test(
    'access to single article @logged',
    {
      tag: ['@GAD-R04-03'],
    },
    async () => {
      //Act
      const articlePage = await articlesPage.goToArticles(articleData.title);

      //Assert
      await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
      await expect.soft(articlePage.articleBody).toHaveText(articleData.body);
    },
  );

  test(
    'delete own single article @logged',
    {
      tag: ['@GAD-R04-04'],
    },
    async () => {
      //Arrange
      const noResultsTxt = 'No data';
      const expectedTitleArticles = 'Articles';
      const articlePage = await articlesPage.goToArticles(articleData.title);

      //Act
      articlesPage = await articlePage.deleteArticle();

      //Assert
      await articlesPage.waitForPageLoginUrl();
      const title = await articlesPage.getTitle();
      expect(title).toContain(expectedTitleArticles);

      articlesPage = await articlesPage.searchArticle(articleData.title);
      await expect(articlesPage.noResults).toHaveText(noResultsTxt);
    },
  );
});
