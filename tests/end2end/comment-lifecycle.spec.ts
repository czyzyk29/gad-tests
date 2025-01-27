import { prepareRandomArticle } from '../../src/factory/article.factory';
import { prepareRandomComment } from '../../src/factory/comment.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user-date';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { expect, test } from '@playwright/test';

test.describe('create, verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addArticleView: AddArticleView;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    articlePage = new ArticlePage(page);
    addArticleView = new AddArticleView(page);
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    articleData = prepareRandomArticle();

    await loginPage.goTo();
    await loginPage.login(testUser1);
    await articlesPage.goTo();
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);
  });
  test(
    'create new comment with required data',
    {
      tag: ['@GAD-R06-02', '@smoke'],
    },
    async () => {
      //Arrange
      const expectedCommentPopupSuccess = 'Comment was created';
      const newCommentData = prepareRandomComment();
      //Act
      await articlePage.addCommentButton.click();
      await expect.soft(addCommentView.addCommentViewHeader).toBeVisible();

      await addCommentView.commentInput.fill(newCommentData.body);
      await addCommentView.saveButton.click();

      //Assert
      await expect
        .soft(articlePage.errorPopup)
        .toHaveText(expectedCommentPopupSuccess);

      //verify comment
      const articleComment = articlePage.getArticleComment(newCommentData.body);
      await expect(articleComment.body).toHaveText(newCommentData.body);
      await articleComment.link.click();

      await expect(commentPage.commentBody).toHaveText(newCommentData.body);
    },
  );
});
