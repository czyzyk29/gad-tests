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
      const firstName = faker.person.firstName().replace(/[^A-Za-z]/g, '');
      const lastName = faker.person.lastName().replace(/[^A-Za-z]/g, '');
      const email = faker.internet.email({
        firstName: firstName,
        lastName: lastName,
      });
      const password = faker.internet.password();
      const expectSuccessPopup = 'User created';

      const registerPage = new RegisterPage(page);

      await registerPage.goTo();
      await registerPage.register(firstName, lastName, email, password);

      await expect(registerPage.successPopup).toHaveText(expectSuccessPopup);

      const loginPage = new LoginPage(page);
      await loginPage.waitForPageLoginUrl();
      const titleLogin = await loginPage.title();
      expect.soft(titleLogin).toContain('Login');

      await loginPage.login(email, password);

      const welcomePage = new WelcomePage(page);
      const titleWelcome = await welcomePage.title();

      expect(titleWelcome).toContain('Welcome');
    },
  );
});
