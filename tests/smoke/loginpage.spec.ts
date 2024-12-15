import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user-date';
import { expect, test } from '@playwright/test';

test('Login with correct credentials', async ({ page }) => {
  const login = testUser1.userEmail;
  const password = testUser1.userPassword;
  const loginPage = new LoginPage(page);
  await loginPage.goTo();

  await loginPage.login(login, password);

  const welcomePage = new WelcomePage(page);
  const title = await welcomePage.title();

  expect(title).toContain('Welcome');
});
