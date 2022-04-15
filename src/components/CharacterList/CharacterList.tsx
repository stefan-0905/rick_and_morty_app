import React, { useCallback, useEffect } from 'react';
import { useDashboardContext } from '../../contexts/DashboardProvider';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import Character from '../Character/Character';
import Loader from '../Loader/Loader';

const CharacterList = () => {
  const { filters, setFilter } = useDashboardContext();
  const { characters, isLoading, hasMore } = useInfiniteScroll(filters);

  const handleScroll = useCallback(
    (e: Event) => {
      if (isLoading) return;
      if (
        window.innerHeight + (e.currentTarget as Document).documentElement.scrollTop + 1 >=
        (e.currentTarget as Document).documentElement.scrollHeight &&
        hasMore.current
      ) {
        setFilter('page', filters.page + 1);
      }
    },
    [filters, setFilter, hasMore, isLoading]
  );

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <main className={'container pt-0'}>
      {isLoading && <Loader />}
      {!isLoading && !characters.length && <p>No character with this name.</p>}
      <div className={`row gx-4 gy-4`}>
        {characters.map((character) => {
          return <Character key={character.id} {...character} />;
        })}
      </div>
    </main>
  );
};

export default CharacterList;
