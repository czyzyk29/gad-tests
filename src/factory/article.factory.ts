import { AddArticleModel } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomNewArticle(
  titleLength?: number,
  bodyParagraphsLength = 5,
): AddArticleModel {
  let title: string;
  let body: string;

  if (titleLength) {
    title = faker.string.alpha(titleLength);
  } else {
    title = faker.lorem.sentence();
  }

  if (bodyParagraphsLength) {
    body = faker.string.alpha(bodyParagraphsLength);
  } else {
    body = faker.lorem.paragraph();
  }

  const newArticle: AddArticleModel = { title: title, body: body };
  return newArticle;
}
