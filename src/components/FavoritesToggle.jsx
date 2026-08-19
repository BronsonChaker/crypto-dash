const FavoritesToggle = ({ showFavoritesOnly, onShowFavoritesOnlyChange }) => {
  return (
    <div className='controls favorites-toggle'>
      <label htmlFor='favorites-only'>
        <input
          type='checkbox'
          id='favorites-only'
          checked={showFavoritesOnly}
          onChange={(e) => onShowFavoritesOnlyChange(e.target.checked)}
        />
        {' '}★ Favorites only
      </label>
    </div>
  );
};

export default FavoritesToggle;
