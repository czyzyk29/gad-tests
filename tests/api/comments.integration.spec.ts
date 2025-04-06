import { prepareRandomArticle } from '@_src/factory/article.factory';
import { prepareRandomComment } from '@_src/factory/comment.factory';
import { expect, test } from '@_src/fixtures/merge-fixtures';
import { getAuthorizationHeader } from '@_src/utils/api.util';

test.describe('Verify articles CRUD operations @crud', () => {
  let articleId: number;
  let headers: { [key: string]: string };

  test.beforeAll(
    'should not create an commnets with a logged-in user',
    async ({ request }) => {
      headers = await getAuthorizationHeader(request);

      //Article
      const randomArticle = prepareRandomArticle();
      const articleData = {
        title: randomArticle.title,
        body: randomArticle.body,
        date: '2025-04-02T10:45:44.091Z',
        image:
          '.\\data\\images\\256\\subtle-cinematics-BulYN_Vs_dw-unsplash.jpg',
      };
      const articlesUrl = '/api/articles';
      const responseArticle = await request.post(articlesUrl, {
        headers,
        data: articleData,
      });

      const reponseArticleJson = await responseArticle.json();

      await new Promise((resolve) => setTimeout(resolve, 5000));

      articleId = reponseArticleJson.id;
    },
  );

  test('should not create an comment without a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const expectedResponseCode = 401;
    const commentsUrl = '/api/comments';

    const randomComment = prepareRandomComment();
    const commentsData = {
      article_id: articleId,
      body: randomComment.body,
      date: '2025-04-02T12:41:19+02:00',
    };

    const response = await request.post(commentsUrl, {
      data: commentsData,
    });

    expect(response.status()).toBe(expectedResponseCode);
  });

  test('should not create an commnets with a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const expectedResponseCode = 201;

    //Comments
    const commentsUrl = '/api/comments';
    const randomComments = prepareRandomComment();
    const commentsData = {
      article_id: articleId,
      body: randomComments.body,
      date: '2025-04-02T10:45:44.091Z',
    };

    const responseComments = await request.post(commentsUrl, {
      headers: headers,
      data: commentsData,
    });

    const actualResponseStatus = responseComments.status();
    expect(
      actualResponseStatus,
      `expected status code  ${expectedResponseCode} and recived ${actualResponseStatus}`,
    ).toBe(expectedResponseCode);

    const comments = await responseComments.json();

    expect.soft(comments.body).toEqual(commentsData.body);
  });
});
