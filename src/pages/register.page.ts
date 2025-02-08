import { RegisterUserModel } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/base.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register.html';

  firstNameInput = this.page.getByTestId('firstname-input');
  lastNameInput = this.page.getByTestId('lastname-input');
  emailInput = this.page.getByTestId('email-input');
  passwordInput = this.page.getByTestId('password-input');
  registerButton = this.page.getByTestId('register-button');
  emailErrorText = this.page.locator('#octavalidate_email');
  successPopup = this.page.getByTestId('alert-popup');

  constructor(page: Page) {
    super(page);
  }

  async register(registerUserData: RegisterUserModel): Promise<void> {
    await this.firstNameInput.fill(registerUserData.userFirstName);
    await this.lastNameInput.fill(registerUserData.userLastName);
    await this.emailInput.fill(registerUserData.userEmail);
    await this.passwordInput.fill(registerUserData.userPassword);
    await this.registerButton.click();
  }
}
