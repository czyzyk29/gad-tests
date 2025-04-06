import { prepareRandomArticle } from '@_src/factory/article.factory';
import { prepareRandomComment } from '@_src/factory/comment.factory';
import { testUser1 } from '@_src/test-data/user-date';
import { APIRequestContext } from '@playwright/test';

interface CommentPayload {
  article_id: number;
  body: string;
  date: string;
}
export interface ArticlePayload {
  title: string;
  body: string;
  date: string;
  image: string;
}
export interface Headers {
  [key: string]: string;
}

export const apiLinks = {
  articlesUrl: '/api/articles',
  commentsUrl: '/api/comments',
  loginUrl: '/api/login',
};

export async function getAuthorizationHeader(
  request: APIRequestContext,
): Promise<Headers> {
  const userData = {
    email: testUser1.userEmail,
    password: testUser1.userPassword,
  };

  const responseLogin = await request.post(apiLinks.loginUrl, {
    data: userData,
  });

  const responseLoginJson = await responseLogin.json();

  const headers = {
    Authorization: `Bearer ${responseLoginJson.access_token}`,
  };
  return headers;
}

export function generateArticlePayload(): ArticlePayload {
  const randomArticle = prepareRandomArticle();
  const articleData = {
    title: randomArticle.title,
    body: randomArticle.body,
    date: '2025-04-02T10:45:44.091Z',
    image: '.\\data\\images\\256\\subtle-cinematics-BulYN_Vs_dw-unsplash.jpg',
  };

  return articleData;
}

export function generateCommentPayload(articleId: number): CommentPayload {
  const randomComments = prepareRandomComment();
  const commentsData = {
    article_id: articleId,
    body: randomComments.body,
    date: '2025-04-02T10:45:44.091Z',
  };

  return commentsData;
}
