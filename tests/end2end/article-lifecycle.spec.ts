import { prepareRandomArticle } from '../../src/factory/article.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { AddArticleView } from '../../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('create, verify and delete article', () => {
  let articlesPage: ArticlesPage;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    articlePage = new ArticlePage(page);

    await articlesPage.goTo();
  });
  test(
    'create new article with required data @logged',
    {
      tag: ['@GAD-R04-02', '@smoke'],
    },
    async ({ page }) => {
      //Arrange
      const addArticleView = new AddArticleView(page);
      articleData = prepareRandomArticle();

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
    'access to single article @logged',
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

  test(
    'delete own single article @logged',
    {
      tag: ['@GAD-R04-04'],
    },
    async () => {
      //Arrange
      const noResultsTxt = 'No data';
      const expectedTitleArticles = 'Articles';
      await articlesPage.goToArticles(articleData.title);

      //Act
      await articlePage.deleteArticle();

      //Assert
      await articlesPage.waitForPageLoginUrl();
      const title = await articlesPage.getTitle();
      expect(title).toContain(expectedTitleArticles);

      await articlesPage.searchArticle(articleData.title);
      await expect(articlesPage.noResults).toHaveText(noResultsTxt);
    },
  );
});
