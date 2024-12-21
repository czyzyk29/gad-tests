import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login/';
  loginPasswordError = this.page.getByTestId('login-error');

  userEmailInput = this.page.getByPlaceholder('Enter User Email');
  userPasswordInput = this.page.getByPlaceholder('Enter Password');
  loginButton = this.page.getByRole('button', { name: 'LogIn' });

  constructor(page: Page) {
    super(page);
  }

  async login(login: string, password: string): Promise<void> {
    await this.userEmailInput.fill(login);
    await this.userPasswordInput.fill(password);

    await this.loginButton.click();
  }
}
