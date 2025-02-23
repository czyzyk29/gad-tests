import { expect, test } from '@_src/fixtures/merge-fixtures';

test.describe('verify tests', () => {
  test('go button show', async ({ articlesPage, page }) => {
    await expect(articlesPage.goSearchButton).toBeInViewport();

    const expectDefArticleNumber = 6;
    const responsePromise = page.waitForResponse('/api/articles*');

    await articlesPage.goSearchButton.click();
    const response = await responsePromise;
    const body = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(body).toHaveLength(expectDefArticleNumber);
  });
});
