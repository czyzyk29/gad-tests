import { prepareRandomArticle } from '@_src/factory/article.factory';
import { prepareRandomComment } from '@_src/factory/comment.factory';
import { AddArticleModel } from '@_src/models/article.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { AddArticleView } from '@_src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('create, verify and delete comment', () => {
  let articlesPage: ArticlesPage;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addArticleView: AddArticleView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    articleData = prepareRandomArticle();

    await articlesPage.goTo();
    addArticleView = await articlesPage.clickAddArticleButtonLogged();
    articlePage = await addArticleView.createArticle(articleData);
  });
  test(
    'Operation on comments @logged',
    {
      tag: ['@GAD-R06-02', '@smoke'],
    },
    async () => {
      //Arrange
      const expectedCommentAddPopupSuccess = 'Comment was created';
      const newCommentData = prepareRandomComment();

      await test.step('create comment', async () => {
        //Act
        const addCommentView = await articlePage.clickAddCommentButton();

        await expect.soft(addCommentView.addCommentViewHeader).toBeVisible();

        await addCommentView.addComment(newCommentData);

        //Assert
        await expect
          .soft(articlePage.errorPopup)
          .toHaveText(expectedCommentAddPopupSuccess);
      });

      const commentPage = await test.step('verify comment', async () => {
        //Arrange
        const articleComment = articlePage.getArticleComment(
          newCommentData.body,
        );
        //Act
        await expect(articleComment.body).toHaveText(newCommentData.body);

        const commentPage = await articlePage.clickCommentLink(
          articleComment.link,
        );
        //Assert
        await expect(commentPage.commentBody).toHaveText(newCommentData.body);

        return commentPage;
      });

      await test.step('edit comment', async () => {
        //Arrange
        const editCommentData = prepareRandomComment();
        const expectedCommentEditPopupSuccess = 'Comment was updated';

        //Act
        // await commentPage.editButton.click();
        const editCommentView = await commentPage.clickEditButton();
        await editCommentView.updateComment(editCommentData);
        //Assert
        await expect(commentPage.commentBody).toHaveText(editCommentData.body);
        await expect(commentPage.errorPopup).toHaveText(
          expectedCommentEditPopupSuccess,
        );

        const articlePage = await commentPage.clickReturnLink();

        const articleCommentUpdated = articlePage.getArticleComment(
          editCommentData.body,
        );

        await expect(articleCommentUpdated.body).toHaveText(
          editCommentData.body,
        );
      });
    },
  );
  test(
    'Add can ad more than one comment on comments to article @logged',
    {
      tag: ['@GAD-R06-02', '@smoke'],
    },
    async () => {
      const newCommentData = prepareRandomComment();

      await test.step('create first comment', async () => {
        //Act
        const addCommentView = await articlePage.clickAddCommentButton();
        await addCommentView.addComment(newCommentData);

        //Assert
      });

      await test.step('create and verify second comment', async () => {
        // Arrange
        const secondCommentBody =
          await test.step('create second comment', async () => {
            //Arrange
            const secondCommentData = prepareRandomComment();

            // Act
            const addCommentView = await articlePage.clickAddCommentButton();
            await addCommentView.addComment(secondCommentData);
            return secondCommentData.body;
          });
        await test.step('verify second comment', async () => {
          // Assert
          const articleComment =
            articlePage.getArticleComment(secondCommentBody);
          await expect(articleComment.body).toHaveText(secondCommentBody);

          const commentPage = await articlePage.clickCommentLink(
            articleComment.link,
          );
          await expect(commentPage.commentBody).toHaveText(secondCommentBody);
        });
      });
    },
  );
});
