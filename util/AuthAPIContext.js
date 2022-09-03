import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useState } from 'react';
import { STRAPI_API_URL, STRAPI_PARAMS } from '../constants/strapi';
import { isLocal } from './isLocal';
import urlJoin from 'url-join';

const LOCAL_STORAGE_JWT_KEY = 'HOLIDAZE_JWT';

const getJwt = () => {
  if (isLocal()) {
    const jwt = localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
    return jwt ?? null;
  }
};

const storeJwt = (jwt) => {
  localStorage.setItem(LOCAL_STORAGE_JWT_KEY, jwt);
};

const clearJwt = () => {
  localStorage.clear(LOCAL_STORAGE_JWT_KEY);
};

const AuthAPIContext = createContext({});

export const AuthAPIProvider = ({ children }) => {
  const [jwt, setJwt] = useState(getJwt());

  const router = useRouter();

  const resetJwt = useCallback(() => {
    setJwt(null);
    clearJwt();
  }, []);

  const logout = useCallback(() => {
    resetJwt();
    router.push('/admin');
  }, [router, resetJwt]);

  const login = useCallback(
    async (username, password) => {
      try {
        const body = JSON.stringify({ identifier: username, password });
        const response = await fetch(urlJoin(STRAPI_API_URL, 'auth/local'), {
          method: 'POST',
          body,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (response.status !== 200) {
          throw new Error('Error logging in received HTTP ' + response.status);
        }

        const { jwt, error } = await response.json();

        if (error) {
          throw new Error('Error logging in:', error);
        }

        setJwt(jwt);
        storeJwt(jwt);

        router.push('/admin/hotels');
      } catch (e) {
        console.error(e);
        router.push('/admin');
      }
    },
    [router]
  );

  const authGet = useCallback(
    async (url) => {
      const response = await fetch(
        urlJoin(STRAPI_API_URL, url, '?' + STRAPI_PARAMS),
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: 'application/json',
          },
        }
      );

      if (response.status === 404) {
        router.push('/');
      }

      if (response.status === 403 || response.status === 401) {
        resetJwt();
        router.push('/admin');
        throw new Error('Response status is ' + response.status);
      }

      const json = await response.json();
      return json;
    },
    [router, jwt, resetJwt]
  );

  const authPost = useCallback(
    async (url, data) => {
      try {
        const body = JSON.stringify({ data });

        const response = await fetch(urlJoin(STRAPI_API_URL, url), {
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (response.status === 403 || response.status === 401) {
          resetJwt();
          router.push('/admin');
        }

        const json = await response.json();
        return json;
      } catch (e) {
        console.error(e);
      }
    },
    [router, jwt, resetJwt]
  );

  const authPut = useCallback(
    async (url, id, data) => {
      try {
        const body = JSON.stringify({ data });

        const response = await fetch(
          urlJoin(STRAPI_API_URL, url, id.toString()),
          {
            method: 'PUT',
            body,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        if (response.status === 403 || response.status === 401) {
          resetJwt();
          router.push('/admin');
        }

        const json = await response.json();
        return json;
      } catch (e) {
        console.error(e);
      }
    },
    [router, jwt, resetJwt]
  );

  const authDelete = useCallback(
    async (url, id) => {
      try {
        const response = await fetch(
          urlJoin(STRAPI_API_URL, url, id.toString()),
          {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        if (response.status === 403 || response.status === 401) {
          resetJwt();
          router.push('/admin');
        }

        const json = await response.json();
        return json;
      } catch (e) {
        console.error(e);
      }
    },
    [router, jwt, resetJwt]
  );

  const uploadImage = useCallback(
    async (image, id) => {
      const form = new FormData();
      form.append('files', image);
      form.append('ref', 'api::hotel.hotel');
      form.append('refId', id);
      form.append('field', 'image');

      const response = await fetch(urlJoin(STRAPI_API_URL, 'upload'), {
        method: 'POST',
        body: form,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.status === 200;
    },
    [jwt]
  );

  const deleteImage = useCallback(async (imageId) => {
    const response = await fetch(
      urlJoin(STRAPI_API_URL, 'upload/files', imageId.toString()),
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response.status === 200;
  }, []);

  const contextValue = {
    logout,
    login,
    authGet,
    authPost,
    authPut,
    authDelete,
    uploadImage,
    deleteImage,
  };

  return (
    <AuthAPIContext.Provider value={contextValue}>
      {children}
    </AuthAPIContext.Provider>
  );
};

export const useAuthAPI = () => useContext(AuthAPIContext);
