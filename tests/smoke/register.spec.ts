import { randomUserData } from '../../src/factory/user.factory';
import { RegisterUserModel } from '../../src/models/user.model';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('register tests', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUserModel;
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
      const expectLoginTitle = 'Login';
      const expectTitle = 'Welcome';

      //Act
      await registerPage.goTo();
      await registerPage.register(registerUserData);

      await expect(registerPage.successPopup).toHaveText(expectSuccessPopup);

      await loginPage.waitForPageLoginUrl();
      const titleLogin = await loginPage.getTitle();
      expect.soft(titleLogin).toContain(expectLoginTitle);

      await loginPage.login(registerUserData);

      const titleWelcome = await welcomePage.getTitle();

      //Assert
      expect(titleWelcome).toContain(expectTitle);
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
