import { randomUserData } from '../../src/factory/user.factory';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('register tests', () => {
  test(
    'Register with required data',
    {
      tag: ['@GAD-R03-01', '@GAD-R03-02', '@GAD-R03-03', '@smoke'],
    },
    async ({ page }) => {
      const registerUserData = randomUserData();

      const expectSuccessPopup = 'User created';

      const registerPage = new RegisterPage(page);

      await registerPage.goTo();

      await registerPage.register(registerUserData);

      await expect(registerPage.successPopup).toHaveText(expectSuccessPopup);

      const loginPage = new LoginPage(page);
      await loginPage.waitForPageLoginUrl();
      const titleLogin = await loginPage.title();
      expect.soft(titleLogin).toContain('Login');

      await loginPage.login(registerUserData);

      const welcomePage = new WelcomePage(page);
      const titleWelcome = await welcomePage.title();

      expect(titleWelcome).toContain('Welcome');
    },
  );
  test(
    'Register with wrong password',
    {
      tag: ['@GAD-R03-04', '@smoke'],
    },
    async ({ page }) => {
      const registerUserData = randomUserData();
      registerUserData.userEmail = 'XXXX';

      const expectedErrorEmail = 'Please provide a valid email address';

      const registerPage = new RegisterPage(page);

      await registerPage.goTo();
      await registerPage.register(registerUserData);

      await expect(registerPage.emailErrorText).toHaveText(expectedErrorEmail);
    },
  );

  test(
    'Register email not provided',
    {
      tag: ['@GAD-R03-04', '@smoke'],
    },
    async ({ page }) => {
      const expectedErrorEmail = 'This field is required';
      const registerPage = new RegisterPage(page);
      const registerUserData = randomUserData();

      await registerPage.goTo();

      await registerPage.firstNameInput.fill(registerUserData.userFirstName);
      await registerPage.lastNameInput.fill(registerUserData.userLastName);
      await registerPage.passwordInput.fill(registerUserData.userPassword);

      await registerPage.registerButton.click();

      await expect(registerPage.emailErrorText).toHaveText(expectedErrorEmail);
    },
  );
});
