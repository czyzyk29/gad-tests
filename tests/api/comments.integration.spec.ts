import { expect, test } from '@_src/fixtures/merge-fixtures';
import {
  apiLinks,
  generateArticlePayload,
  generateCommentPayload,
  getAuthorizationHeader,
} from '@_src/utils/api.util';

test.describe('Verify articles CRUD operations @crud', () => {
  let articleId: number;
  let headers: { [key: string]: string };

  test.beforeAll(
    'should not create an commnets with a logged-in user',
    async ({ request }) => {
      headers = await getAuthorizationHeader(request);

      const articleData = generateArticlePayload();

      const responseArticle = await request.post(apiLinks.articlesUrl, {
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

    const commentsData = generateCommentPayload(articleId);

    const response = await request.post(apiLinks.commentsUrl, {
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

    const commentsData = generateCommentPayload(articleId);

    const responseComments = await request.post(apiLinks.commentsUrl, {
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
