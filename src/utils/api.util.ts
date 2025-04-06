import { prepareRandomArticle } from '@_src/factory/article.factory';
import { testUser1 } from '@_src/test-data/user-date';
import { APIRequestContext } from '@playwright/test';

interface Headers {
  [key: string]: string;
}

export async function getAuthorizationHeader(
  request: APIRequestContext,
): Promise<Headers> {
  const loginUrl = '/api/login';

  const userData = {
    email: testUser1.userEmail,
    password: testUser1.userPassword,
  };

  const responseLogin = await request.post(loginUrl, {
    data: userData,
  });

  const responseLoginJson = await responseLogin.json();

  const headers = {
    Authorization: `Bearer ${responseLoginJson.access_token}`,
  };
  return headers;
}

interface ArticlePayload {
  title: string;
  body: string;
  date: string;
  image: string;
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
