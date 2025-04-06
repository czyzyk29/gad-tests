import { expect, test } from '@_src/fixtures/merge-fixtures';
import { apiLinks } from '@_src/utils/api.util';

test.describe('verify articles API endpoint @smoke', () => {
  test.describe('verify each condition in separate test API endpoint', () => {
    test('GET articles status code 200', async ({ request }) => {
      const expectedResponseCode = 200;

      const response = await request.get(apiLinks.articlesUrl);

      expect(response.status()).toBe(expectedResponseCode);
    });

    test('GET articles return one article @predefined_data', async ({
      request,
    }) => {
      const expectedArticleMininumNumber = 1;

      const response = await request.get(apiLinks.articlesUrl);
      const resposeJson = await response.json();

      expect(resposeJson.length).toBeGreaterThanOrEqual(
        expectedArticleMininumNumber,
      );
    });

    test('GET articles return article object', async ({ request }) => {
      const response = await request.get(apiLinks.articlesUrl);
      const resposeJson = await response.json();
      const article = resposeJson[0];

      const expectedRequiredFields = [
        'id',
        'user_id',
        'title',
        'body',
        'date',
        'image',
      ];

      expectedRequiredFields.forEach((key) =>
        expect.soft(article).toHaveProperty(key),
      );
    });
  });

  test.describe('verify each condition in separate test API endpoint steps', () => {
    test('GET articles should return an object with reqwuired fields', async ({
      request,
    }) => {
      const response = await request.get(apiLinks.articlesUrl);

      await test.step('GET articles status code 200', async () => {
        const expectedResponseCode = 200;
        expect(response.status()).toBe(expectedResponseCode);
      });

      const resposeJson = await response.json();

      await test.step('GET articles return one article @predefined_data', async () => {
        const expectedArticleMininumNumber = 1;
        expect(resposeJson.length).toBeGreaterThanOrEqual(
          expectedArticleMininumNumber,
        );
      });

      const expectedRequiredFields = [
        'id',
        'user_id',
        'title',
        'body',
        'date',
        'image',
      ];

      const article = resposeJson[0];

      expectedRequiredFields.forEach(async (key) => {
        await test.step(`object contains required field ${key}`, async () => {
          expect.soft(article).toHaveProperty(key);
        });
      });
    });
  });
});
