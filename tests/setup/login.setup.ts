import { STORAGE_STATE } from '@_pw-config';
import { LoginPage } from '@_src/pages/login.page';
import { WelcomePage } from '@_src/pages/welcome.page';
import { testUser1 } from '@_src/test-data/user-date';
import { expect, test as setup } from '@playwright/test';

setup('Login with correct credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const welcomePage = new WelcomePage(page);

  await loginPage.goTo();

  await loginPage.login(testUser1);

  const title = await welcomePage.getTitle();

  expect(title).toContain('Welcome');

  await page.context().storageState({ path: STORAGE_STATE });
});
