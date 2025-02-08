import { LoginUserModel } from '@_src/models/user.model';
import { LoginPage } from '@_src/pages/login.page';
import { WelcomePage } from '@_src/pages/welcome.page';
import { testUser1 } from '@_src/test-data/user-date';
import { expect, test } from '@playwright/test';

test.describe('login tests', () => {
  test(
    'Login with correct credentials',
    {
      tag: ['@GAD-R01-02', '@smoke'],
    },
    async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goTo();

      const welcomePage = await loginPage.login(testUser1);

      const title = await welcomePage.getTitle();

      expect(title).toContain('Welcome');
    },
  );
  test(
    'Login with incorrect password',
    {
      tag: ['@GAD-R01-02', '@smoke'],
    },
    async ({ page }) => {
      const loginUserData: LoginUserModel = {
        userEmail: testUser1.userEmail,
        userPassword: 'wrong_pass',
      };

      const expectLoginPasswordError = 'Invalid username or password';
      const expectTitleLogin = 'Login';
      const loginPage = new LoginPage(page);

      await loginPage.goTo();

      await loginPage.login(loginUserData);

      await expect
        .soft(loginPage.loginPasswordError)
        .toHaveText(expectLoginPasswordError);

      const title = await loginPage.getTitle();
      expect.soft(title).toContain(expectTitleLogin);
    },
  );
});
