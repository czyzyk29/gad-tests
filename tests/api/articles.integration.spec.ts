import { expect, test } from '@_src/fixtures/merge-fixtures';
import {
  ArticlePayload,
  Headers,
  apiLinks,
  generateArticlePayload,
  getAuthorizationHeader,
} from '@_src/utils/api.util';
import { APIResponse } from '@playwright/test';

test.describe('Verify articles CRUD operations @crud', () => {
  test('should not create an article without a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const expectedResponseCode = 401;

    const articleData = generateArticlePayload();

    const response = await request.post(apiLinks.articlesUrl, {
      data: articleData,
    });

    expect(response.status()).toBe(expectedResponseCode);
  });

  test.describe('Verify articles CRUD operations @crud', () => {
    let responseArticle: APIResponse;
    let headers: Headers;
    let articleData: ArticlePayload;

    test.beforeAll('should login', async ({ request }) => {
      headers = await getAuthorizationHeader(request);
    });

    test.beforeEach('create an article', async ({ request }) => {
      // Arrange

      articleData = generateArticlePayload();

      responseArticle = await request.post(apiLinks.articlesUrl, {
        headers,
        data: articleData,
      });
      const articleJson = await responseArticle.json();

      await expect(async () => {
        const articleId = articleJson.id;
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
    });

    test('should create an article with a logged-in user @smoke', async () => {
      // Arrange
      const expectedResponseCode = 201;

      const actualResponseStatus = responseArticle.status();
      expect(
        actualResponseStatus,
        `status code expected ${expectedResponseCode} but received ${actualResponseStatus}`,
      ).toBe(expectedResponseCode);

      const articleJson = await responseArticle.json();

      expect.soft(articleJson.title).toEqual(articleData.title);
      expect.soft(articleJson.body).toEqual(articleData.body);
    });

    test.describe('Verify articles CRUD operations @crud', () => {
      test('should delete an article with a logged-in user @smoke', async ({
        request,
      }) => {
        // Arrange
        const expectedResponseCode = 200;

        const responseArticleJson = await responseArticle.json();
        const articleId = responseArticleJson.id;

        const responseArticleDelete = await request.delete(
          `${apiLinks.articlesUrl}/${articleId}`,
          {
            headers,
          },
        );

        const actualResponseStatus = responseArticleDelete.status();
        expect(
          actualResponseStatus,
          `status code expected ${expectedResponseCode} but received ${actualResponseStatus}`,
        ).toBe(expectedResponseCode);

        const actualResponseGet = await request.get(
          `${apiLinks.articlesUrl}/${articleId}`,
        );
        const expectedDeletedArticleStatusCode = 404;
        expect(
          actualResponseGet.status(),
          `status code expected ${expectedDeletedArticleStatusCode} but received ${actualResponseGet.status()}`,
        ).toBe(expectedDeletedArticleStatusCode);
      });

      test('should not delete an article with a no-logged-in user @smoke', async ({
        request,
      }) => {
        // Arrange
        const expectedResponseCode = 401;

        //login
        const responseArticleJson = await responseArticle.json();
        const articleId = responseArticleJson.id;
        const responseArticleDelete = await request.delete(
          `${apiLinks.articlesUrl}/${articleId}`,
        );

        const actualResponseStatus = responseArticleDelete.status();
        expect(
          actualResponseStatus,
          `status code expected ${expectedResponseCode} but received ${actualResponseStatus}`,
        ).toBe(expectedResponseCode);
      });
    });
  });
});
