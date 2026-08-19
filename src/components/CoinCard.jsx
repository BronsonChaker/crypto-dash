import { Link } from 'react-router';

const CoinCard = ({ coin, isFavorite, onToggleFavorite }) => {
  const handleStarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(coin.id);
  };

  return (
    <div className='coin-card'>
      <button
        type='button'
        className={`favorite-star${isFavorite ? ' favorited' : ''}`}
        onClick={handleStarClick}
        aria-pressed={isFavorite}
        aria-label={
          isFavorite
            ? `Remove ${coin.name} from favorites`
            : `Add ${coin.name} to favorites`
        }
      >
        {isFavorite ? '★' : '☆'}
      </button>
      <Link to={`/coin/${coin.id}`} className='coin-card-link'>
        <div className='coin-header'>
          <img src={coin.image} alt={coin.name} className='coin-image' />
          <div>
            <h2>{coin.name}</h2>
            <p className='symbol'>{coin.symbol.toUpperCase()}</p>
          </div>
        </div>
        <p>Price: ${coin.current_price.toLocaleString()}</p>
        <p
          className={
            coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'
          }
        >
          {coin.price_change_percentage_24h.toFixed(2)} %
        </p>
        <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
      </Link>
    </div>
  );
};

export default CoinCard;
