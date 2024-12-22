import { RegisterUser } from '../../src/models/user.model';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { faker } from '@faker-js/faker/locale/pl';
import { expect, test } from '@playwright/test';

test.describe('register tests', () => {
  test(
    'Register with required data',
    {
      tag: ['@GAD-R03-01', '@GAD-R03-02', '@GAD-R03-03', '@smoke'],
    },
    async ({ page }) => {
      const registerUserData: RegisterUser = {
        userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
        userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
        userEmail: '',
        userPassword: faker.internet.password(),
      };

      registerUserData.userEmail = faker.internet.email({
        firstName: registerUserData.userFirstName,
        lastName: registerUserData.userLastName,
      });

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
      const registerUserData: RegisterUser = {
        userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
        userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
        userEmail: 'invalid email',
        userPassword: faker.internet.password(),
      };

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

      await registerPage.goTo();

      await registerPage.firstNameInput.fill(
        faker.person.firstName().replace(/[^A-Za-z]/g, ''),
      );
      await registerPage.lastNameInput.fill(
        faker.person.lastName().replace(/[^A-Za-z]/g, ''),
      );
      await registerPage.passwordInput.fill(faker.internet.password());

      await registerPage.registerButton.click();

      await expect(registerPage.emailErrorText).toHaveText(expectedErrorEmail);
    },
  );
});
