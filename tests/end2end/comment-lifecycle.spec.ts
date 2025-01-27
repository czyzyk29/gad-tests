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
import { EditCommentView } from '../../src/views/edit-comment.view';
import { expect, test } from '@playwright/test';

test.describe('create, verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addArticleView: AddArticleView;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;
  let editCommentView: EditCommentView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    articlePage = new ArticlePage(page);
    addArticleView = new AddArticleView(page);
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    editCommentView = new EditCommentView(page);
    articleData = prepareRandomArticle();

    await loginPage.goTo();
    await loginPage.login(testUser1);
    await articlesPage.goTo();
    await articlesPage.addArticleButtonLogged.click();
    await addArticleView.createArticle(articleData);
  });
  test(
    'Operation on comments',
    {
      tag: ['@GAD-R06-02', '@smoke'],
    },
    async () => {
      //Arrange
      const expectedCommentAddPopupSuccess = 'Comment was created';
      const newCommentData = prepareRandomComment();

      await test.step('create comment', async () => {
        //Act
        await articlePage.addCommentButton.click();
        await expect.soft(addCommentView.addCommentViewHeader).toBeVisible();

        await addCommentView.addComment(newCommentData);

        //Assert
        await expect
          .soft(articlePage.errorPopup)
          .toHaveText(expectedCommentAddPopupSuccess);
      });

      await test.step('verify comment', async () => {
        //Arrange
        const articleComment = articlePage.getArticleComment(
          newCommentData.body,
        );
        //Act
        await expect(articleComment.body).toHaveText(newCommentData.body);
        await articleComment.link.click();
        //Assert
        await expect(commentPage.commentBody).toHaveText(newCommentData.body);
      });

      await test.step('edit comment', async () => {
        //Arrange
        const editCommentData = prepareRandomComment();
        const expectedCommentEditPopupSuccess = 'Comment was updated';

        //Act
        await commentPage.editButton.click();
        await editCommentView.updateComment(editCommentData);
        //Assert
        await expect(commentPage.commentBody).toHaveText(editCommentData.body);
        await expect(commentPage.errorPopup).toHaveText(
          expectedCommentEditPopupSuccess,
        );

        await commentPage.returnLink.click();

        const articleCommentUpdated = articlePage.getArticleComment(
          editCommentData.body,
        );

        await expect(articleCommentUpdated.body).toHaveText(
          editCommentData.body,
        );
      });
    },
  );
});
