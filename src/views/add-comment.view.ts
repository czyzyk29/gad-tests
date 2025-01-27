import { AddCommentModel } from '../models/comment.model';
import { Page } from '@playwright/test';

export class AddCommentView {
  commentInput = this.page.locator('#body');
  saveButton = this.page.getByRole('button', { name: 'Save' });
  addCommentViewHeader = this.page.getByRole('heading', {
    name: 'Add New Comment',
  });

  constructor(private page: Page) {}

  async addComment(commentData: AddCommentModel): Promise<void> {
    await this.commentInput.fill(commentData.body);
    await this.saveButton.click();
  }
}
