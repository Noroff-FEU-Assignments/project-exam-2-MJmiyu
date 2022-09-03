import { useRouter } from 'next/router';
import { createContext, useCallback, useContext } from 'react';
import { STRAPI_PARAMS, STRAPI_API_URL } from '../constants/strapi';
import urlJoin from 'url-join';

const APIContext = createContext(async () => {});

export const APIProvider = ({ children }) => {
  const router = useRouter();

  const get = useCallback(
    async (url) => {
      const response = await fetch(
        urlJoin(STRAPI_API_URL, url, '?' + STRAPI_PARAMS)
      );

      if (response.status === 404) {
        router.push('/');
      }

      const json = await response.json();
      return json;
    },
    [router]
  );

  const post = useCallback(async (url, data) => {
    try {
      const body = JSON.stringify({ data });

      const response = await fetch(urlJoin(STRAPI_API_URL, url), {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error(
          'Received HTTP ' + response.status + ' on reqquest to ',
          url,
          JSON.stringify(body, null, 2)
        );
      }

      const json = await response.json();
      return json;
    } catch (e) {
      console.error(e);
    }
  });

  const contextValue = {
    get,
    post,
  };

  return (
    <APIContext.Provider value={contextValue}>{children}</APIContext.Provider>
  );
};

export const useAPI = () => useContext(APIContext);
