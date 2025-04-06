import { expect, test } from '@_src/fixtures/merge-fixtures';
import {
  generateArticlePayload,
  getAuthorizationHeader,
} from '@_src/utils/api.util';

test.describe('Verify articles CRUD operations @crud', () => {
  test('should not create an article without a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const expectedResponseCode = 401;
    const articlesUrl = '/api/articles';

    const articleData = generateArticlePayload();

    const response = await request.post(articlesUrl, {
      data: articleData,
    });

    expect(response.status()).toBe(expectedResponseCode);
  });

  test('should not create an article with a logged-in user @smoke', async ({
    request,
  }) => {
    // Arrange
    const expectedResponseCode = 201;
    const articlesUrl = '/api/articles';

    //login

    const headers = await getAuthorizationHeader(request);

    const articleData = generateArticlePayload();

    const responseArticle = await request.post(articlesUrl, {
      headers,
      data: articleData,
    });

    const actualResponseStatus = responseArticle.status();
    expect(
      actualResponseStatus,
      `status code expected ${expectedResponseCode} but recived ${actualResponseStatus}`,
    ).toBe(expectedResponseCode);

    const article = await responseArticle.json();

    expect.soft(article.title).toEqual(articleData.title);
    expect.soft(article.body).toEqual(articleData.body);
  });
});
