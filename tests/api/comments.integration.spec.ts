import { expect, test } from '@_src/fixtures/merge-fixtures';
import {
  CommentPayload,
  Headers,
  apiLinks,
  generateArticlePayload,
  generateCommentPayload,
  getAuthorizationHeader,
} from '@_src/utils/api.util';
import { APIResponse } from '@playwright/test';

test.describe('Verify articles CRUD operations @crud', () => {
  let articleId: number;
  let headers: Headers;

  test.beforeAll(
    'should not create a comment with a logged-in user',
    async ({ request }) => {
      headers = await getAuthorizationHeader(request);

      const articleData = generateArticlePayload();

      const responseArticle = await request.post(apiLinks.articlesUrl, {
        headers,
        data: articleData,
      });

      const responseArticleJson = await responseArticle.json();

      articleId = responseArticleJson.id;

      await expect(async () => {
        const responseArticleCreated = await request.get(
          `${apiLinks.articlesUrl}/${articleId}`,
          {
            headers,
          },
        );

        expect(
          responseArticleCreated.status(),
          `Expect to 200 to be ${responseArticleCreated.status()}`,
        ).toBe(200);
      }).toPass({ timeout: 2_000 });
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

  test.describe('Verify articles CRUD operations @crud', () => {
    let responseComments: APIResponse;
    let commentsData: CommentPayload;

    test.beforeEach('create an comment', async ({ request }) => {
      // Arrange
      commentsData = generateCommentPayload(articleId);
      responseComments = await request.post(apiLinks.commentsUrl, {
        headers: headers,
        data: commentsData,
      });

      const commentsJson = await responseComments.json();
      await expect(async () => {
        const commentId = commentsJson.id;
        const responseCommentsCreated = await request.get(
          `${apiLinks.commentsUrl}/${commentId}`,
          {
            headers,
          },
        );

        expect(
          responseCommentsCreated.status(),
          `Expect to 200 to be ${responseCommentsCreated.status()}`,
        ).toBe(200);
      }).toPass({ timeout: 2_000 });
    });

    test('should create a comment with a logged-in user', async () => {
      // Arrange
      const expectedResponseCode = 201;

      const actualResponseStatus = responseComments.status();
      expect(
        actualResponseStatus,
        `expected status code  ${expectedResponseCode} and received ${actualResponseStatus}`,
      ).toBe(expectedResponseCode);

      const commentsJson = await responseComments.json();

      expect.soft(commentsJson.body).toEqual(commentsData.body);
    });

    test('should delete an comment with a logged-in user', async ({
      request,
    }) => {
      // Arrange
      const expectedResponseCode = 200;
      const commentsJson = await responseComments.json();
      const commentId = commentsJson.id;
      const responseCommentsDeleted = await request.delete(
        `${apiLinks.commentsUrl}/${commentId}`,
        {
          headers: headers,
        },
      );

      const actualResponseStatus = responseCommentsDeleted.status();
      expect(
        actualResponseStatus,
        `expected status code  ${expectedResponseCode} and received ${actualResponseStatus}`,
      ).toBe(expectedResponseCode);

      const actualResponseGet = await request.get(
        `${apiLinks.commentsUrl}/${commentId}`,
        {
          headers: headers,
        },
      );

      const expectedDeletedCommentStatusCode = 404;
      expect(
        actualResponseGet.status(),
        `status code expected ${expectedDeletedCommentStatusCode} but received ${actualResponseGet.status()}`,
      ).toBe(expectedDeletedCommentStatusCode);
    });

    test('should not delete a comment with a non logged-in user', async ({
      request,
    }) => {
      // Arrange
      const expectedResponseCode = 401;
      const commentsJson = await responseComments.json();
      const commentId = commentsJson.id;
      const responseCommentsDeleted = await request.delete(
        `${apiLinks.commentsUrl}/${commentId}`,
        {},
      );

      const actualResponseStatus = responseCommentsDeleted.status();
      expect(
        actualResponseStatus,
        `expected status code  ${expectedResponseCode} and received ${actualResponseStatus}`,
      ).toBe(expectedResponseCode);
    });
  });
});
