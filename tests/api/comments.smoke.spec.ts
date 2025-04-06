import { expect, test } from '@_src/fixtures/merge-fixtures';

test.describe('Verify comments API endpoint @GAD-R08-02 @smoke', () => {
  test.describe('verify each condition in separate test', () => {
    test('GET comments returns status code 200', async ({ request }) => {
      const expectedResponseCode = 200;

      const commentsUrl = '/api/comments';

      const response = await request.get(commentsUrl);

      expect(response.status()).toBe(expectedResponseCode);
    });
    test('GET comments should return at least one comment @predefined_data', async ({
      request,
    }) => {
      const expectedCommentMininumNumber = 1;
      const commentsUrl = '/api/comments';
      const response = await request.get(commentsUrl);
      const resposeJson = await response.json();

      expect(resposeJson.length).toBeGreaterThanOrEqual(
        expectedCommentMininumNumber,
      );
    });
    test('GET comments return comment object @predefined_data', async ({
      request,
    }) => {
      const commentsUrl = '/api/comments';
      const response = await request.get(commentsUrl);
      const resposeJson = await response.json();
      const comment = resposeJson[0];

      const expectedRequiredFields = [
        'id',
        'article_id',
        'body',
        'user_id',
        'date',
      ];

      expectedRequiredFields.forEach((key) =>
        expect.soft(comment).toHaveProperty(key),
      );
    });
  });

  test('GET comments should return an object with required fields @predefined_data', async ({
    request,
  }) => {
    const commentsUrl = '/api/comments';
    const response = await request.get(commentsUrl);

    await test.step('GET comments returns status code 200', async () => {
      const expectedResponseCode = 200;
      expect(response.status()).toBe(expectedResponseCode);
    });

    const resposeJson = await response.json();

    await test.step('GET comments should return at least one comment @predefined_data', async () => {
      const expectedArticleMininumNumber = 1;
      expect(resposeJson.length).toBeGreaterThanOrEqual(
        expectedArticleMininumNumber,
      );
    });

    const expectedRequiredFields = [
      'id',
      'article_id',
      'user_id',
      'body',
      'date',
    ];

    const article = resposeJson[0];

    expectedRequiredFields.forEach(async (key) => {
      await test.step(`object contains required field ${key}`, async () => {
        expect.soft(article).toHaveProperty(key);
      });
    });
  });
});
