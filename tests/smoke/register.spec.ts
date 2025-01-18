import { randomUserData } from '../../src/factory/user.factory';
import { RegisterUser } from '../../src/models/user.model';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('register tests', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUser;
  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUserData = randomUserData();
  });

  test(
    'Register with required data',
    {
      tag: ['@GAD-R03-01', '@GAD-R03-02', '@GAD-R03-03', '@smoke'],
    },
    async ({ page }) => {
      //Arrange
      const expectSuccessPopup = 'User created';
      const loginPage = new LoginPage(page);
      const welcomePage = new WelcomePage(page);

      //Act
      await registerPage.goTo();
      await registerPage.register(registerUserData);

      await expect(registerPage.successPopup).toHaveText(expectSuccessPopup);

      await loginPage.waitForPageLoginUrl();
      const titleLogin = await loginPage.title();
      expect.soft(titleLogin).toContain('Login');

      await loginPage.login(registerUserData);

      const titleWelcome = await welcomePage.title();

      //Assert
      expect(titleWelcome).toContain('Welcome');
    },
  );
  test(
    'Register with wrong password',
    {
      tag: ['@GAD-R03-04', '@smoke'],
    },
    async () => {
      //Arrang
      const expectedErrorEmail = 'Please provide a valid email address';
      registerUserData.userEmail = 'XXXX';

      //Act
      await registerPage.goTo();
      await registerPage.register(registerUserData);

      //Assert
      await expect(registerPage.emailErrorText).toHaveText(expectedErrorEmail);
    },
  );

  test(
    'Register email not provided',
    {
      tag: ['@GAD-R03-04', '@smoke'],
    },
    async () => {
      //Arrange
      const expectedErrorEmail = 'This field is required';

      //Act
      await registerPage.goTo();
      await registerPage.firstNameInput.fill(registerUserData.userFirstName);
      await registerPage.lastNameInput.fill(registerUserData.userLastName);
      await registerPage.passwordInput.fill(registerUserData.userPassword);
      await registerPage.registerButton.click();

      //Assert
      await expect(registerPage.emailErrorText).toHaveText(expectedErrorEmail);
    },
  );
});
