import { Page } from '@playwright/test';

export class AddCommentView {
  commentInput = this.page.locator('#body');
  saveButton = this.page.getByRole('button', { name: 'Save' });
  addCommentViewHeader = this.page.getByRole('heading', {
    name: 'Add New Comment',
  });

  constructor(private page: Page) {}
}
