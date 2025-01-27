import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class CommentPage extends BasePage {
  url = '/comment.html';
  commentBody = this.page.getByTestId('comment-body');
  mainMenu = new MainMenuComponent(this.page);
  editButton = this.page.getByTestId('edit');
  errorPopup = this.page.getByTestId('alert-popup');
  returnLink = this.page.getByTestId('return');

  constructor(page: Page) {
    super(page);
  }
}
