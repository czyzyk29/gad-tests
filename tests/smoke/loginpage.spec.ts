import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test('Login with correct credentials', async ({ page }) => {
  const login = 'Moses.Armstrong@Feest.ca';
  const password = 'test1';
  const loginPage = new LoginPage(page);
  await loginPage.goTo();

  await loginPage.login(login, password);

  const welcomePage = new WelcomePage(page);
  const title = await welcomePage.title();

  expect(title).toContain('Welcome');
});
