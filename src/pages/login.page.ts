import { LoginUser } from '../models/user.model';
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

  async loginNew(loginUserData: LoginUser): Promise<void> {
    await this.userEmailInput.fill(loginUserData.userEmail);
    await this.userPasswordInput.fill(loginUserData.userPassword);

    await this.loginButton.click();
  }

  async login(login: string, password: string): Promise<void> {
    await this.userEmailInput.fill(login);
    await this.userPasswordInput.fill(password);

    await this.loginButton.click();
  }
}
