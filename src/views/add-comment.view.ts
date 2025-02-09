import { AddCommentModel } from '@_src/models/comment.model';
import { ArticlePage } from '@_src/pages/article.page';
import { Page } from '@playwright/test';

export class AddCommentView {
  commentInput = this.page.locator('#body');
  saveButton = this.page.getByRole('button', { name: 'Save' });
  addCommentViewHeader = this.page.getByRole('heading', {
    name: 'Add New Comment',
  });

  constructor(private page: Page) {}

  async addComment(commentData: AddCommentModel): Promise<ArticlePage> {
    await this.commentInput.fill(commentData.body);
    await this.saveButton.click();

    return new ArticlePage(this.page);
  }
}
