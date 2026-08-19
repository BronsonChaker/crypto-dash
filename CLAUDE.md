# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Crypto Dash — a React app (Vite) to browse and search cryptocurrency information, backed by the [CoinGecko API](https://www.coingecko.com/).

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server (Vite)
npm run build     # production build
npm run preview   # serve the production build locally
npm run lint      # eslint .
```

There is no test suite configured in this repo.

## Environment

Two env vars, read via `import.meta.env` (Vite), must be set in `.env`:
- `VITE_COINS_API_URL` — CoinGecko list endpoint, used by [App.jsx](src/App.jsx) for the coin list. Query params like `order`, `per_page`, `page`, `sparkline` are appended directly to this URL in the fetch call, so the base URL is expected to already include things like `ids`/`vs_currency`/API key params.
- `VITE_COIN_API_URL` — CoinGecko single-coin base endpoint, used by [coin-details.jsx](src/pages/coin-details.jsx) (appends `/{id}`) and [CoinChart.jsx](src/components/CoinChart.jsx) (appends `/{id}/market_chart?...`).

## Architecture

- **State lives in `App.jsx`, not in routed pages.** [App.jsx](src/App.jsx) owns the coin list plus `loading`/`error`/`limit`/`filter`/`sortBy` state and fetches from `VITE_COINS_API_URL` whenever `limit` changes. All of this is passed down as props to `HomePage`. `HomePage` itself does the actual filtering (by name/symbol) and sorting (by market cap / price / 24h change) on every render — there's no memoization, so this recomputes on each keystroke/state change.
- **Routing** is `react-router` (v7, using the `react-router` package directly, not `react-router-dom`) with `BrowserRouter` set up in [main.jsx](src/main.jsx) and routes declared in `App.jsx`: `/` (home), `/about`, `/coin/:id` (details), `*` (not found).
- **Coin details page fetches independently.** [coin-details.jsx](src/pages/coin-details.jsx) does its own fetch by `:id` param (separate from the list state in `App.jsx`) and renders raw CoinGecko response fields directly (`coin.market_data.*`, `coin.links.*`, etc.) with no normalization layer — when touching this page, check the actual CoinGecko API response shape rather than assuming a mapped/simplified model.
- **Charting**: [CoinChart.jsx](src/components/CoinChart.jsx) fetches 7-day market chart data per coin and renders it with `react-chartjs-2` (Chart.js), using `chartjs-adapter-date-fns` for the time-based x-axis. Chart.js modules (scales, elements, plugins) are registered once at the top of this file — if you add new chart types/features elsewhere, they need their own `ChartJS.register(...)` calls.
- **Components** ([src/components/](src/components/)) are presentational and controlled via props/callbacks from their parent page (e.g. `FilterInput`, `LimitSelector`, `SortSelector` all follow a `value` + `onXChange` callback pattern back up to `App.jsx`'s state).
- Loading/error UI is handled ad hoc per page/component (`Spinner` component, inline `error` divs) rather than through a shared boundary.
