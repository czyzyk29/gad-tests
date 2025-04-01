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

    expect(responseLogin.body()).toBeGreaterThan(1);

    const loginJson = await responseLogin.json();

    await expect(loginJson.headers()).toHaveAttribute('Authorization');

    const headers = {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik1vc2VzLkFybXN0cm9uZ0BGZWVzdC5jYSIsImRhdGEiOiJUQkQiLCJpYXQiOjE3NDM1MTYwNDcsImV4cCI6MTc0MzUxOTY0N30.3HFOCbawvbTpaactUgSxfGLx7S9NuCfDy7Vf6CCfAJ0',
    };

    const randomArticle = prepareRandomArticle();
    const articleData = {
      title: randomArticle.title,
      body: randomArticle.body,
      date: '2025-04-01T13:45:44.091Z',
      image: 'string',
    };

    const response = await request.post(articlesUrl, {
      headers: headers,
      data: articleData,
    });

    expect(response.status()).toBe(expectedResponseCode);
  });
});
