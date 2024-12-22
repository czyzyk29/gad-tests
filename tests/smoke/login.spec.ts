import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user-date';
import { expect, test } from '@playwright/test';

test.describe('login tests', () => {
  test(
    'Login with correct credentials',
    {
      tag: ['@GAD-R01-02', '@smoke'],
    },
    async ({ page }) => {
      const login = testUser1.userEmail;
      const password = testUser1.userPassword;

      const loginPage = new LoginPage(page);
      await loginPage.goTo();

      await loginPage.login(login, password);

      const welcomePage = new WelcomePage(page);
      const title = await welcomePage.title();

      expect(title).toContain('Welcome');
    },
  );
  test(
    'Login with incorrect password',
    {
      tag: ['@GAD-R01-02', '@smoke'],
    },
    async ({ page }) => {
      const login = testUser1.userEmail;
      const password = 'wrong_pass';
      const loginPage = new LoginPage(page);
      await loginPage.goTo();

      await loginPage.login(login, password);

      await expect
        .soft(loginPage.loginPasswordError)
        .toHaveText('Invalid username or password');

      const title = await loginPage.title();
      expect.soft(title).toContain('Login');
    },
  );
});
