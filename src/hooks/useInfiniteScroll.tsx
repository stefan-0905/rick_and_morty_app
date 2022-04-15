import { useEffect, useRef, useState } from 'react';
import { getRickAndMortyCharacters } from '../services/RickAndMortyAPI';
import type { ICharacter } from '../models/Character';
import { IFormFilter } from '../models/FormFilter';

const useInfiniteScroll = (filters: IFormFilter) => {
  const [characters, setCharacters] = useState<Array<ICharacter>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasMore = useRef(true);

  useEffect(() => {
    hasMore.current = true;

    // If we are getting first page data, we want to reset characters
    if (filters.page === 1) {
      setCharacters([]);
    }

    (async () => {
      try {
        setIsLoading(true);
        const response = await getRickAndMortyCharacters(filters);
        const { data } = response;

        setCharacters((chars) => [...chars, ...data.results]);
        hasMore.current = data.info.next !== null;
      } catch (error) {
        hasMore.current = false;
        // If user searches invalid name reset characters
        if(filters.page === 1) {
          setCharacters([]);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [filters]);

  return { characters, isLoading, hasMore };
};

export default useInfiniteScroll;
