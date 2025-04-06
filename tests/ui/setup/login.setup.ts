import { STORAGE_STATE } from '@_pw-config';
import { LoginPage } from '@_src/pages/login.page';
import { testUser1 } from '@_src/test-data/user-date';
import { expect, test as setup } from '@playwright/test';

setup('Login and save session', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();

  const welcomePage = await loginPage.login(testUser1);

  const title = await welcomePage.getTitle();

  expect(title).toContain('Welcome');

  await page.context().storageState({ path: STORAGE_STATE });
});
