import React, { useCallback, useEffect, useState } from 'react';
import { useAPI } from '../../util/APIContext';
import styles from './Search.module.css';
import qs from 'qs';
import NextLink from '../typography/NextLink';

const Search = () => {
  const [query, setQuery] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const { get } = useAPI();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 0) {
        setLoading(true);

        const currentQuery = query;

        const filters = {
          name: {
            $containsi: query,
          },
        };

        const result = await get('hotels?' + qs.stringify({ filters }));

        if (currentQuery === query) {
          setHotels(result.data);
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [query, get]);

  const handleSetQuery = useCallback((e) => {
    const query = e.target.value ?? '';
    setQuery(query);
  }, []);

  const resetSearch = useCallback(() => {
    setQuery('');
    setHotels([]);
    setLoading(false);
  }, []);

  return (
    <div className={styles.SearchContainer}>
      <input
        className={styles.SearchInput}
        onChange={handleSetQuery}
        placeholder="Search hotels"
      />

      {query.length > 0 && (
        <div className={styles.SearchResults}>
          {hotels.length === 0 && !loading && <div>No results</div>}

          {hotels.map((hotel) => {
            return (
              <NextLink
                className={styles.SearchResult}
                key={hotel.id}
                onClick={resetSearch}
                href={{
                  pathname: '/hotels/[id]',
                  query: { id: hotel.id },
                }}
              >
                {hotel.attributes.name}
              </NextLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
