import { expect, test } from '@_src/fixtures/merge-fixtures';
import { waitForResponse } from '@_src/utils/wait.util';

test.describe('verify tests', () => {
  test('go button show', async ({ articlesPage, page }) => {
    await expect(articlesPage.goSearchButton).toBeInViewport();

    const expectDefArticleNumber = 6;
    const responsePromise = waitForResponse(page, '/api/articles*');

    await articlesPage.goSearchButton.click();
    const response = await responsePromise;
    const body = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(body).toHaveLength(expectDefArticleNumber);
  });
});
