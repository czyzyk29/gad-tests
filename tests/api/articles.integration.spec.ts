import { prepareRandomArticle } from '@_src/factory/article.factory';
import { expect, test } from '@_src/fixtures/merge-fixtures';
import { testUser1 } from '@_src/test-data/user-date';

test.describe('Verify articles CRUD operations @api', () => {
  test('should not create an article without a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const expectedResponseCode = 401;
    const articlesUrl = '/api/articles';

    const randomArticle = prepareRandomArticle();
    const articleData = {
      title: randomArticle.title,
      body: randomArticle.body,
      date: '2025-04-01T13:45:44.091Z',
      image: 'string',
    };

    const response = await request.post(articlesUrl, {
      data: articleData,
    });

    expect(response.status()).toBe(expectedResponseCode);
  });

  test('should not create an article with a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const expectedResponseCode = 201;
    const articlesUrl = '/api/articles';

    //login

    const loginUrl = '/api/login';

    const userData = {
      email: testUser1.userEmail,
      password: testUser1.userPassword,
    };

    const responseLogin = await request.post(loginUrl, {
      data: userData,
    });

    const responseLoginJson = await responseLogin.json();

    const headers = {
      Authorization: `Bearer ${responseLoginJson.access_token}`,
    };

    const randomArticle = prepareRandomArticle();
    const articleData = {
      title: randomArticle.title,
      body: randomArticle.body,
      date: '2025-04-02T10:45:44.091Z',
      image: '.\\data\\images\\256\\subtle-cinematics-BulYN_Vs_dw-unsplash.jpg',
    };

    const responseArticle = await request.post(articlesUrl, {
      headers: headers,
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
