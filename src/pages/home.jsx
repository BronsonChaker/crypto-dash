import { useState } from 'react';
import CoinCard from '../components/CoinCard';
import LimitSelector from '../components/LimitSelector';
import FilterInput from '../components/FilterInput';
import SortSelector from '../components/SortSelector';
import FavoritesToggle from '../components/FavoritesToggle';
import Spinner from '../components/Spinner';
import useCoins from '../hooks/useCoins';
import useFavorites from '../hooks/useFavorites';

const HomePage = () => {
  const { coins, loading, error, limit, setLimit } = useCoins();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Note: a favorited coin that falls outside the currently-fetched `limit`
  // simply won't appear here — `coins` from useCoins() is the source of
  // truth for what's rendered, favorites only filters/marks among those.
  const filteredCoins = coins
    .filter((coin) => {
      const matchesSearch =
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase());
      const matchesFavorites = !showFavoritesOnly || isFavorite(coin.id);
      return matchesSearch && matchesFavorites;
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'market_cap_asc':
          return a.market_cap - b.market_cap;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'change_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'change_asc':
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
      }
    });

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading && <Spinner color='white' />}
      {error && <div className='error'>{error}</div>}

      <div className='top-controls'>
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
        <FavoritesToggle
          showFavoritesOnly={showFavoritesOnly}
          onShowFavoritesOnlyChange={setShowFavoritesOnly}
        />
      </div>

      {!loading && !error && (
        <main className='grid'>
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                isFavorite={isFavorite(coin.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))
          ) : (
            <p>No matching coins</p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
