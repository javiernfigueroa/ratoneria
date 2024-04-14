export const URLBASE =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api/v1';

export const ENDPOINT = {
  chat: 'back-ratoneria-production.up.railway.app',
  login: `${URLBASE}/login`,
  users: `${URLBASE}/users`,
  reviews: `${URLBASE}/reviews`,
  shops: `${URLBASE}/shops`,
  shops_paginated: `${URLBASE}/shops_whit_pagination`,
  consumed: `${URLBASE}/consumed`,
  auth_user: `${URLBASE}/auth_user`,
  auth_google: `${URLBASE}/auth_google`,
  register_google: `${URLBASE}/register_google`,
};
