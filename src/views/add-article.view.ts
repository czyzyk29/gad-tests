import { AddArticleModel } from '../models/article.model';
import { Page } from '@playwright/test';

export class AddArticleView {
  titleInput = this.page.getByTestId('title-input');
  bodyInput = this.page.getByTestId('body-text');
  saveButton = this.page.getByTestId('save');
  articleViewHeader = this.page.getByRole('heading', { name: 'Add New Entry' });
  errorPopup = this.page.getByTestId('alert-popup');

  constructor(private page: Page) {}

  async createArticle(addArticle: AddArticleModel): Promise<void> {
    await this.titleInput.fill(addArticle.title);
    await this.bodyInput.fill(addArticle.body);
    await this.saveButton.click();
  }
}
