import qs from 'qs';

export const STRAPI_URL =
  'https://project-exam-2-holidaze-strapi.herokuapp.com/';

export const STRAPI_API_URL = STRAPI_URL + 'api/';

export const STRAPI_PARAMS = qs.stringify({ populate: '*', sort: 'id' });
